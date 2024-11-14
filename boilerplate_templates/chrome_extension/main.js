// This is the main content script module that will get injected into the page with access to it's DOM etc.
import { CommandChannel } from 'path_to_library/kiss/kiss_chrome_extension/message_utils.js'

import { COMMANDS } from './commands.js'

// Commands
async function testCommand (inputData) {
  // This code will execute in the webpages sandbox, allowing to access it's contents, issue fetch requests etc.
  console.log(`TEST COMMAND REQUEST RECEIVED, Got ${inputData}`)
  const results = document.getElementsByTagName('h3')[0]?.textContent
  return new Promise(resolve => resolve(results))
}

// The chrome extension script can trigger commands to execute in the webpages sandbox by sending a
// message along the commandMessageChannel, as demonstrated in `popup_script.js`.
// Results of a command will be sent back to the caller along the channel.
// Event listeners and messages
const commandsMap = {
  [COMMANDS.TEST]: testCommand
}
const commandMessageChannel = new CommandChannel(commandsMap)
commandMessageChannel.listenForCommands()

// Init finished
console.log('Content script injected into web page.')
