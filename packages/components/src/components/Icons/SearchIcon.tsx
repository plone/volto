import Icon from '../Icon/Icon';
import type { IconPropsWithoutChildren } from '../Icon/Icon';

const Search = (props: IconPropsWithoutChildren) => {
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
          d="M10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C11.5723 17 13.0236 16.4816 14.1922 15.6064L19.2929 20.7071L20.7071 19.2929L15.6064 14.1922C16.4816 13.0236 17 11.5723 17 10C17 6.13401 13.866 3 10 3ZM5 10C5 7.23858 7.23858 5 10 5C12.7614 5 15 7.23858 15 10C15 12.7614 12.7614 15 10 15C7.23858 15 5 12.7614 5 10Z"
          clipRule="evenodd"
        />
      </svg>
    </Icon>
  );
};

export default Search;
