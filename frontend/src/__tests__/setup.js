import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi, beforeAll } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.location
delete window.location;
window.location = {
  replace: vi.fn(),
  href: '',
  pathname: '/',
  search: '',
  origin: 'http://localhost:5173',
};

// Create a realistic in-memory Web Storage mock
const createStorageMock = () => {
  let store = {};
  return {
    getItem: vi.fn((key) => (key in store ? store[key] : null)),
    setItem: vi.fn((key, value) => {
      store[key] = String(value);
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn((idx) => Object.keys(store)[idx] || null),
  };
};

const localStorageMock = createStorageMock();
const sessionStorageMock = createStorageMock();

Object.defineProperty(window, 'localStorage', { value: localStorageMock, writable: true, configurable: true });
Object.defineProperty(window, 'sessionStorage', { value: sessionStorageMock, writable: true, configurable: true });
global.localStorage = localStorageMock;
global.sessionStorage = sessionStorageMock;

// Reset mocks before each test
beforeAll(() => {
  vi.clearAllMocks();
});

afterEach(() => {
  localStorageMock.clear();
  sessionStorageMock.clear();
  vi.clearAllMocks();
});
