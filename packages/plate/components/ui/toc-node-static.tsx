import type { SlateEditor, SlateElementProps, TElement } from 'platejs';

import { type Heading, BaseTocPlugin, isHeading } from '@platejs/toc';
import { cva } from 'class-variance-authority';
import { NodeApi, SlateElement } from 'platejs';

import { BlockInnerContainer } from './block-inner-container';
import { Button } from './button';

const headingItemVariants = cva(
  `
    block h-auto w-full cursor-pointer truncate rounded-none px-0.5 py-1.5 text-left font-medium
    text-muted-foreground underline decoration-[0.5px] underline-offset-4
    hover:bg-accent hover:text-muted-foreground
  `,
  {
    variants: {
      depth: {
        1: 'pl-0.5',
        2: 'pl-[26px]',
        3: 'pl-[50px]',
      },
    },
  },
);

export function TocElementStatic(props: SlateElementProps) {
  const { editor } = props;
  const headingList = getHeadingList(editor);

  return (
    <SlateElement {...props}>
      <BlockInnerContainer className="mb-1 p-0">
        <div>
          {headingList.length > 0 ? (
            headingList.map((item) => (
              <Button
                key={item.title}
                variant="ghost"
                className={headingItemVariants({
                  depth: item.depth as 1 | 2 | 3,
                })}
                // This handler mocks the behaviour inside the edit view,
                // since the heading highlighting is coupled to the editor
                onClick={() => {
                  const el = document.querySelector<HTMLElement>(
                    `[data-block-id="${item.id}"]`,
                  );
                  if (!el) return;
                  el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  const overlay = document.createElement('div');
                  overlay.className =
                    'pointer-events-none absolute inset-0 z-1 bg-brand/[.13]';
                  overlay.dataset.slot = 'block-selection';
                  el.appendChild(overlay);
                  const dismiss = () => {
                    overlay.remove();
                    document.removeEventListener('mousedown', dismiss);
                  };
                  document.addEventListener('mousedown', dismiss);
                }}
              >
                {item.title}
              </Button>
            ))
          ) : (
            <div className="text-sm text-gray-500">
              Create a heading to display the table of contents.
            </div>
          )}
        </div>
        {props.children}
      </BlockInnerContainer>
    </SlateElement>
  );
}

const headingDepth: Record<string, number> = {
  h1: 1,
  h2: 2,
  h3: 3,
  h4: 4,
  h5: 5,
  h6: 6,
};

const getHeadingList = (editor?: SlateEditor) => {
  if (!editor) return [];

  const options = editor.getOptions(BaseTocPlugin);

  if (options.queryHeading) {
    return options.queryHeading(editor);
  }

  const headingList: Heading[] = [];

  const values = editor.api.nodes<TElement>({
    at: [],
    match: (n) => isHeading(n),
  });

  if (!values) return [];

  Array.from(values, ([node, path]) => {
    const { type } = node;
    const title = NodeApi.string(node);
    const depth = headingDepth[type];
    const id = node.id as string;

    if (title) {
      headingList.push({ id, depth, path, title, type });
    }
  });

  return headingList;
};
