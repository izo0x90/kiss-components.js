import {BaseElement} from "./base.js";

const APPCONFIGNAME = 'app_config.js';

export function camelize(kebabString) { return kebabString.replace(/-./g, x=>x[1].toUpperCase()); }

function elementNameFromClass(className, applicationNamePrefix) {
    const tokens = className.split(/(?=[A-Z])/); // Split class name on capital letters
    const elementName = applicationNamePrefix + '-' + tokens.map((token) => token.toLowerCase()).join('-');
    return elementName
}

export function createTemplate(htmlString) {
    const templateElement = document.createElement('template');
    templateElement.innerHTML = htmlString.trim();
    return templateElement;
}

function registerCustomComponents(appComponents, globalStyleSheets=[], applicationNamePrefix) {
    BaseElement.globalStyleSheets = globalStyleSheets;
    let elementName = null;
    for (let componentClass of appComponents) {
        elementName = elementNameFromClass(componentClass.name, applicationNamePrefix);
        customElements.define(elementName, componentClass);
    }
}

function registerPublicEvents(eventClasses) {
    const publicEvents = {};

    for (let eventClass of eventClasses) {
        publicEvents[eventClass.name] = eventClass;
    }

    return publicEvents;
}

export async function initSimpleWebCApp(appPath, rootAppId) {
    const app = await import(`${appPath}/${APPCONFIGNAME}`);
    const {APPCOMPONENTS, APPNAMEPREFIX, GLOBALSTYLESHEETS, PUBLICEVENTS} = app;
    registerCustomComponents(APPCOMPONENTS, GLOBALSTYLESHEETS, APPNAMEPREFIX)
    const publicEvents = registerPublicEvents(PUBLICEVENTS);

    const docDom = new domUtils(document, document);

    return {
            "appUi": docDom.byId(rootAppId), // Return root app element/ node/ object
            "publicUiEvents": publicEvents
    }
}

export class domUtils {
    constructor(dom, parentObject){
        this.dom = dom;
        this.parentObject = parentObject;
    }

    byId(elementId) {
        return this.dom.querySelector(`#${elementId}`)
    }

    updateTextById(elementId, text) {
        this.byId(elementId).innerText = text;
    }

    appendById(elementId, childElement) {
        this.byId(elementId).appendChild(childElement);
    }

    classListById(elementId) {
        return this.byId(elementId).classList
    }

    addListenerById(elementId, event_type, callback) {
        this.byId(elementId).addEventListener(
            event_type, 
            callback.bind(this.parentObject)
        )
    }

    elementIdFromHref(element) {
        const splitHrefStrings = element.href?.split('#', 2); 
        const [_, elementId] = splitHrefStrings ? splitHrefStrings : [null, undefined];
        return elementId
    }
}