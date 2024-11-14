import { initSimpleWebCApp } from '../../../../../../src/kiss/kiss_web_ui/utils.js'
import { CommandChannel } from '../../../../../../src/kiss/kiss_chrome_extension/message_utils.js'
import { COMMANDS } from './commands.js'

// Chrome extension specific
const commandMessageChannel = new CommandChannel()

// State management
function refreshResults (resultType, uiUpdateCallback, reload = false) {
  commandMessageChannel.sendCommandToActiveTab(COMMANDS.TEST, (results) => {
    console.log('Returning fresh results!')
    uiUpdateCallback(results)
  }, { resultType })
}

// Initialize
const { appUi, publicUiEvents } = await initSimpleWebCApp('../../../example/scripts/components', 'example-extension-app')

refreshResults(0, appUi.commands.updateResults, true)

// Register UI event handlers
document.addEventListener(
  publicUiEvents.RequestResultsEvent.EVENTNAME, (event) => {
    console.log('GOT Refresh request', event.detail.resultType, event.detail.refresh)
    if (event.detail.resultType != null) {
      refreshResults(
        event.detail.resultType,
        appUi.commands.updateResults,
        event.detail.refresh
      )
    }
  }
)
