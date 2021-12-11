import React from 'react';
import { useSelector } from 'react-redux';

const FormattedI18nDate = ({ date, format }) => {
  const language = useSelector((state) => state.intl.locale);

  return new Intl.DateTimeFormat(language, format).format(new Date(date));
};

export default FormattedI18nDate;
