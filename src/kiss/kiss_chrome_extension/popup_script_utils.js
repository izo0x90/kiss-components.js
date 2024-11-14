'use strict'
// Source as script in top popup page context

// Polyfilly browser if not available
if (typeof window.browser === 'undefined') {
  window.browser = window.chrome
}
