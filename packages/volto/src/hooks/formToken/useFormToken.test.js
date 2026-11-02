import { renderHook } from '@testing-library/react-hooks';
import { useDispatch } from 'react-redux';
import useFormToken from './useFormToken';

vi.mock('react-redux', () => ({ useDispatch: vi.fn() }));

const setUp = (response) => {
  const dispatch = vi.fn(() => response());
  useDispatch.mockReturnValue(dispatch);
  return { dispatch, ...renderHook(() => useFormToken()) };
};

describe('useFormToken', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('gets a token when the form is shown', () => {
    const { dispatch } = setUp(() => Promise.resolve({ token: 'a' }));

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0].request.path).toEqual('/@form-token');
  });

  it('waits until the token is old enough', async () => {
    vi.useFakeTimers();
    const { result } = setUp(() =>
      Promise.resolve({ token: 'a', min_age: 15 }),
    );
    let token;
    result.current.wait().then((value) => {
      token = value;
    });

    await vi.advanceTimersByTimeAsync(14000);
    expect(token).toBeUndefined();
    await vi.advanceTimersByTimeAsync(1000);
    expect(token).toEqual('a');
  });

  it('gives no token when the backend has no form tokens', async () => {
    const { result } = setUp(() => Promise.reject({ status: 404 }));

    expect(await result.current.wait()).toBeNull();
  });

  it('gets a new token on refresh', async () => {
    let count = 0;
    const { result, dispatch } = setUp(() =>
      Promise.resolve({ token: `token-${++count}` }),
    );

    expect(await result.current.wait()).toEqual('token-1');
    result.current.refresh();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(await result.current.wait()).toEqual('token-2');
  });
});
