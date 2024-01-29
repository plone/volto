import { test } from 'vitest';
import { mutationHookFromMutation, queryHookFromQuery } from './misc';
import { act, renderHook, waitFor } from '@testing-library/react';
import { createWrapper } from '../testUtils';

describe('hook creator functions', () => {
  test('queryHookFromQuery should return expected result', async () => {
    const mockQueryFn = vi.fn(() => Promise.resolve('mockData'));

    const mockQueryFnCreator = vi.fn(() => ({
      queryKey: ['mockQuery'],
      queryFn: mockQueryFn,
    }));

    const queryHook = queryHookFromQuery(mockQueryFnCreator);

    const { result } = renderHook(() => queryHook({}), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockQueryFnCreator).toHaveBeenCalled();
    expect(mockQueryFn).toHaveBeenCalledOnce();

    expect(result.current?.data).toBe('mockData');
  });

  test('mutationHookFromMutation should return expected result', async () => {
    const mockMutationFn = vi.fn(() => Promise.resolve('mockData'));

    const mockMutationFnCreator = vi.fn(() => ({
      mutationKey: ['mockMutation'],
      mutationFn: mockMutationFn,
    }));

    const mutationHook = mutationHookFromMutation(mockMutationFnCreator);

    const { result } = renderHook(mutationHook, {
      wrapper: createWrapper(),
    });

    act(() => {
      result.current.mutate({});
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockMutationFnCreator).toHaveBeenCalled();
    expect(mockMutationFn).toHaveBeenCalledOnce();

    expect(result.current?.data).toBe('mockData');
  });
});
