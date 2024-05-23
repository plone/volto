import * as React from 'react';
import DefaultLogo from './Logo.svg';
export type LogoProps = {
  ariaLabel?: string;
  logoImageAlt?: string;
  logoImageURL?: string;
};

const Logo = ({ ariaLabel, logoImageAlt, logoImageURL }: LogoProps) => {
  return (
    <div>
      <img
        aria-label={ariaLabel}
        src={logoImageURL ?? DefaultLogo}
        alt={logoImageAlt}
      />
    </div>
  );
};

export default Logo;
