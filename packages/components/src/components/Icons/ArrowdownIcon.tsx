import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Arrowdown = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M6.70718 13.2929L5.29297 14.7071L12.0001 21.4142L18.7072 14.7071L17.293 13.2929L13.0001 17.5858L13.0001 3L11.0001 3L11.0001 17.5858L6.70718 13.2929Z" />
      </svg>
    </Icon>
  );
};

export default Arrowdown;
