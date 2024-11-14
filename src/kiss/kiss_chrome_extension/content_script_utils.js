'use strict'
// Source as script in top content context aka in content script section of manifest.js file
// P.S. Order matters source before sourcing the content script using these utils

const mainModuleName = 'main.js'

// Polyfilly browser if not available
if (typeof window.browser === 'undefined') {
  window.browser = window.chrome
}

class MissingMainModulePathError extends Error {
  constructor (message) {
    super(message)
    this.name = 'MissingMainModulePathError'
  }
}

async function injectMainModule (modulePath) {
  // From Hiromu OCHIAI
  // https://github.com/otiai10/chrome-extension-es6-import
  const src = window.chrome.runtime.getURL(modulePath)
  await import(src)
}

function getMainModulePath () {
  const manifest = window.chrome.runtime.getManifest()
  let mainModuleUrl = null
  manifest.web_accessible_resources[0].resources.some((url) => {
    if (url.endsWith(mainModuleName)) {
      mainModuleUrl = url
      return true
    }
    return false
  })

  if (mainModuleUrl == null) {
    throw MissingMainModulePathError('Could not find path to main module in manifest.json')
  }

  return mainModuleUrl
}

const mainModuleUrl = getMainModulePath()
injectMainModule(mainModuleUrl)
