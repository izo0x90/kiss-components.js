import {BaseElement} from "/src/kiss/kiss_web_ui/base.js";
import {ResultRow} from "/example/scripts/components/result_row.js";
import {ResultsList} from "/example/scripts/components/results_list.js";
import {TestInput} from "/example/scripts/components/test_input.js";
import {UiApp, RequestResultsEvent} from "/example/scripts/components/ui_app.js";

export const APPNAMEPREFIX = "ns";

export const GLOBALSTYLESHEETS = [
    '<link rel="stylesheet" href="/example/css/style.css">', 
    '<link rel="stylesheet" href="/example/css/bootstrap.min.css">'
];

export const PUBLICEVENTS = [
  RequestResultsEvent
];

// Order matters here. All child components used by parent components need to be registered before the 
// parent component can be registered. Aka order should be leafs to root, it should be already clear but
// let us restate that cyclical dependency will break the component registration functionality
export const APPCOMPONENTS = [
    TestInput,
    ResultRow,
    ResultsList,
    UiApp,
];
