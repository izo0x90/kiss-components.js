import {camelize, createTemplate, domUtils} from "./utils.js";

export class PublicUiEvent extends CustomEvent {
    PUBLICEVENT = true    
    constructor(eventName, eventData){
        eventData.bubbles = true;
        super(eventName, eventData);
    }
}

export class BaseElement extends HTMLElement {
    isInitiated = false;
    template = null;
    templateElement = null;
    completedTemplate = null;
    domUtils = null;

    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.registerStyleSheets()
        this.domUtils = new domUtils(this.shadowRoot, this);
    }

    connectedCallback() {
        this.setup();
        this.isInitiated = true;
        this.refresh();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (newValue !== oldValue && this.isConnected) {
            this[camelize(name)] = newValue;
            if (this.isInitiated) {
                this.refresh();
            }
        }
    }

    registerStyleSheets() {
        for (let styleSheetLink of this.constructor.globalStyleSheets) {
            this.shadowRoot.innerHTML += styleSheetLink;
        }
    }
    
    setup() {
        if (this.template) this.templateElement = createTemplate(this.template);
    }

    get defaultTemplate() {
        const defaultTemplate = this.templateElement.content.cloneNode(true);
        defaultTemplate.utils = new domUtils(defaultTemplate, defaultTemplate);
        return defaultTemplate;
    }

    render() {
        this.shadowRoot.innerHTML = '';
        this.registerStyleSheets()
        this.shadowRoot.appendChild(this.completedTemplate);
    }

    refresh() {
        this.completedTemplate = this.buildComponent();
        this.render();
        this.onMount();
    }

    buildComponent() {
        // Houses code that produces component DOM content
        // Returns:
        //  Fully populated template instance based on the component base template
    }

    onMount() {
        // Hook to run code once component has been drawn
        // Register event handlers etc. here
    }

}
