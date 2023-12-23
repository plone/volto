import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Arrowleft = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M10.7073 6.70718L9.29305 5.29297L2.58594 12.0001L9.29304 18.7072L10.7073 17.293L6.41437 13.0001L21.0002 13.0001V11.0001L6.41436 11.0001L10.7073 6.70718Z" />
      </svg>
    </Icon>
  );
};

export default Arrowleft;
