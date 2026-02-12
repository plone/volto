import type { BlockViewProps } from '@plone/types';

/**
 * View title block component.
 * @class View
 * @extends Component
 */
const TitleBlockView = ({ properties, metadata }: BlockViewProps) => {
  return (
    <h1 className="documentFirstHeading">
      {(metadata || properties)['title'] || ''}
    </h1>
  );
};

export default TitleBlockView;
