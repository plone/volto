type VoidElementProps = {
  element: {
    '@type': string;
  };
};

const VoidElement = (props: VoidElementProps) => {
  return (
    <div
      contentEditable="false"
      className="border-quanta-azure size-12 w-full rounded-lg border-2 p-2"
    >
      Unsupported block type: {props.element['@type']}
    </div>
  );
};

export default VoidElement;
