import { BaseElement } from '../../../../../../../src/kiss/kiss_web_ui/base.js'

const DEFAULTINPUT = 'Test input string'
export class TestInput extends BaseElement {
  template = TEMPLATESTRING
  input_data = DEFAULTINPUT

  buildComponent () {
    const templateInstance = this.defaultTemplate
    templateInstance.utils.updateTextById('test-input', this.input_data)
    return templateInstance
  }

  static get observedAttributes () {
    return []
  }
}

const TEMPLATESTRING = `
    <div class="input-group mt-2">
        <textarea id="test-input" class="form-control" aria-label="Test input data">
          Test input string
        </textarea>
        <div class="input-group-append">
            <button id="test-input-submit" class="btn btn-outline-primary" type="button">
                Submit
            </button>
        </div>
    </div>
`
