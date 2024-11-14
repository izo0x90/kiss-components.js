import { BaseElement } from './base.js'

const APPCONFIGNAME = 'app_config.js'

export function camelize (kebabString) { return kebabString.replace(/-./g, x => x[1].toUpperCase()) }

function elementNameFromClass (className, applicationNamePrefix) {
  const tokens = className.split(/(?=[A-Z])/) // Split class name on capital letters
  const elementName = applicationNamePrefix + '-' + tokens.map((token) => token.toLowerCase()).join('-')
  return elementName
}

export function CreateTemplate (htmlString) {
  const templateElement = document.createElement('template')
  templateElement.innerHTML = htmlString.trim()
  return templateElement
}

function registerCustomComponents (appComponents, globalStyleSheets = [], applicationNamePrefix) {
  BaseElement.globalStyleSheets = globalStyleSheets
  let elementName = null
  for (const ComponentClass of appComponents) {
    elementName = elementNameFromClass(ComponentClass.name, applicationNamePrefix)
    window.customElements.define(elementName, ComponentClass)
  }
}

function registerPublicEvents (eventClasses) {
  const publicEvents = {}

  for (const eventClass of eventClasses) {
    publicEvents[eventClass.name] = eventClass
  }

  return publicEvents
}

export async function initSimpleWebCApp (appPath, rootAppId) {
  const app = await import(`${appPath}/${APPCONFIGNAME}`)
  const { APPCOMPONENTS, APPNAMEPREFIX, GLOBALSTYLESHEETS, PUBLICEVENTS } = app
  registerCustomComponents(APPCOMPONENTS, GLOBALSTYLESHEETS, APPNAMEPREFIX)
  const publicEvents = registerPublicEvents(PUBLICEVENTS)

  const docDom = new DomUtils(document, document)

  return {
    appUi: docDom.byId(rootAppId), // Return root app element/ node/ object
    publicUiEvents: publicEvents
  }
}

export class DomUtils {
  constructor (dom, parentObject) {
    this.dom = dom
    this.parentObject = parentObject
  }

  byId (elementId) {
    return this.dom.querySelector(`#${elementId}`)
  }

  updateTextById (elementId, text) {
    this.byId(elementId).innerText = text
  }

  appendById (elementId, childElement) {
    this.byId(elementId).appendChild(childElement)
  }

  classListById (elementId) {
    return this.byId(elementId).classList
  }

  addListenerById (elementId, eventType, callback) {
    this.byId(elementId).addEventListener(
      eventType,
      callback.bind(this.parentObject)
    )
  }

  elementIdFromHref (element) {
    const splitHrefStrings = element.href?.split('#', 2)
    const [, elementId] = splitHrefStrings || [null, undefined]
    return elementId
  }
}
