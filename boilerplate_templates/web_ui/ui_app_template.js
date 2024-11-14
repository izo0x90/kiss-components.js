import { BaseElement, PublicUiEvent } from 'path_to_library/kiss/kiss_web_ui/base.js'
import { ExampleComponent } from './component_template.js'

export class ExamplePublicEvent extends PublicUiEvent {
  static EVENTNAME = 'exampleEvent'
  static DataClass = class {
    constructor (eventDetailsPropInput) {
      this.someEventProp = eventDetailsPropInput
    }
  }

  constructor (eventDetails) {
    const eventData = { detail: eventDetails }
    super(ExamplePublicEvent.EVENTNAME, eventData)
  }
}

export class UiApp extends BaseElement {
  template = TEMPLATESTRING
  #PROPNAME = 'some-prop'
  #EXAMPLECOMPONENTID = 'example-component'

  buildComponent () {
    const templateInstance = this.defaultTemplate
    const exampleChildComponent = new ExampleComponent()
    exampleChildComponent.id = this.#EXAMPLECOMPONENTID
    templateInstance.utils.appendById('components-container', exampleChildComponent)

    return templateInstance
  }

  static get observedAttributes () {
    return []
  }

  onMount () {
    console.log('APP Mounted!')

    // Register event handlers here
    this.domUtils.addListenerById('refresh-button', 'click', this.eventHandlers.refreshClick)
  }

  // Organize event handler methods under .eventHandlers
  eventHandlers = {
    refreshClick: (_) => {
      const someEventProp = this.domUtils.byId(
        'main-element'
      ).getAttribute(this.#PROPNAME)

      this.commands.requestResults(someEventProp)
    }
  }

  // Publicly available commands are under .commands only on the root app component
  // the root component is responsible for managing the rest of the child components
  commands = {
    requestResults: (someEventProp) => {
      this.dispatchEvent(new ExamplePublicEvent(new ExamplePublicEvent.DataClass(someEventProp)))
    },

    updateResults: (resultsData) => {
      this.domUtils.byId(this.#EXAMPLECOMPONENTID).replaceResults(resultsData)
    }
  }
}

const TEMPLATESTRING = `
<div id="main-element" some-prop="true">  
  <button id="refresh-button">Click me!</button>
  <div id="components-container">
  </div>
</div>
`
