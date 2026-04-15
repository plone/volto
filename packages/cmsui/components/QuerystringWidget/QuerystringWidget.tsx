import { useId, useCallback, useMemo } from 'react';
import { tv } from 'tailwind-variants';
import type { TextFieldProps as QuantaTextFieldProps } from '@plone/components/quanta';
import {
  Description,
  fieldBorderStyles,
  FieldError,
  Label,
} from '../Field/Field';
import { useLoaderData } from 'react-router';
import type { loader as editLoader } from '../../routes/edit';

import { focusRing } from '../utils';
import {
  Select,
  SelectItem,
  TextField,
  NumberField,
  Switch,
  Button,
} from '@plone/components';
import {
  QuerystringProvider,
  useQuerystringContext,
  type QuerystringValue,
  type QueryCriterion,
  type FieldMetadata,
} from './QuerystringWidgetContext';
import { BinIcon, AddIcon } from '@plone/components/Icons';

type BaseFormFieldProps = Pick<
  QuantaTextFieldProps,
  'label' | 'description' | 'errorMessage' | 'placeholder'
>;

const widgetStyles = tv({
  extend: focusRing,
  base: 'mx-1 flex flex-col gap-4 rounded-md p-4',
  variants: {
    isFocused: fieldBorderStyles.variants.isFocusWithin,
    isInvalid: fieldBorderStyles.variants.isInvalid,
    isDisabled: fieldBorderStyles.variants.isDisabled,
  },
});

interface QuerystringWidgetProps extends BaseFormFieldProps {
  value?: QuerystringValue;
  onChange?: (value: QuerystringValue) => void;
}

/**
 * Query builder row component for individual criteria
 */
function QueryCriterionRow({
  criterion,
  index,
  availableFields,
  disabled,
  onChange,
  onRemove,
}: {
  criterion: QueryCriterion;
  index: number;
  availableFields: FieldMetadata[];
  disabled: boolean;
  onChange: (criterion: QueryCriterion) => void;
  onRemove: () => void;
}) {
  const field = useMemo(
    () => availableFields.find((f) => f.name === criterion.i),
    [criterion.i, availableFields],
  );

  const handleFieldChange = (fieldName: string) => {
    const newField = availableFields.find((f) => f.name === fieldName);
    onChange({
      i: fieldName,
      o: newField?.operators?.[0]?.value ?? '',
      v: '',
    });
  };

  const handleOperatorChange = (operator: string) => {
    onChange({
      ...criterion,
      o: operator,
    });
  };

  const handleValueChange = (newValue: string | number) => {
    onChange({
      ...criterion,
      v: newValue,
    });
  };

  return (
    <div className="bg-quanta-slate-50 flex items-end gap-4 rounded-md p-4">
      <div className="flex-1">
        <Select
          label={index === 0 ? 'List content if' : undefined}
          selectedKey={criterion.i}
          onSelectionChange={(key) => key && handleFieldChange(key as string)}
          isDisabled={disabled}
        >
          {availableFields.map((f) => (
            <SelectItem key={f.name} id={f.name}>
              {f.title}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex-1">
        <Select
          label={index === 0 ? 'Operator' : undefined}
          selectedKey={criterion.o}
          onSelectionChange={(key) =>
            key && handleOperatorChange(key as string)
          }
          isDisabled={disabled || !field}
        >
          {field?.operators?.map((op) => (
            <SelectItem key={op.value} id={op.value}>
              {op.label}
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="flex-1">
        {field?.valueType === 'date' ? (
          <TextField
            label={index === 0 ? 'Value' : undefined}
            type="date"
            value={criterion.v}
            onChange={(value: string) => handleValueChange(value)}
            isDisabled={disabled}
          />
        ) : (
          <TextField
            label={index === 0 ? 'Value' : undefined}
            value={String(criterion.v)}
            onChange={(value: string) => handleValueChange(value)}
            isDisabled={disabled}
            placeholder="Enter value..."
          />
        )}
      </div>

      <Button
        onPress={onRemove}
        isDisabled={disabled}
        className={`
          h-fit rounded p-2
          hover:bg-red-100
        `}
        aria-label="Remove criterion"
      >
        <BinIcon size="sm" />
      </Button>
    </div>
  );
}

/**
 * Inner component with the widget UI
 */
function QuerystringWidgetComponent(props: QuerystringWidgetProps) {
  const { label, description, errorMessage, value = {}, onChange } = props;
  const id = useId();
  const {
    availableFields,
    availableSortFields,
    value: contextValue,
    setValue,
    addCriterion,
    removeCriterion,
    updateCriterion,
  } = useQuerystringContext();

  // Sync context value with prop value
  const synced = useMemo(
    () => ({ ...value, ...contextValue }),
    [value, contextValue],
  );

  // Handle changes by transforming and calling onChange
  const handleValueChange = useCallback(
    (newValue: QuerystringValue) => {
      // Transform sort_order_boolean to sort_order if needed
      const transformedValue = newValue;
      if ('sort_order_boolean' in newValue) {
        const { sort_order_boolean } = newValue as any;
        transformedValue.sort_order = sort_order_boolean
          ? 'descending'
          : 'ascending';
        delete (transformedValue as any).sort_order_boolean;
      }

      setValue(transformedValue);
      onChange?.(transformedValue);
    },
    [onChange, setValue],
  );

  const handleCriterionChange = useCallback(
    (index: number, criterion: QueryCriterion) => {
      updateCriterion(index, criterion);
      const updated = {
        ...synced,
        query: synced.query ? [...synced.query] : [],
      };
      if (!updated.query) updated.query = [];
      updated.query[index] = criterion;
      handleValueChange(updated);
    },
    [synced, updateCriterion, handleValueChange],
  );

  const handleRemove = useCallback(
    (index: number) => {
      removeCriterion(index);
      const updated = {
        ...synced,
        query: synced.query?.filter((_, i) => i !== index),
      };
      handleValueChange(updated);
    },
    [synced, removeCriterion, handleValueChange],
  );

  const handleAddCriterion = useCallback(() => {
    addCriterion();
    const updated = {
      ...synced,
      query: [
        ...(synced.query ?? []),
        {
          i: availableFields[0]?.name ?? '',
          o: availableFields[0]?.operators?.[0]?.value ?? '',
          v: '',
        },
      ],
    };
    handleValueChange(updated);
  }, [synced, addCriterion, availableFields, handleValueChange]);

  const hasNoQueryCriteria = !synced.query || synced.query.length === 0;
  const hasPathCriterion = synced.query?.some((q) => q.i === 'path');
  const sortOrderBoolean = synced.sort_order === 'descending';

  return (
    <div className="group mb-4 flex flex-col gap-1">
      {label && (
        <Label
          id={id}
          className={`
            not-group-data-invalid:not-group-data-readonly:has-[+div:focus]:text-quanta-sapphire
          `}
        >
          {label}
        </Label>
      )}

      <div
        aria-labelledby={id}
        className={widgetStyles({
          isFocusVisible: false,
          isInvalid: !!errorMessage,
        })}
        role="group"
      >
        {/* Query Criteria Section */}
        <div className="space-y-2">
          <h3 className="text-quanta-slate-900 text-sm font-semibold">
            Criteria
          </h3>

          {synced.query && synced.query.length > 0 ? (
            <div className="space-y-2">
              {synced.query.map((criterion, index) => (
                <QueryCriterionRow
                  key={index}
                  criterion={criterion}
                  index={index}
                  availableFields={availableFields}
                  disabled={false}
                  onChange={(updated) => handleCriterionChange(index, updated)}
                  onRemove={() => handleRemove(index)}
                />
              ))}
            </div>
          ) : (
            <p className="text-quanta-slate-500 text-sm italic">
              No criteria added yet
            </p>
          )}

          <Button
            onPress={handleAddCriterion}
            className={`
              hover:bg-quanta-slate-100
              mt-2 flex items-center gap-2 rounded px-3 py-2 text-sm
            `}
          >
            <AddIcon size="sm" />
            Add another rule
          </Button>
        </div>

        {/* Divider */}
        {!hasNoQueryCriteria && <div className="bg-quanta-slate-200 h-px" />}

        {/* Display Options Section */}
        {!hasNoQueryCriteria && (
          <div className="space-y-4">
            {/* Depth Field - Conditional */}
            {hasPathCriterion && (
              <div className="max-w-xs">
                <NumberField
                  label="Depth"
                  value={synced.depth}
                  onChange={(value: number) =>
                    handleValueChange({
                      ...synced,
                      depth: value,
                    })
                  }
                  minValue={0}
                  maxValue={10}
                />
              </div>
            )}

            {/* Sort By Field */}
            <div className="max-w-sm">
              <Select
                label="Sort by"
                selectedKey={synced.sort_on}
                onSelectionChange={(key) =>
                  key &&
                  handleValueChange({
                    ...synced,
                    sort_on: key as string,
                  })
                }
              >
                {availableSortFields.map((field) => (
                  <SelectItem key={field.value} id={field.value}>
                    {field.label}
                  </SelectItem>
                ))}
              </Select>
            </div>

            {/* Sort Order Toggle */}
            <div className="flex items-center gap-2">
              <Switch
                isSelected={sortOrderBoolean}
                onChange={(selected: boolean) =>
                  handleValueChange({
                    ...synced,
                    sort_order: selected ? 'descending' : 'ascending',
                  })
                }
              >
                Reverse order
              </Switch>
            </div>

            {/* Results Options Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <NumberField
                  label="Maximum results"
                  value={synced.limit}
                  onChange={(value: number) =>
                    handleValueChange({
                      ...synced,
                      limit: value,
                    })
                  }
                  minValue={0}
                />
              </div>
              <div>
                <NumberField
                  label="Paginate every"
                  value={synced.b_size}
                  onChange={(value: number) =>
                    handleValueChange({
                      ...synced,
                      b_size: value,
                    })
                  }
                  minValue={1}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </div>
  );
}

export function QuerystringWidget(props: QuerystringWidgetProps) {
  useLoaderData<typeof editLoader>();

  const { label, description, errorMessage, ...rest } = props;

  return (
    <QuerystringProvider initialValue={props.value}>
      <QuerystringWidgetComponent
        label={label}
        description={description}
        errorMessage={errorMessage}
        {...rest}
      />
    </QuerystringProvider>
  );
}

QuerystringWidget.displayName = 'QuerystringWidget';
