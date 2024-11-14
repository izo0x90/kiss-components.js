import { CommandChannel } from "/src/kiss/kiss_chrome_extension/message_utils.js"

import {COMMANDS, RESULTSTYPEPROPDATA} from "./commands.js";


function extractResults(resultType) {
  let results = []
  Array.from(document.getElementById("rso")?.children).forEach(
    (element, i) => {
      const name = element?.getElementsByTagName("h3")[0]?.textContent;
      const rating = element?.querySelectorAll(`span[role="img"]`)[0]?.getAttribute("aria-label");

      let result = {result_id: i, name: name, };
      if (resultType == 1) {
        result.rating = rating 
      }

      results.push(result);
    }
  );

  return results;
}

// Commands
async function testCommand(inputData) {
  console.log(`TEST COMMAND REQUEST RECEIVED, Got ${inputData}`)
  let results;
  results = extractResults(inputData.resultType);
  return new Promise(resolve => resolve(results))
} 

// Event listeners and messages
let commandsMap = {
  [COMMANDS.TEST]: testCommand,
}
const commandMessageChannel = new CommandChannel(commandsMap);
commandMessageChannel.listenForCommands();


//Init finished
console.log("Example chrome extension activated!");