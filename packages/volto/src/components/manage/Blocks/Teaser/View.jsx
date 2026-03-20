import TeaserBody from './Body';
import { withBlockExtensions } from '@plone/volto/helpers/Extensions';
import { GridContext } from '@plone/volto/components/manage/Blocks/Grid/context';

const TeaserView = (props) => {
  return (
    <GridContext.Provider value={1}>
      <TeaserBody {...props} />
    </GridContext.Provider>
  );
};

export default withBlockExtensions(TeaserView);
