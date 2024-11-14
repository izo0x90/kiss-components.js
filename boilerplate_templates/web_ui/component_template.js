import { BaseElement } from 'path_to_library/kiss/kiss_web_ui/base.js'

export class ExampleComponent extends BaseElement {
  template = TEMPLATESTRING
  #RESULTSID = 'data'

  exampleProp = null
  exampleAttrib = null

  buildComponent () {
    const templateInstance = this.defaultTemplate
    templateInstance.utils.updateTextById('example-id', this.exampleProp)
    const span = document.createElement('span')
    span.id = this.#RESULTSID
    templateInstance.utils.appendById('main-example-id', span)
    return templateInstance
  }

  static get observedAttributes () {
    // Any values set on the element attribute `example-attrib` will be set on this.exampleAttrib and
    // component will be on real DOM and redrawn
    return ['example-attrib']
  }

  replaceResults (resultsData) {
    this.domUtils.updateTextbyId(this.#RESULTSID, resultsData)
  }
}

const TEMPLATESTRING = `
    <div id="main-example-id">
      <div id="example-id">
      </div>
    </div>
`
