import voltoTitledSvg from '../../static/volto-titled.svg';

const LoginLogo = () => {
  return (
    <div
      className={`
        flex h-32 w-32 flex-col items-center justify-center rounded-full bg-quanta-lemon p-2
      `}
    >
      <img src={voltoTitledSvg} alt="" />
    </div>
  );
};

export default LoginLogo;
