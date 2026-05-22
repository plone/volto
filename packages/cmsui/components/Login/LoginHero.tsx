import voltoHeroSvg from '../../static/volto-hero.svg?url';

const LoginHero = () => {
  return (
    <img
      src={voltoHeroSvg}
      className="h-full w-auto object-cover"
      alt=""
      aria-hidden="true"
    />
  );
};

export default LoginHero;
