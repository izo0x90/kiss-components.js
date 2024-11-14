'use strict';
// Source as script in top content context aka in content script section of manifest.js file
// P.S. Order matters source before sourcing the content script using these utils

// Polyfilly browser if not available
if (typeof browser === "undefined") {
    var browser = chrome;
}

async function injectMainModule(modulePath) {
    // From Hiromu OCHIAI
    // https://github.com/otiai10/chrome-extension-es6-import 
    const src = chrome.runtime.getURL(modulePath);
    const contentMain = await import(src);
}