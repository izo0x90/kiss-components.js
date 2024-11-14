export class CommandChannel {
  #instanceName = null
  #commandsMap = null

  constructor (commandsMap = null, instanceName = null) {
    this.#instanceName = instanceName || (window.crypto.randomUUID())
    if (commandsMap) this.#commandsMap = commandsMap
  }

  listenForCommands () {
    this.#setupListeners()
  }

  sendCommandToExtension (command, callbackFunction, data = null, receiverInstanceName = null) {
    window.browser.runtime.sendMessage({ receiverInstanceName, command, data }, function (response) {
      callbackFunction(response.data)
    })
  }

  sendCommandToActiveTab (command, callbackFunction, data = null, receiverInstanceName = null) {
    window.browser.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      window.browser.tabs.sendMessage(tabs[0].id, { receiverInstanceName, command, data }, function (response) {
        callbackFunction(response.data)
      })
    })
  }

  #executeCommand (commandName, commandInputData) {
    return this.#commandsMap[commandName](commandInputData)
  }

  #setupListeners () {
    window.browser.runtime.onMessage.addListener(this.#handleCommandMessages.bind(this))
  }

  #handleCommandMessages (message, sender, sendResponse) {
    if (message.receiverInstanceName == null || message.receiverInstanceName === this.#instanceName) {
      this.#executeCommand(message.command, message.data).then(result => {
        sendResponse({ farewell: this.#instanceName, data: result })
      })
      return true // Response will be sent async
    }
    return false // Listener instance will not handle message
  }
}
