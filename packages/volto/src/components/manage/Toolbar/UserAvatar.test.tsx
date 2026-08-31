import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import cameraSVG from '@plone/volto/icons/camera.svg';

import UserAvatar from './UserAvatar';

const renderUserAvatar = (
  props: React.ComponentProps<typeof UserAvatar> = {},
) => render(<UserAvatar {...props} />);

describe('UserAvatar', () => {
  it('renders the default user icon', () => {
    const { asFragment } = renderUserAvatar();
    expect(asFragment()).toMatchSnapshot();
  });

  it('defaults to the toolbar button size', () => {
    const { container } = renderUserAvatar();
    const svg = container.querySelector('svg');

    expect(svg).not.toBeNull();
    expect(svg).toHaveClass('icon');
    expect(svg).toHaveStyle({ height: '30px' });
  });

  it('renders at the given size', () => {
    const { container } = renderUserAvatar({ size: '96px' });

    expect(container.querySelector('svg')).toHaveStyle({ height: '96px' });
  });

  it('applies the given size to a custom icon too', () => {
    const { container } = renderUserAvatar({ icon: cameraSVG, size: '96px' });

    expect(container.querySelector('svg')).toHaveStyle({ height: '96px' });
  });

  it('exposes the title to assistive technology', () => {
    const { container } = renderUserAvatar({ title: 'Personal tools' });

    expect(container.querySelector('svg > title')?.textContent).toBe(
      'Personal tools',
    );
  });

  it('renders no title element when no title is given', () => {
    const { container } = renderUserAvatar();

    expect(container.querySelector('svg > title')).toBeNull();
  });

  it('renders the given icon instead of the default one', () => {
    const { container: withDefault } = renderUserAvatar();
    const { container: withCamera } = renderUserAvatar({ icon: cameraSVG });

    expect(withCamera.querySelector('svg')?.innerHTML).not.toBe(
      withDefault.querySelector('svg')?.innerHTML,
    );
    expect(withCamera.innerHTML).toMatchSnapshot();
  });

  it('keeps the title when a custom icon is given', () => {
    const { container } = renderUserAvatar({
      icon: cameraSVG,
      title: 'Personal tools',
    });

    expect(container.querySelector('svg > title')?.textContent).toBe(
      'Personal tools',
    );
  });
});
