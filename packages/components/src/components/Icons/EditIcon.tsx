import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Edit = (props: IconPropsWithoutChildren) => {
  return (
    <Icon {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path d="M18 12.8286V17.9999H6V5.99994H11.1718L13.1718 3.99994H4V19.9999H20V10.8286L18 12.8286Z" />
        <path
          fillRule="evenodd"
          d="M13 14.9999L8 15.9999L9 10.9999L17.5858 2.41416C18.3668 1.63311 19.6332 1.63311 20.4142 2.41415L21.5858 3.58573C22.3668 4.36678 22.3668 5.63311 21.5858 6.41415L13 14.9999ZM17.5857 7.58582L12.014 13.1575L10.5495 13.4504L10.8424 11.986L16.4141 6.41424L17.5857 7.58582ZM18.9999 6.1716L20.1716 4.99994L19 3.82837L17.8283 5.00003L18.9999 6.1716Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};

export default Edit;
