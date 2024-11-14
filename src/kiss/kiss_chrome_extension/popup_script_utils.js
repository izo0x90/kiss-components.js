'use strict';
// Source as script in top popup page context

// Polyfilly browser if not available
if (typeof browser === "undefined") {
    var browser = chrome;
}