import React from 'react';
import cx from 'classnames';

const FieldWrapper = (props) => {
  const { children, description, disabled, error, fieldSet, id, title } = props;

  return (
    <div className={cx('q field', `field-wrapper-${id}`)}>
      {children}
      <label
        className="q label"
        id={`field-label-${id}`}
        htmlFor={`field-${id}`}
      >
        {title}
      </label>
      {/* Resizer fashion feature (enabled only for textarea) */}
      {/* <div className="resizer"></div> */}
      {error &&
        error.map((message) => (
          <p className="q assist" key={message}>
            {message}
          </p>
        ))}

      <p className="q hint" id={`field-hint-${id}`}>
        {description}
      </p>
    </div>
  );
};

export default FieldWrapper;
