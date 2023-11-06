import renderer from 'react-test-renderer';
import TsTest from './TsTest';
import { expect } from '@jest/globals';

describe('Ts test component', () => {
  test('Renders', () => {
    const component = renderer.create(<TsTest text="Test a TS component" />);
    const json = component.toJSON();

    expect(json).toMatchSnapshot();
  });
});
