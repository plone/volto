import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Mail = (props: IconPropsWithoutChildren) => {
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
          d="M2 20V4H22V20H2ZM18.5859 6H5.41427L12.0001 12.5858L18.5859 6ZM4 7.41415V18H20V7.4143L12.0001 15.4142L4 7.41415Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};

export default Mail;
