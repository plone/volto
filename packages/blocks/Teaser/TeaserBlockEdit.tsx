import { useCallback, type ComponentType } from 'react';
import type { BlockEditProps } from '@plone/types';
import { ImageIcon } from '@plone/components/Icons';
import config from '@plone/registry';
import TeaserBlockView from './TeaserBlockView';

const asFirstItem = <T,>(value: T | T[] | undefined): T | undefined =>
  Array.isArray(value) ? value[0] : value;

const TeaserEdit = (props: BlockEditProps) => {
  const { data, setBlock } = props;
  const href = asFirstItem(data.href as any);
  const ObjectBrowserWidget = config.getWidget('object_browser') as
    | ComponentType<any>
    | undefined;
  const onTargetChange = useCallback(
    (selectedItems: Array<Record<string, any>>) => {
      const selectedTarget = selectedItems?.[0];

      if (!selectedTarget) {
        setBlock({
          ...data,
          href: undefined,
          preview_image: undefined,
        });
        return;
      }

      setBlock({
        ...data,
        href: [selectedTarget],
        title: data.title || selectedTarget.title || selectedTarget.Title || '',
        description:
          data.description ||
          selectedTarget.description ||
          selectedTarget.Description ||
          '',
      });
    },
    [data, setBlock],
  );

  if (!href) {
    return (
      <div
        className={[
          'teaser-item placeholder rounded-md border border-dashed border-quanta-azure bg-quanta-air',
          'p-6 text-center text-quanta-iron',
        ].join(' ')}
      >
        <ImageIcon className="mx-auto mb-2 size-10 text-quanta-pigeon" />
        <p>Please choose an existing content as source for this element</p>
        {ObjectBrowserWidget ? (
          <ObjectBrowserWidget
            mode="single"
            onChange={onTargetChange}
            selectedAttrs={[
              '@id',
              '@type',
              'title',
              'description',
              'image_field',
              'image_scales',
              'hasPreviewImage',
              'head_title',
            ]}
          />
        ) : null}
      </div>
    );
  }

  return <TeaserBlockView {...props} isEditMode />;
};

export default TeaserEdit;
