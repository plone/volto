import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Bin = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M9 18V8H11V18H9ZM13 8V18H15V8H13Z" />
        <path
          fillRule="evenodd"
          d="M13.5 4C13.5 3.17157 12.8284 2.5 12 2.5C11.1716 2.5 10.5 3.17157 10.5 4H4V6H5V19C5 20.6569 6.34315 22 8 22H16C17.6569 22 19 20.6569 19 19V6H20V4H13.5ZM7 19V6H17V19C17 19.5523 16.5523 20 16 20H8C7.44772 20 7 19.5523 7 19Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};

export default Bin;
