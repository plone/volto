import React from 'react';
import {
  ModalOverlay,
  type ModalOverlayProps,
  Modal as RACModal,
} from 'react-aria-components/Modal';
import { tv } from 'tailwind-variants';

const overlayStyles = tv({
  base: `
    absolute top-0 left-0 isolate z-20 h-(--page-height) w-full bg-black/50 text-center
    backdrop-blur-lg
  `,
  variants: {
    isEntering: {
      true: 'duration-200 ease-out animate-in fade-in',
    },
    isExiting: {
      true: 'duration-200 ease-in animate-out fade-out',
    },
  },
});

const modalStyles = tv({
  base: `
    max-h-[calc(var(--visual-viewport-height)*.9)] w-full max-w-[min(90vw,450px)] rounded-md border
    border-black/10 bg-white bg-clip-padding text-left align-middle text-neutral-700 shadow-2xl
    dark:border-white/10 dark:bg-neutral-800/70 dark:text-neutral-300 dark:backdrop-blur-2xl
    dark:backdrop-saturate-200
    forced-colors:bg-[Canvas]
  `,
  variants: {
    isEntering: {
      true: 'duration-200 ease-out animate-in zoom-in-105',
    },
    isExiting: {
      true: 'duration-200 ease-in animate-out zoom-out-95',
    },
  },
});

export function Modal(props: ModalOverlayProps) {
  return (
    <ModalOverlay {...props} className={overlayStyles}>
      <div
        className={`
          sticky top-0 left-0 box-border flex h-(--visual-viewport-height) w-full items-center
          justify-center
        `}
      >
        <RACModal {...props} className={modalStyles} />
      </div>
    </ModalOverlay>
  );
}
