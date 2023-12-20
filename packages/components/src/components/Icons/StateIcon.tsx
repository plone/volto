import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const State = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M10 8C10 6.89543 10.8954 6 12 6 13.1046 6 14 6.89543 14 8 14 9.10457 13.1046 10 12 10 10.8954 10 10 9.10457 10 8ZM12 12C10.8954 12 10 12.8954 10 14 10 15.1046 10.8954 16 12 16 13.1046 16 14 15.1046 14 14 14 12.8954 13.1046 12 12 12Z" />
        <path
          fillRule="evenodd"
          d="M6 8C6 4.68629 8.68629 2 12 2C15.3137 2 18 4.68629 18 8V14C18 16.973 15.8377 19.441 13 19.917V20H16V22H8V20H11V19.917C8.16229 19.441 6 16.973 6 14V8ZM12 18C14.2091 18 16 16.2091 16 14V8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8V14C8 16.2091 9.79086 18 12 18Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};

export default State;
