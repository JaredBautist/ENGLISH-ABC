/**
 * Token Storage Utilities
 * Manages secure token storage with localStorage/sessionStorage
 */

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  REMEMBER_ME: 'remember_me',
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
   * Save tokens to storage
   * @param {Object} tokens - { access, refresh }
   * @param {boolean} rememberMe - Whether to use localStorage (true) or sessionStorage
   */
  saveTokens(tokens, rememberMe = false) {
    if (!isStorageAvailable('localStorage') && !isStorageAvailable('sessionStorage')) {
      console.warn('Storage not available');
      return;
    }

    const storage = rememberMe && isStorageAvailable('localStorage') ? localStorage : sessionStorage;
    const { access, refresh } = tokens;

    if (access) storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, access);
    if (refresh) storage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refresh);

    // Store preference
    if (isStorageAvailable('localStorage')) {
      localStorage.setItem(STORAGE_KEYS.REMEMBER_ME, rememberMe ? 'true' : 'false');
    }
  },

  /**
   * Get stored tokens
   *  @returns {Object|null} - { access, refresh } or null
   */
  getStoredTokens() {
    try {
      if (!isStorageAvailable('localStorage') && !isStorageAvailable('sessionStorage')) {
        return null;
      }

      const rememberMe = 
        isStorageAvailable('localStorage') && 
        localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
      
      const storage = rememberMe && isStorageAvailable('localStorage') ? localStorage : sessionStorage;

      const access = storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      const refresh = storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);

      if (!access) return null;

      return { access, refresh };
    } catch (e) {
      console.error('Error reading tokens:', e);
      return null;
    }
  },

  /**
   * Get access token only
   */
  getAccessToken() {
    try {
      if (!isStorageAvailable('localStorage') && !isStorageAvailable('sessionStorage')) {
        return null;
      }

      const rememberMe = 
        isStorageAvailable('localStorage') && 
        localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
      
      const storage = rememberMe && isStorageAvailable('localStorage') ? localStorage : sessionStorage;
      return storage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (e) {
      return null;
    }
  },

  /**
   * Get refresh token only
   */
  getRefreshToken() {
    try {
      if (!isStorageAvailable('localStorage') && !isStorageAvailable('sessionStorage')) {
        return null;
      }

      const rememberMe = 
        isStorageAvailable('localStorage') && 
        localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
      
      const storage = rememberMe && isStorageAvailable('localStorage') ? localStorage : sessionStorage;
      return storage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (e) {
      return null;
    }
  },

  /**
   * Update access token (after refresh)
   */
  updateAccessToken(newAccessToken) {
    if (!isStorageAvailable('localStorage') && !isStorageAvailable('sessionStorage')) {
      return;
    }

    const rememberMe = 
      isStorageAvailable('localStorage') && 
      localStorage.getItem(STORAGE_KEYS.REMEMBER_ME) === 'true';
    
    const storage = rememberMe && isStorageAvailable('localStorage') ? localStorage : sessionStorage;
    storage.setItem(STORAGE_KEYS.ACCESS_TOKEN, newAccessToken);
  },

  /**
   * Clear all tokens from storage
   */
  clearTokens() {
    try {
      if (isStorageAvailable('localStorage')) {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.REMEMBER_ME);
      }
      if (isStorageAvailable('sessionStorage')) {
        sessionStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
        sessionStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
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
