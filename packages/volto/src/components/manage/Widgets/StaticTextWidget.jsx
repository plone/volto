import PropTypes from 'prop-types';

import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

const StaticTextWidget = (props) => {
  const { id, value } = props;

  return (
    <FormFieldWrapper {...props} className="text" columns={1}>
      <div id={id} className="wrapper">
        <p
          dangerouslySetInnerHTML={{
            __html: value?.data || '',
          }}
        />
      </div>
    </FormFieldWrapper>
  );
};

export default StaticTextWidget;

StaticTextWidget.propTypes = {
  id: PropTypes.string.isRequired,
  value: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
};

StaticTextWidget.defaultProps = {
  value: null,
  minLength: null,
  maxLength: null,
};
