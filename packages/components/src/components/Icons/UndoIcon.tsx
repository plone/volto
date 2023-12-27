import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Undo = (props: IconPropsWithoutChildren) => {
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
          d="M6.25492 8.00006H9V10.0001H3V4.00006H5V6.34109C7.73532 2.94903 12.608 1.95877 16.5 4.20581C20.8046 6.69109 22.2795 12.1954 19.7942 16.5C17.3089 20.8047 11.8047 22.2796 7.50002 19.7943L8.50002 18.0623C11.8481 19.9952 16.1292 18.8481 18.0622 15.5C19.9952 12.152 18.848 7.87086 15.5 5.93786C12.3245 4.10448 8.30959 5.04193 6.25492 8.00006ZM5 7.9586L5.07181 8.00006H5V7.9586Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};

export default Undo;
