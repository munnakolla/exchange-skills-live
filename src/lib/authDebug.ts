// Utility functions for debugging authentication issues

export const clearAuthState = () => {
  // Clear all Supabase-related localStorage
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('supabase.')) {
      localStorage.removeItem(key);
    }
  });
  
  // Also clear sessionStorage
  const sessionKeys = Object.keys(sessionStorage);
  sessionKeys.forEach(key => {
    if (key.startsWith('supabase.')) {
      sessionStorage.removeItem(key);
    }
  });
  
  console.log('Cleared all Supabase auth state');
};

export const debugAuthState = () => {
  console.log('=== Auth Debug Info ===');
  console.log('URL:', window.location.href);
  console.log('Hostname:', window.location.hostname);
  console.log('Protocol:', window.location.protocol);
  
  console.log('\n=== LocalStorage ===');
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('supabase.')) {
      console.log(`${key}:`, localStorage.getItem(key));
    }
  });
  
  console.log('\n=== SessionStorage ===');
  const sessionKeys = Object.keys(sessionStorage);
  sessionKeys.forEach(key => {
    if (key.startsWith('supabase.')) {
      console.log(`${key}:`, sessionStorage.getItem(key));
    }
  });
  
  console.log('======================');
};

// Make these available globally for debugging
if (typeof window !== 'undefined') {
  (window as any).debugAuth = debugAuthState;
  (window as any).clearAuth = clearAuthState;
}
