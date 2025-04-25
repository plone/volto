/**
 * TEST COMPONENT: React TSX component
 * Ensure successful implementation of TSX and validate the functionality with Jest tests
 * Dependencies: jest (version 26.6.3), ts-jest (version ^26.4.2)
 */

type TestProps = {
  text: string;
};

const TsTest = ({ text }: TestProps) => {
  return <div>{text}</div>;
};

export default TsTest;
