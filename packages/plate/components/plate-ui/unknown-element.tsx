type VoidElementProps = {
  element: {
    '@type': string;
  };
};

const VoidElement = (props: VoidElementProps) => {
  return (
    <div
      contentEditable="false"
      className="size-12 w-full rounded-lg border-2 border-quanta-azure p-2"
    >
      Unsupported block type: {props.element['@type']}
    </div>
  );
};

export default VoidElement;
