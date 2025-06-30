import { tv } from 'tailwind-variants';

const styles = tv({
  base: 'before:bg-quanta-dolphin flex min-w-32 items-center before:me-4 before:h-[9px] before:w-[9px] before:rounded-full',
  variants: {
    state: {
      private: 'before:bg-quanta-rose',
      published: 'before:bg-quanta-cobalt',
      intranet: 'before:bg-quanta-neon',
      draft: 'before:bg-[#f6a808]',
    },
  },
});

function stateIsValid(
  state: string,
): state is 'private' | 'published' | 'intranet' | 'draft' {
  return ['private', 'published', 'intranet', 'draft'].includes(state);
}

export default function ReviewState({
  state,
  className,
  children,
}: {
  state: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={styles({
        state: stateIsValid(state) ? state : undefined,
        className,
      })}
    >
      {children}
    </div>
  );
}
