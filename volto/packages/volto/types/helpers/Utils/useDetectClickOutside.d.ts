/**
 * Hook used to detect clicks outside a component (or an escape key press).
 * onTriggered function is triggered on `click` or escape `keyup` event.
 */
export function useDetectClickOutside({ onTriggered, disableClick, disableKeys, allowAnyKey, triggerKeys, }: {
    onTriggered: any;
    disableClick: any;
    disableKeys: any;
    allowAnyKey: any;
    triggerKeys: any;
}): import("react").MutableRefObject<any>;
