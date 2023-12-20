import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Arrowup = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M17.293 10.7073L18.7072 9.29305L12.0001 2.58594L5.29297 9.29304L6.70718 10.7073L11.0001 6.41437L11.0001 21.0002H13.0001L13.0001 6.41436L17.293 10.7073Z" />
      </svg>
    </Icon>
  );
};

export default Arrowup;
