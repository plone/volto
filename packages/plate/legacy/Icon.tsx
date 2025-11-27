/**
 * Volto legacy Icon component for render Volto icons in Plate
 * @module components/theme/Icon/Icon
 */
import React from 'react';
import clsx from 'clsx';

const defaultSize = '36px';

type IconName = {
  attributes: {
    xmlns?: string;
    viewBox?: string;
  };
  content: string;
};

type IconProps = {
  name: IconName;
  size?: string;
  color?: string;
  className?: string;
  title?: string;
  onClick?: React.MouseEventHandler<SVGSVGElement>;
  style?: React.CSSProperties;
  id?: string;
  ariaHidden?: boolean;
};

/**
 * Component to display an SVG as Icon.
 * Use:
 * - drop icon to the icons folder ("src/icons")
 * - import svg into the file
 * - import this Icon component
 * - add icon component with name = your imported svg
 */
const Icon: React.FC<IconProps> = ({
  name,
  size = defaultSize,
  color = null,
  className = null,
  title = null,
  onClick = null,
  style = {},
  id,
  ariaHidden,
}) => (
  <svg
    xmlns={name?.attributes?.xmlns}
    viewBox={name?.attributes?.viewBox}
    style={{
      height: size,
      width: 'auto',
      fill: color || 'currentColor',
      ...style,
    }}
    className={clsx('icon', className)}
    onClick={onClick ?? undefined}
    id={id}
    aria-hidden={ariaHidden}
    dangerouslySetInnerHTML={{
      __html: title ? `<title>${title}</title>${name.content}` : name.content,
    }}
  />
);

export default Icon;
