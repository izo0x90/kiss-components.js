import { BaseElement } from '../../../../../../../src/kiss/kiss_web_ui/base.js'
import { ResultRow } from '../../../../../../../example/scripts/components/result_row.js'

export class ResultsList extends BaseElement {
  template = TEMPLATESTRING

  resultsData = null

  buildComponent () {
    const templateInstance = this.defaultTemplate
    console.log(this.resultsData)
    if (!this.resultsData) {
      return templateInstance
    }

    templateInstance.utils.byId('place-holder').style.display = 'none'
    for (const [index, resultData] of this.resultsData.entries()) {
      const resultRow = new ResultRow()
      const isOdd = index % 2
      resultRow.name = resultData.name
      resultRow.selectId = resultData.result_id
      resultRow.isOdd = isOdd
      if (resultData.rating) resultRow.rating = resultData.rating
      templateInstance.utils.appendById('results-panel', resultRow)
    }
    return templateInstance
  }

  static get observedAttributes () {
    return []
  }

  initResults (resultsData) {
    this.resultsData = resultsData
  }

  clearResults () {
    this.initResults(null)
    this.domUtils.byId('place-holder').style.display = 'block'
    this.domUtils.byId('results-panel')?.remove()
  }

  replaceResults (resultsData) {
    this.initResults(resultsData)
    this.refresh()
  }
}

const TEMPLATESTRING = `
<div class="row no-gutters mt-2">
    <div class="col-1">
        <button id="select-all-results">&#x2705;</button>
    </div>
    <div class="col-1 text-center">Dist</div>
    <div class="col-9 text-center">Name</div>
    <div class="col-1 text-center">Age</div>
</div>
<div id="place-holder" class="text-center">
        ⏲ Loading ...
</div>
<div id="results-panel">
    <!-- Results populated here -->
</div
`
