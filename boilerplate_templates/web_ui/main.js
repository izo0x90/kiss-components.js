import { initSimpleWebCApp } from 'path_to_library/kiss/kiss_web_ui/utils.js'

// Initialize
const { appUi, publicUiEvents } = await initSimpleWebCApp('/path_to_app_components_code', 'example-extension-app-id')

async function refreshResults (eventDetails, callback) {
  console.log('Do some required processing, I/O etc. and call the appropriate UI app command')
  // Pass the callback to some async function/s that is doing the processing
  // Pretend async block
  const pretendData = 'DATA'
  callback(pretendData)
}

// Register UI event handlers
document.addEventListener(
  publicUiEvents.ExamplePublicEvent.EVENTNAME, (event) => {
    console.log('Example event, details:', event.detail)
    if (event.detail.someEventProp != null) {
      refreshResults(
        event.detail,
        appUi.commands.updateResults
      )
    }
  }
)
