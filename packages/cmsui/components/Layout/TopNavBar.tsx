import { Button } from '@plone/components/tailwind';
import { Pluggable } from '../Pluggable';

const TopNavBar = () => {
  return (
    <div className="flex h-12 w-full items-center justify-center bg-amber-300">
      <Pluggable name="navtoolbar-buttons" />
    </div>
  );
};

export default TopNavBar;
