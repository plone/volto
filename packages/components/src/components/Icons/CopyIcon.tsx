import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Copy = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M15 4V7H18V16H17V18H20V6L16.25 2H8V5H10V4H15Z" />
        <path
          fillRule="evenodd"
          d="M16 10L12.25 6H4V22H16V10ZM11 8H6V20H14V11H11V8Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};

export default Copy;
