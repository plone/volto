import { focusAtom } from 'jotai-optics';
import { useMemo } from 'react';
import { useAtom } from 'jotai';
import type { PrimitiveAtom } from 'jotai';

export const useTitleAtom = ({ formAtom, field }) => {
  return useMemo(() => {
    return focusAtom(formAtom, (optic) => optic.prop(field));
  }, [formAtom, field]);
};

export const ConsoleLog = ({
  formAtom,
}: {
  formAtom: PrimitiveAtom<unknown>;
}) => {
  const titleAtom = useTitleAtom({ formAtom, field: 'title' });
  const [title] = useAtom(titleAtom);
  const [formData] = useAtom(formAtom);

  return (
    <div className="mt-4">
      <pre>
        Global form data main JOTAI atom{' '}
        {JSON.stringify(formData.title, null, 2)}
      </pre>
      <pre>
        Focused atom GETTER on title key {JSON.stringify(title, null, 2)}
      </pre>
    </div>
  );
};
