#  :kiss: kiss-components.js
<p align="center">
<img src="https://imgs.xkcd.com/comics/standards.png" height="200px">
</p>

Ultra minimalistic UI/Web components and Chrome extension Javascript framework. (OMG not another one!)

There are two parts to this "framework" that are related but can be used independantly from eachother:
- KISS-WebUI, This is a minimal WebComponent framework that provides just enough scaffold to define a UI App and Components
- KISS-Chrome-extension, This is a minimal library (yes, this one is just a library) to help with writing Chrome extensions

And I suppose there is third part to all of this:
- Set of boilerplate templates that go along with the peices mentioned above, as a way to setup projects quickly and define the intended approach

## WebUI Overview
- Structure to define UI web apps
- A simplified way to define WebComponents
- Basic utils to work with WebComponent HTML templates and shadowdom
- Opinionated approach to interaction between UI app and "business" logic
  - Using "public" events and "public" UI app commands

## Chrome-extension Overview
- A message dispatching and command registration system to allow interactions between the extension and the content sctipts (where the actual website code/ data reside)
- A way to easily inject content scripts in the site and use code sparated in ECMA modules

## WebUI Quick start
Start by creating root UI app component as seen in the template below. All componenets inherit from the BaseComponent class follow the structure shown in the `web_ui` templates, this is what takes care of handling all the WebComponents boilerplate.

https://github.com/izo0x90/kiss-components.js/blob/632dbcef2c082332a8bcdd66ad8fcdc3d6ebd3bb/boilerplate_templates/web_ui/ui_app_template.js#L1-L73

The creating and hydrating the Components DOM is done in the componenets `buildComponent` method. Here we get a new template instance from `this.defaultTemplate` and are then able to manipulate the template instance DOM using the provided DOM utils under `templateInstance.utils`. This template instance is returned by the `buildComponent` method and becomes the components shadow DOM.

https://github.com/izo0x90/kiss-components.js/blob/632dbcef2c082332a8bcdd66ad8fcdc3d6ebd3bb/boilerplate_templates/web_ui/ui_app_template.js#L23-L30

Components shadow DOM can be manipulated to up dynamically update the component by using the utilities on the component instance under `this.domUtils`.

https://github.com/izo0x90/kiss-components.js/blob/632dbcef2c082332a8bcdd66ad8fcdc3d6ebd3bb/boilerplate_templates/web_ui/ui_app_template.js#L36-L41

On the root componenet is where we declare any "public" commands that the business logic will use to request change in the UI. In the case of the template file here we are also declaring our "public" events that the UI will issue when it needs to communicate something to the business logic. You can see how the business logic, instanciates the UI app, subscribes to those public events, and calls UI commands in the template below.

https://github.com/izo0x90/kiss-components.js/blob/632dbcef2c082332a8bcdd66ad8fcdc3d6ebd3bb/boilerplate_templates/web_ui/main.js#L1-L25

## Chrome-extension Quick start

The chrome extension libarary allows to inject a contnet script in the webpage and have the extension execute commands that have been define in the content scripts by using a command channel that is established between both. This allows the extension to manipulate the underlying web page, extract data from its DOM, issue fetch request in the pages/tabs context etc.

Here you can see how the extensions script is able to issue a command to execute in the active tab and get back the results of that command:
https://github.com/izo0x90/kiss-components.js/blob/632dbcef2c082332a8bcdd66ad8fcdc3d6ebd3bb/boilerplate_templates/chrome_extension/popup_script.js#L1-L14

And below is the basic way to set up those commands in the content script module:
https://github.com/izo0x90/kiss-components.js/blob/632dbcef2c082332a8bcdd66ad8fcdc3d6ebd3bb/boilerplate_templates/chrome_extension/main.js#L1-L25

The main content script module will be automatically injected in the page, allowing for ECMA style modules loading for any additioal code that needs to run in the page/ tab sandbox. The library finds the the main content script module by looking for the first file with name `main.js` listed under the first webresource listed in  `manifest.json`, so make sure set that up accordingly:

https://github.com/izo0x90/kiss-components.js/blob/632dbcef2c082332a8bcdd66ad8fcdc3d6ebd3bb/boilerplate_templates/chrome_extension/manifest.json#L15-L23

For more complete details look here:

https://github.com/izo0x90/kiss-components.js/blob/632dbcef2c082332a8bcdd66ad8fcdc3d6ebd3bb/boilerplate_templates/chrome_extension/

## KISS WebUI and Chrome extension used together

Checkout:

https://github.com/izo0x90/kiss-components.js/tree/632dbcef2c082332a8bcdd66ad8fcdc3d6ebd3bb/example

and 

https://github.com/izo0x90/kiss-components.js/tree/632dbcef2c082332a8bcdd66ad8fcdc3d6ebd3bb/manifest.json
