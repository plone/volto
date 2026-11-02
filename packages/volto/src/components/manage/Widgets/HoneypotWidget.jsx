/**
 * HoneypotWidget component.
 * @module components/manage/Widgets/HoneypotWidget
 */

import PropTypes from 'prop-types';
import FormFieldWrapper from '@plone/volto/components/manage/Widgets/FormFieldWrapper';

/**
 * A text field for spam bots only: hide it with CSS, not in the HTML, so bots
 * that read the HTML fill it in.  Browsers and password managers can fill in
 * hidden fields as well, which would send personal data of visitors without
 * them knowing, so this field asks them not to.
 * @function HoneypotWidget
 * @returns {string} Markup of the component.
 */
const HoneypotWidget = (props) => {
  const { id, value, onChange } = props;

  return (
    <FormFieldWrapper {...props} className="text">
      <input
        type="text"
        id={`field-${id}`}
        name={id}
        value={value || ''}
        onChange={({ target }) =>
          onChange(id, target.value === '' ? undefined : target.value)
        }
        autoComplete="off"
        data-1p-ignore=""
        data-lpignore="true"
        data-bwignore=""
      />
    </FormFieldWrapper>
  );
};

HoneypotWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

HoneypotWidget.defaultProps = {
  value: null,
  onChange: () => {},
};

export default HoneypotWidget;
