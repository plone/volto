import cx from 'classnames';
import { Container } from 'semantic-ui-react';
import { buildStyleClassNamesFromData } from '@plone/volto/helpers';

const StyleWrapper = ({ children, data }) => {
  const styles = buildStyleClassNamesFromData(data?.styles);

  return (
    <div className={cx(styles)}>
      {/* This container is to maintain the style cascade consistent with the `full-width` hack */}
      <Container>{children}</Container>
    </div>
  );
};

export default StyleWrapper;
