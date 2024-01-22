/**
 * TEST COMPONENT: React TSX component
 * Ensure successful implementation of TSX and validate the functionality with Jest tests
 * Dependencies: jest (version 26.6.3), ts-jest (version ^26.4.2)
 */
/// <reference types="react" />
type TestProps = {
    text: string;
};
declare const TsTest: ({ text }: TestProps) => JSX.Element;
export default TsTest;
