import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi, beforeAll, afterAll } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.location
delete window.location;
window.location = { 
  replace: vi.fn(),
  href: '',
  pathname: '/'
};

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn()
};
global.localStorage = localStorageMock;

// Reset mocks before each test
beforeAll(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  vi.clearAllMocks();
});
