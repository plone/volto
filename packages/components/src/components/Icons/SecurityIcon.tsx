import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Security = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          fillRule="evenodd"
          d="M4 2V12.3197C4 16.1074 6.14002 19.57 9.52786 21.2639L12 22.5L14.4721 21.2639C17.86 19.57 20 16.1074 20 12.3197V2H4ZM13 4H18V12.3197C18 15.3498 16.288 18.1199 13.5777 19.4751L13 19.7639V4ZM11 4V19.7639L10.4223 19.4751C7.71202 18.1199 6 15.3498 6 12.3197V4H11Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};

export default Security;
