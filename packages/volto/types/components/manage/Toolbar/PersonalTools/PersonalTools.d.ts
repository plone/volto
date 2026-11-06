/**
 * PersonalTools component.
 * @module components/manage/Toolbar/PersonalTools/PersonalTools
 */
import { type RefObject } from 'react';
export type PersonalToolsProps = {
    /** Opens a toolbar panel, such as `preferences`. */
    loadComponent: (selector: string) => void;
    /** Closes the current toolbar panel. */
    unloadComponent: () => void;
    /** Whether the toolbar shows inner actions. */
    hasActions?: boolean;
    /** The toolbar element, used to match the menu width. */
    theToolbar: RefObject<HTMLElement>;
};
/**
 * Personal tools menu of the toolbar.
 *
 * Lists the `personal_tools` actions when the site provides them, and the
 * built-in entries otherwise.
 */
declare const PersonalTools: (props: PersonalToolsProps) => import("react").JSX.Element;
export default PersonalTools;
