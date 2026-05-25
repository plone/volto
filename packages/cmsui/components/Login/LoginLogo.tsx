import ploneWhiteSVG from '../../static/plone.svg';

const LoginLogo = () => {
  return (
    <div
      className={`
        flex h-32 w-32 flex-col items-center justify-center rounded-full bg-quanta-lemon p-2
      `}
    >
      <img src={ploneWhiteSVG} alt="" aria-hidden="true" />
    </div>
  );
};

export default LoginLogo;
