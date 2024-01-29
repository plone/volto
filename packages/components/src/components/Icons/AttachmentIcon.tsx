import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Attachment = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M10 4C8.34315 4 7 5.34315 7 7V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V4H19V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V7C5 4.23858 7.23858 2 10 2C12.7614 2 15 4.23858 15 7V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15L9 7L11 7L11 15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V7C13 5.34315 11.6569 4 10 4Z" />
      </svg>
    </Icon>
  );
};

export default Attachment;
