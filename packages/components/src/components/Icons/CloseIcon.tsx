import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Close = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12.0001 13.4143L18.293 19.7072L19.7072 18.293L13.4143 12.0001L19.7072 5.70719L18.293 4.29298L12.0001 10.5859L5.70719 4.29297L4.29298 5.70718L10.5859 12.0001L4.29297 18.293L5.70718 19.7072L12.0001 13.4143Z" />
      </svg>
    </Icon>
  );
};

export default Close;
