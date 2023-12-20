import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Arrowtopright = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M15.5859 7H9.5V5H19V14.5H17V8.4143L6.70718 18.7071L5.29297 17.2929L15.5859 7Z" />
      </svg>
    </Icon>
  );
};

export default Arrowtopright;
