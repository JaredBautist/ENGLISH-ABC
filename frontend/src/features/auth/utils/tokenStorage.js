/**
 * Token Storage Utilities
 * Manages secure token storage with localStorage/sessionStorage
 * and persists the "Recordarme" (Remember Me) preference and email.
 */

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  REMEMBER_ME: 'remember_me',
  REMEMBERED_EMAIL: 'remembered_email',
  USER: 'auth_user',
};

const isStorageAvailable = (type) => {
  try {
    const storage = window[type];
    const test = '__localStorage_test__';
    storage.setItem(test, test);
    storage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

export const tokenStorage = {
  /**
   * Save tokens and optional user to storage
   * @param {Object} tokens - { access, refresh }
   * @param {boolean} rememberMe - Whether to use localStorage (true) or sessionStorage
   * @param {Object|null} user - User profile data for optimistic hydration
   */
  saveTokens(tokens, rememberMe = false, user = null) {
    if (!isStorageAvailable('localStorage') && !isStorageAvailable('sessionStorage')) {
      console.warn('Storage not available');
      return;
    }

    const { access, refresh } = tokens;

    if (rememberMe && isStorageAvailable('localStorage')) {
      if (access) localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
      if (refresh) localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
      if (user) localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');

      // Clean up sessionStorage
      if (isStorageAvailable('sessionStorage')) {
        sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        sessionStorage.removeItem(STORAGE_KEYS.USER);
      }
    } else {
      // Session only
      if (isStorageAvailable('sessionStorage')) {
        if (access) sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
        if (refresh) sessionStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);
        if (user) sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
      }

      // Do not keep tokens in localStorage if not remembered
      if (isStorageAvailable('localStorage')) {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'false');
      }
    }
  },

  /**
   * Save or clear remembered email
   * @param {string} email
   * @param {boolean} rememberMe
   */
  saveRememberedEmail(email, rememberMe = true) {
    if (!isStorageAvailable('localStorage')) return;
    if (rememberMe && email) {
      localStorage.setItem(STORAGE_KEYS.REMEMBERED_EMAIL, email.trim());
      localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'true');
    } else {
      localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
      localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, 'false');
    }
  },

  /**
   * Get remembered email
   * @returns {string}
   */
  getRememberedEmail() {
    if (!isStorageAvailable('localStorage')) return '';
    return localStorage.getItem(STORAGE_KEYS.REMEMBERED_EMAIL) || '';
  },

  /**
   * Get remembered preference boolean
   * @returns {boolean}
   */
  getRememberPreference() {
    if (!isStorageAvailable('localStorage')) return false;
    return localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
  },

  /**
   * Get stored tokens
   * @returns {Object|null} - { access, refresh } or null
   */
  getStoredTokens() {
    try {
      // 1. Check localStorage if rememberMe was true
      if (isStorageAvailable('localStorage')) {
        const isRemember = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
        const access = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        const refresh = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (isRemember && access) {
          return { access, refresh };
        }
      }

      // 2. Check sessionStorage
      if (isStorageAvailable('sessionStorage')) {
        const access = sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        const refresh = sessionStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (access) {
          return { access, refresh };
        }
      }

      // 3. Fallback to localStorage if any tokens exist
      if (isStorageAvailable('localStorage')) {
        const access = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
        const refresh = localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
        if (access) {
          return { access, refresh };
        }
      }

      return null;
    } catch (e) {
      console.error('Error reading tokens:', e);
      return null;
    }
  },

  /**
   * Get access token only
   */
  getAccessToken() {
    const tokens = this.getStoredTokens();
    return tokens?.access || null;
  },

  /**
   * Get refresh token only
   */
  getRefreshToken() {
    const tokens = this.getStoredTokens();
    return tokens?.refresh || null;
  },

  /**
   * Update access token (after refresh)
   */
  updateAccessToken(newAccessToken) {
    if (!newAccessToken) return;

    if (isStorageAvailable('localStorage') && localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)) {
      localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
    }
    if (isStorageAvailable('sessionStorage') && sessionStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)) {
      sessionStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
    }
  },

  /**
   * Save user profile
   */
  saveUser(user, rememberMe = null) {
    if (!isStorageAvailable('localStorage') && !isStorageAvailable('sessionStorage')) return;
    const isRemember = rememberMe !== null
      ? rememberMe
      : (isStorageAvailable('localStorage') && localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true');
    const storage = isRemember && isStorageAvailable('localStorage') ? localStorage : sessionStorage;
    if (user) {
      storage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      storage.removeItem(STORAGE_KEYS.USER);
    }
  },

  /**
   * Get cached user profile
   */
  getUser() {
    try {
      if (isStorageAvailable('localStorage')) {
        const isRemember = localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
        const raw = localStorage.getItem(STORAGE_KEYS.USER);
        if (isRemember && raw) return JSON.parse(raw);
      }
      if (isStorageAvailable('sessionStorage')) {
        const raw = sessionStorage.getItem(STORAGE_KEYS.USER);
        if (raw) return JSON.parse(raw);
      }
      if (isStorageAvailable('localStorage')) {
        const raw = localStorage.getItem(STORAGE_KEYS.USER);
        if (raw) return JSON.parse(raw);
      }
      return null;
    } catch (e) {
      return null;
    }
  },

  /**
   * Clear all tokens and session from storage
   * Keeps remembered email by default so the user is remembered on the login form
   */
  clearTokens(keepRemembered = true) {
    try {
      if (isStorageAvailable('localStorage')) {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);
        if (!keepRemembered) {
          localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
          localStorage.removeItem(STORAGE_KEYS.REMEMBERED_EMAIL);
        }
      }
      if (isStorageAvailable('sessionStorage')) {
        sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        sessionStorage.removeItem(STORAGE_KEYS.USER);
      }
    } catch (e) {
      console.error('Error clearing tokens:', e);
    }
  },

  /**
   * Check if user has stored tokens
   */
  hasTokens() {
    return !!this.getAccessToken();
  },
};
