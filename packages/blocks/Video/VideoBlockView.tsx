import type { BlockViewProps } from '@plone/types';
import clsx from 'clsx';
import { VideoBlockBody, type VideoData } from './VideoBlockBody';
import './VideoBlockView.css';

type VideoBlockViewProps = {
  data: BlockViewProps['data'];
  className?: BlockViewProps['className'];
  isEditMode?: BlockViewProps['isEditMode'];
};

const VideoBlockView = (props: VideoBlockViewProps) => {
  const { data, className, isEditMode } = props;

  if (!data?.url) return null;

  return (
    <div
      className={clsx(
        'video align block',
        {
          center: !Boolean(data.align),
        },
        data.align,
        className,
      )}
    >
      <figure className="video-block">
        <VideoBlockBody data={data as VideoData} isEditMode={isEditMode} />
      </figure>
    </div>
  );
};

export default VideoBlockView;
