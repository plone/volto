import * as jotai from 'jotai';
import { WritableAtom, PrimitiveAtom } from 'jotai';
import * as react from 'react';
import { ReactNode } from 'react';
import { DeepKeys, DeepValue } from '@tanstack/react-form';
import { Content, StyleDefinition, JSONSchema, BlockConfigBase, BlocksFormData } from '@plone/types';

/**
 * Checks if an object or array is empty.
 * @param obj - The object or array to check.
 * @returns True if the object or array is empty, false otherwise.
 */
declare const isEmpty: (obj: object | Array<any>) => boolean;
/**
 * Deep equality check for plain JSON-like values.
 * @param left - First value to compare.
 * @param right - Second value to compare.
 * @returns True when values are deeply equal.
 */
declare function isDeepEqual(left: unknown, right: unknown): boolean;

/**
 * Initialises atoms with the provided values.
 * This component uses `useHydrateAtoms` to set the initial state of the atoms
 * based on the `atomValues` prop.
 * It is useful for server-side rendering or when you want to set the initial state
 * of atoms based on some external data.
 * It _does not_ update the values once the component is mounted.
 * You have to subscribe to the atom in a child component to get the updated values.
 * Hence the name `InitAtoms`, which indicates that it is only for initialisation.
 * In the jotai docs, they call it "hydration" but it's not really hydration as
 * in SSR terminology.
 *
 * Usage:
 * <InitAtoms atomValues={[[atom1, value1], [atom2, value2]]}>
 *   <YourComponent />
 * </InitAtoms>
 */
declare const InitAtoms: ({ atomValues, children, }: {
    atomValues: Iterable<readonly [WritableAtom<unknown, [any], unknown>, unknown]>;
    children: ReactNode;
}) => ReactNode;
declare function useFieldFocusAtom<T, K extends DeepKeys<T>>(anAtom: PrimitiveAtom<T>, field: K): WritableAtom<Promise<DeepValue<T, K> | undefined>, [jotai.SetStateAction<DeepValue<T, K>>], void>;
declare function useFieldFocusedAtom<T, K extends DeepKeys<T>>(atom: PrimitiveAtom<T>, field: K): [Awaited<DeepValue<T, K>> | undefined, (args_0: jotai.SetStateAction<DeepValue<T, K>>) => void];
declare function useSetFieldFocusedAtom<T, K extends DeepKeys<T>>(atom: PrimitiveAtom<T>, field: K): (args_0: jotai.SetStateAction<DeepValue<T, K>>) => void;
declare function useFieldValueFocusedAtom<T, K extends DeepKeys<T>>(atom: PrimitiveAtom<T>, field: K): Awaited<DeepValue<T, K>> | undefined;

declare function hasBlocksData(content: Content): boolean;

declare const getContentIcon: (contentType: string, isFolderish?: boolean) => string | react.ComponentType<any>;

/**
 * The definitive flattenToAppURL function
 * Flattens all the URLs in the response to the current app URL
 * This could be a potential use case for the upcoming RR7 middleware
 */
declare function flattenToAppURL<T>(data: T): T;

/**
 * Lightweight check to detect if a URL points to the current Plone instance.
 * For absolute URLs, compares origins to avoid prefix-matching attacks
 */
declare function isInternalURL(url?: string): boolean;

interface LanguageInfo {
    nativeName: string;
    englishName: string;
}
type LanguageMap = Record<string, LanguageInfo>;
declare const langmap: LanguageMap;

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
type ResolveStyleDefinitions = (fieldName: string, args: RegistryUtilityArgs) => readonly StyleDefinition[];
type ResolveStyleFieldsArgs = {
    data: DataRecord;
    fieldConfigs?: StyleFieldsConfig;
    container?: DataRecord;
    resolveDefinitions: ResolveStyleDefinitions;
};
type ResolvedStyleFields = {
    style: Record<`--${string}`, string>;
    values: Record<string, string>;
};
declare const findStyleDefinitionByName: (definitions: readonly StyleDefinition[], name?: string) => StyleDefinition | undefined;
declare const getStyleFieldValue: (data: DataRecord, fieldName: string, fieldConfig?: StyleFieldConfig) => string | undefined;
declare const setStyleFieldValue: (data: DataRecord, fieldName: string, value: string, fieldConfig?: StyleFieldConfig) => void;
declare const getStyleFieldsFromSchema: (schema?: JSONSchema) => StyleFieldsConfig;
declare const getStyleFieldsFromBlockSchema: (blockConfig: Pick<BlockConfigBase, "blockSchema"> | undefined, formData?: BlocksFormData) => StyleFieldsConfig;
declare const resolveStyleFields: ({ data, fieldConfigs, container, resolveDefinitions, }: ResolveStyleFieldsArgs) => ResolvedStyleFields;
declare const applyStyleFieldDefaultsInData: ({ data, fieldConfigs, container, resolveDefinitions, }: ResolveStyleFieldsArgs) => DataRecord;
declare const getStyleFieldDefinitionsFromRegistry: ResolveStyleDefinitions;

export { InitAtoms, type ResolveStyleDefinitions, type ResolveStyleFieldsArgs, type ResolvedStyleFields, applyStyleFieldDefaultsInData, findStyleDefinitionByName, flattenToAppURL, getContentIcon, getStyleFieldDefinitionsFromRegistry, getStyleFieldValue, getStyleFieldsFromBlockSchema, getStyleFieldsFromSchema, hasBlocksData, isDeepEqual, isEmpty, isInternalURL, langmap, resolveStyleFields, setStyleFieldValue, useFieldFocusAtom, useFieldFocusedAtom, useFieldValueFocusedAtom, useSetFieldFocusedAtom };
