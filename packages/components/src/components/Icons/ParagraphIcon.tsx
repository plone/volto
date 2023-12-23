import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Paragraph = (props: IconPropsWithoutChildren) => {
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
          d="M10 2C6.68629 2 4 4.68629 4 8C4 11.3137 6.68629 14 10 14H13V22H15V4H17V22H19V2H10ZM10 4H13V12H10C7.79086 12 6 10.2091 6 8C6 5.79086 7.79086 4 10 4Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};

export default Paragraph;
