import '@testing-library/jest-dom';

import { vi } from 'vitest';

// @ts-expect-error "required by jest"
globalThis.jest = vi;
