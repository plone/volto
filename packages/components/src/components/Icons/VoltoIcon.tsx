import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Volto = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M13 12C13 10.8954 13.8954 10 15 10C16.1046 10 17 10.8954 17 12C17 13.1046 16.1046 14 15 14C13.8954 14 13 13.1046 13 12Z" />
        <path
          fillRule="evenodd"
          d="M12 21.8C11.3538 21.9311 10.6849 22 10 22V2C10.6849 2 11.3538 2.06886 12 2.20004C16.5645 3.12658 20 7.16208 20 12C20 16.8379 16.5645 20.8734 12 21.8ZM12 19.748C15.4505 18.8599 18 15.7277 18 12C18 8.27232 15.4505 5.14012 12 4.25204V19.748Z"
          clipRule="evenodd"
        />
        <path d="M7 10C5.89543 10 5 10.8954 5 12C5 13.1046 5.89543 14 7 14C8.10457 14 9 13.1046 9 12C9 10.8954 8.10457 10 7 10Z" />
      </svg>
    </Icon>
  );
};

export default Volto;
