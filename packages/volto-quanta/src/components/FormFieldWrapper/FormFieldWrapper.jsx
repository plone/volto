import React from 'react';
import cx from 'classnames';

const FieldWrapper = (props) => {
  const {
    children,
    description,
    descriptionProps,
    error,
    errorMessageProps,
    id,
    labelProps,
    title,
  } = props;

  return (
    <div className={cx('q field', `field-wrapper-${id}`)}>
      {children}
      <label className="q label" {...labelProps}>
        {title}
      </label>
      {/* Resizer fashion feature (enabled only for textarea) */}
      {/* <div className="resizer"></div> */}
      {error &&
        error.map((message) => (
          <p className="q assist" key={message} {...errorMessageProps}>
            {message}
          </p>
        ))}

      <p className="q hint" id={`field-hint-${id}`} {...descriptionProps}>
        {description}
      </p>
    </div>
  );
};

export default FieldWrapper;
