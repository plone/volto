import config from '@plone/registry';
import type {
  BlockConfigBase,
  BlocksFormData,
  JSONSchema,
  StyleDefinition,
} from '@plone/types';

type DataRecord = Record<string, unknown>;
type StyleFieldConfig = {
  defaultValue?: string;
  values?: readonly string[];
  path?: string;
};
type StyleFieldsConfig = Record<string, StyleFieldConfig>;

type RegistryUtilityArgs = {
  data: DataRecord;
  container?: DataRecord;
  blockType?: string;
  fieldName: string;
};

export type ResolveStyleDefinitions = (
  fieldName: string,
  args: RegistryUtilityArgs,
) => readonly StyleDefinition[];

export type ResolveStyleFieldsArgs = {
  data: DataRecord;
  fieldConfigs?: StyleFieldsConfig;
  container?: DataRecord;
  resolveDefinitions: ResolveStyleDefinitions;
};

export type ResolvedStyleFields = {
  style: Record<`--${string}`, string>;
  values: Record<string, string>;
};

const isRecord = (value: unknown): value is DataRecord =>
  !!value && typeof value === 'object' && !Array.isArray(value);

const isStyleFieldMarker = (
  value: unknown,
): value is true | { path?: string } => value === true || isRecord(value);

const splitPath = (path?: string) =>
  path?.split('.').filter((segment) => !!segment) ?? [];

const getPathValue = (data: DataRecord, path?: string) => {
  const segments = splitPath(path);

  if (!segments.length) return undefined;

  let current: unknown = data;

  for (const segment of segments) {
    if (!isRecord(current)) return undefined;
    current = current[segment];
  }

  return current;
};

const setPathValue = (
  data: DataRecord,
  path: string | undefined,
  value: unknown,
) => {
  const segments = splitPath(path);

  if (!segments.length) return;

  let current: DataRecord = data;

  segments.forEach((segment, index) => {
    if (index === segments.length - 1) {
      current[segment] = value;
      return;
    }

    const next = current[segment];

    if (!isRecord(next)) {
      current[segment] = {};
    }

    current = current[segment] as DataRecord;
  });
};

const getBlockType = (data: DataRecord) => {
  const plateType = data.type;
  const ploneType = data['@type'];

  if (typeof plateType === 'string' && plateType !== 'unknown')
    return plateType;
  if (typeof ploneType === 'string') return ploneType;

  return undefined;
};

export const findStyleDefinitionByName = (
  definitions: readonly StyleDefinition[],
  name?: string,
) => definitions.find((definition) => definition.name === name);

export const getStyleFieldValue = (
  data: DataRecord,
  fieldName: string,
  fieldConfig?: StyleFieldConfig,
) => {
  const configuredValue =
    typeof fieldConfig?.path === 'string'
      ? getPathValue(data, fieldConfig.path)
      : undefined;

  if (typeof configuredValue === 'string') return configuredValue;

  const rootValue = data[fieldName];

  if (typeof rootValue === 'string') return rootValue;

  const legacyStyles = data.styles;

  if (isRecord(legacyStyles) && typeof legacyStyles[fieldName] === 'string') {
    return legacyStyles[fieldName] as string;
  }

  return undefined;
};

export const setStyleFieldValue = (
  data: DataRecord,
  fieldName: string,
  value: string,
  fieldConfig?: StyleFieldConfig,
) => {
  if (typeof fieldConfig?.path === 'string') {
    setPathValue(data, fieldConfig.path, value);
    return;
  }

  if (fieldName in data || !isRecord(data.styles)) {
    data[fieldName] = value;
    return;
  }

  const styles = data.styles as DataRecord;
  styles[fieldName] = value;
};

const getCandidateFields = (fieldConfigs?: StyleFieldsConfig) =>
  Object.keys(fieldConfigs ?? {});

const isAllowedValue = (
  definitions: readonly StyleDefinition[],
  value: string,
  fieldConfig?: StyleFieldConfig,
) => {
  const allowedValues = fieldConfig?.values?.length
    ? fieldConfig.values
    : definitions
        .map((definition) => definition.name)
        .filter((name): name is string => !!name);

  return allowedValues.includes(value);
};

const getValuesFromSchemaProperty = (property: Record<string, unknown>) => {
  if (Array.isArray(property.choices)) {
    return property.choices
      .map((choice) =>
        Array.isArray(choice) && typeof choice[0] === 'string'
          ? choice[0]
          : undefined,
      )
      .filter((choice): choice is string => !!choice);
  }

  if (Array.isArray(property.actions)) {
    return property.actions.filter(
      (action): action is string => typeof action === 'string',
    );
  }

  return undefined;
};

export const getStyleFieldsFromSchema = (
  schema?: JSONSchema,
): StyleFieldsConfig => {
  if (!schema || !isRecord(schema.properties)) return {};

  return Object.entries(schema.properties).reduce<StyleFieldsConfig>(
    (acc, [fieldName, property]) => {
      if (!isRecord(property) || !isStyleFieldMarker(property.styleField)) {
        return acc;
      }

      acc[fieldName] = {
        defaultValue:
          typeof property.default === 'string' ? property.default : undefined,
        values: getValuesFromSchemaProperty(property),
        path:
          property.styleField === true
            ? undefined
            : typeof property.styleField.path === 'string'
              ? property.styleField.path
              : undefined,
      };

      return acc;
    },
    {},
  );
};

export const getStyleFieldsFromBlockSchema = (
  blockConfig: Pick<BlockConfigBase, 'blockSchema'> | undefined,
  formData?: BlocksFormData,
) => {
  if (!blockConfig?.blockSchema) return {};

  try {
    const schema =
      typeof blockConfig.blockSchema === 'function'
        ? blockConfig.blockSchema({ formData, data: formData })
        : blockConfig.blockSchema;

    return getStyleFieldsFromSchema(schema);
  } catch {
    return {};
  }
};

export const resolveStyleFields = ({
  data,
  fieldConfigs,
  container,
  resolveDefinitions,
}: ResolveStyleFieldsArgs): ResolvedStyleFields => {
  const style: Record<`--${string}`, string> = {};
  const values: Record<string, string> = {};
  const blockType = getBlockType(data);

  getCandidateFields(fieldConfigs).forEach((fieldName) => {
    const definitions = resolveDefinitions(fieldName, {
      data,
      container,
      blockType,
      fieldName,
    });

    if (!definitions.length) return;

    const fieldConfig = fieldConfigs?.[fieldName];
    const rawValue = getStyleFieldValue(data, fieldName, fieldConfig);
    const effectiveValue =
      typeof rawValue === 'string' &&
      isAllowedValue(definitions, rawValue, fieldConfig)
        ? rawValue
        : fieldConfig?.defaultValue;

    if (!effectiveValue) return;

    const definition = findStyleDefinitionByName(definitions, effectiveValue);

    if (!definition?.style) return;

    values[fieldName] = effectiveValue;
    Object.assign(style, definition.style);
  });

  return { style, values };
};

export const applyStyleFieldDefaultsInData = ({
  data,
  fieldConfigs,
  container,
  resolveDefinitions,
}: ResolveStyleFieldsArgs) => {
  const blockType = getBlockType(data);

  getCandidateFields(fieldConfigs).forEach((fieldName) => {
    const definitions = resolveDefinitions(fieldName, {
      data,
      container,
      blockType,
      fieldName,
    });

    if (!definitions.length) return;

    const fieldConfig = fieldConfigs?.[fieldName];
    const currentValue = getStyleFieldValue(data, fieldName, fieldConfig);
    const defaultValue = fieldConfig?.defaultValue;

    if (!defaultValue) return;
    if (
      typeof currentValue === 'string' &&
      isAllowedValue(definitions, currentValue, fieldConfig)
    ) {
      return;
    }

    setStyleFieldValue(data, fieldName, defaultValue, fieldConfig);
  });

  return data;
};

export const getStyleFieldDefinitionsFromRegistry: ResolveStyleDefinitions = (
  fieldName,
  args,
) => {
  const utility = config.getUtility({
    type: 'styleFieldDefinition',
    name: fieldName,
  }) as {
    method?: (args: RegistryUtilityArgs) => readonly StyleDefinition[];
  };

  return utility.method?.(args) ?? [];
};
