import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Map = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" />
        <path
          fillRule="evenodd"
          d="M20 10C20 16 12 22.5 12 22.5C12 22.5 4 16 4 10C4 5.58172 7.58172 2 12 2C16.4183 2 20 5.58172 20 10ZM18 10C18 12.2326 16.4373 14.8758 14.4702 17.2117C13.5849 18.263 12.6945 19.163 12 19.8205C11.3055 19.163 10.4151 18.263 9.52982 17.2117C7.5627 14.8758 6 12.2326 6 10C6 6.68629 8.68629 4 12 4C15.3137 4 18 6.68629 18 10Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};

export default Map;
