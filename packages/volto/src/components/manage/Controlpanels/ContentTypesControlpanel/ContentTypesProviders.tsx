import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  ContentTypesDriverProvider,
  ControlPanelsProvider,
  ControlPanelsScope,
  translationFromIntl,
  type BehaviorMetadataMap,
  type ContentTypesDriver,
  type Notify,
  type UseBlocker,
} from '@plone/controlpanels';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import config from '@plone/volto/registry';

/**
 * Holds back navigation with history's `block`, in the shape the control
 * panels expect.
 */
const useHistoryBlocker: UseBlocker = (shouldBlock) => {
  const history = useHistory();
  const [next, setNext] = useState<string | null>(null);
  const shouldBlockRef = useRef(shouldBlock);
  shouldBlockRef.current = shouldBlock;
  const proceeding = useRef(false);

  useEffect(
    () =>
      history.block((location) => {
        if (proceeding.current) return undefined;
        if (!shouldBlockRef.current(location.pathname)) return undefined;
        setNext(`${location.pathname}${location.search}`);
        return false;
      }),
    [history],
  );

  return {
    isBlocked: next !== null,
    proceed: () => {
      if (next === null) return;
      proceeding.current = true;
      setNext(null);
      history.push(next);
      proceeding.current = false;
    },
    cancel: () => setNext(null),
  };
};

/**
 * Connects the content types control panel to Volto: its router, react-intl,
 * its toasts, and a driver. The screens' styles come from
 * `@plone/controlpanels/dist/controlpanels.css`, scoped to
 * `ControlPanelsScope`.
 */
export default function ContentTypesProviders({
  driver,
  children,
}: {
  driver: ContentTypesDriver;
  children: ReactNode;
}) {
  const intl = useIntl();
  const history = useHistory();
  const navigate = useCallback((path: string) => history.push(path), [history]);

  // The package's messages are in Volto's catalogs, under their own ids
  // (`controlpanels.…`, see `controlpanelsMessages.ts`).
  const t = useMemo(() => translationFromIntl(intl), [intl]);

  const notify = useCallback<Notify>(({ title, description, variant }) => {
    const show = variant === 'error' ? toast.error : toast.success;
    show(
      <Toast
        success={variant !== 'error'}
        error={variant === 'error'}
        title={title}
        content={description}
      />,
    );
  }, []);

  const behaviorMetadata = useMemo(
    () => config.settings.behaviorMetadata as BehaviorMetadataMap | undefined,
    [],
  );

  return (
    <ControlPanelsScope>
      <ControlPanelsProvider
        navigate={navigate}
        t={t}
        notify={notify}
        useBlocker={useHistoryBlocker}
      >
        <ContentTypesDriverProvider
          driver={driver}
          behaviorMetadata={behaviorMetadata}
        >
          {children}
        </ContentTypesDriverProvider>
      </ControlPanelsProvider>
    </ControlPanelsScope>
  );
}
