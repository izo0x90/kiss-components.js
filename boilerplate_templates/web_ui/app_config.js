import { ExampleComponent } from './component_template.js'
import { UiApp, ExamplePublicEvent } from 'ui_app_template.js'

export const APPNAMEPREFIX = 'ap' // This will be appended to the front of the HTML tag ex. `ap-ui-app`

export const GLOBALSTYLESHEETS = [
  '<link rel="stylesheet" href="example_style_sheet.css">'
]

export const PUBLICEVENTS = [
  ExamplePublicEvent
]

// Order matters here. All child components used by parent components need to be registered before the
// parent component can be registered. Aka order should be leafs to root, it should be already clear but
// let us restate that cyclical dependency will break the component registration functionality
export const APPCOMPONENTS = [
  ExampleComponent,
  UiApp
]
