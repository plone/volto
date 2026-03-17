import { createSlatePlugin } from 'platejs';
import { toPlatePlugin, type PlateElementProps } from 'platejs/react';

export const TITLE_BLOCK_TYPE = 'title';

function TitleRendererElement(props: PlateElementProps) {
  return (
    <h1
      {...props.attributes}
      className="font-heading mt-[1.6em] pb-1 text-4xl font-bold"
    >
      {props.children}
    </h1>
  );
}

export const BaseTitleRendererBlockPlugin = createSlatePlugin({
  key: TITLE_BLOCK_TYPE,
  node: {
    component: TitleRendererElement,
    isElement: true,
    type: TITLE_BLOCK_TYPE,
  },
});

export const TitleRendererBlock = toPlatePlugin(BaseTitleRendererBlockPlugin);
