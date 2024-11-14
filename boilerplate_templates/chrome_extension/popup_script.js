import { CommandChannel } from 'path_to_library/kiss/kiss_chrome_extension/message_utils.js'
import { COMMANDS } from './commands.js'

// Chrome extension specific
const commandMessageChannel = new CommandChannel()

// State management
function executeTestCommandInContentScript () {
  const payloadToSendTestCommand = {someData: 'Test data'}
  commandMessageChannel.sendCommandToActiveTab(COMMANDS.TEST, (results) => {
    // Here we can execute any callback once the Test command has executed and its results are returned
    console.log('Returning fresh results!')
  }, payloadToSendTestCommand)
}
