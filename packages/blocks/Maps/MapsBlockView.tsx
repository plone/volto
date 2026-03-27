import type { BlockViewProps } from '@plone/types';
import clsx from 'clsx';

const MapsBlockView = (props: BlockViewProps) => {
  const { data } = props;

  return data.url ? (
    <div
      className={clsx(
        'maps align block',
        {
          center: !Boolean(data.align),
        },
        data.align,
      )}
    >
      <div
        className={clsx('maps-inner', {
          'w-full': data.align === 'full',
        })}
      >
        <iframe
          title={data?.title}
          src={data.url}
          className="google-map aspect-video"
          frameBorder="0"
          allowFullScreen
        />
      </div>
    </div>
  ) : null;
};

export default MapsBlockView;
