import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Discussion = (props: IconPropsWithoutChildren) => {
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
          d="M2 8C2 5.79086 3.79086 4 6 4H14C16.2091 4 18 5.79086 18 8V9C20.2091 9 22 10.7909 22 13V15C22 16.4806 21.1956 17.7733 20 18.4649V21.5L17.5 19H14C11.7909 19 10 17.2091 10 15H6.5L4 17.5V14.4649C2.8044 13.7733 2 12.4806 2 11V8ZM6 6H14C15.1046 6 16 6.89543 16 8V11C16 12.1046 15.1046 13 14 13H6C4.89543 13 4 12.1046 4 11V8C4 6.89543 4.89543 6 6 6ZM12 15C12 16.1046 12.8954 17 14 17H18C19.1046 17 20 16.1046 20 15V13C20 11.8954 19.1046 11 18 11C18 13.2091 16.2091 15 14 15H12Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};

export default Discussion;
