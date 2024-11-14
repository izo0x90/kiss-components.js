import {BaseElement, PublicUiEvent} from "/src/kiss/kiss_web_ui/base.js";
import {ResultsList} from "/example/scripts/components/results_list.js";
import { RESULTSTYPEPROPDATA } from "/example/scripts/commands.js";

export class RequestResultsEvent extends PublicUiEvent {

    static EVENTNAME = "requestResults"
    static DataClass = class {
        constructor(resultType, refresh=false) {
            this.resultType = resultType;
            this.refresh = refresh;
        }
    }

    constructor(eventDetails){
        const eventData = { "detail": eventDetails}
        super(RequestResultsEvent.EVENTNAME, eventData);
    }
}

export class UiApp extends BaseElement {
    template = TEMPLATESTRING;
    #RESULTTYPEPROPNAME = "data-result-type";
    #RESULTSLISTID = "result-list";

    buildComponent(){
        const templateInstance = this.defaultTemplate;
        const resultsList = new ResultsList();
        resultsList.id = this.#RESULTSLISTID;
        templateInstance.utils.appendById("results", resultsList);
        
        templateInstance.utils.byId("tab-1").setAttribute(this.#RESULTTYPEPROPNAME, 
                                                                RESULTSTYPEPROPDATA.VALUES.UNRATED);

        templateInstance.utils.byId("tab-2").setAttribute(this.#RESULTTYPEPROPNAME, 
                                                                 RESULTSTYPEPROPDATA.VALUES.RATED);
        return templateInstance;
    }

    static get observedAttributes() {
        return []
    }

    onMount() {
       console.log('APP Mounted!');

       this.domUtils.addListenerById("main-panel", "click", this.eventHandlers.tabsClick)
       this.domUtils.addListenerById("refresh-button", "click", this.eventHandlers.refreshClick)
    }

    eventHandlers = {
        tabsClick: (event) => {
            const tab_activation_classes = ["show", "active"];

            const targetTabLinkElement = event.target;
            const activeTabLinkElement = event.currentTarget.querySelector('.nav-link.active');
            const targetTabId = this.domUtils.elementIdFromHref(targetTabLinkElement);
            const activeTabId = this.domUtils.elementIdFromHref(activeTabLinkElement)
            if (targetTabId && activeTabId) {
                this.domUtils.classListById(activeTabId).remove(...tab_activation_classes);
                this.domUtils.classListById(targetTabId).add(...tab_activation_classes);
                activeTabLinkElement.classList.remove("active");
                targetTabLinkElement.classList.add("active");
                const resultType = targetTabLinkElement.getAttribute(this.#RESULTTYPEPROPNAME);
                this.commands.requestResults(resultType, false);
            }
        },
        
        refreshClick: (_) => {
            const resultType = this.domUtils.byId(
                                                    "main-panel"
                                                ).querySelector(
                                                    ".nav-link.active"
                                                ).getAttribute(this.#RESULTTYPEPROPNAME);

            this.commands.requestResults(resultType, true);
        } 
    }

    commands = {
        requestResults: (resultType, refresh) => {
            this.domUtils.byId(this.#RESULTSLISTID).clearResults();
            this.dispatchEvent(new RequestResultsEvent(new RequestResultsEvent.DataClass(resultType, refresh)));
        },

        updateResults: (resultsData) => {
            this.domUtils.byId(this.#RESULTSLISTID).replaceResults(resultsData);
        }
    }
}

const TEMPLATESTRING =`
<div class="container mw-100">  
    <ul class="nav nav-tabs mt-1" id="main-panel" role="tablist">
        <li class="nav-item">
            <a class="nav-link text-secondary" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link text-secondary active" id="tab-1" data-toggle="tab" href="#results" role="tab" aria-controls="results" aria-selected="false">Results</a>
        </li>      
        <li class="nav-item">
            <a class="nav-link text-secondary" id="tab-2" data-toggle="tab" href="#results" role="tab" aria-controls="results" aria-selected="false">Results with ratings</a>
        </li>
    </ul>

    <div class="tab-content" id="main-panel-tab-content">

        <div class="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
            <button class="btn btn-secondary" id="b1">Do things</button>
        </div>
        
        <div class="tab-pane fade show active" id="results" role="tabpanel" aria-labelledby="tab-1">
            <ns-test-input></ns-test-input>
            <div class="row no-gutters mt-2" id="data-controls">
                <div class="col-10">Filters placeholder</div>     
                <div class="col-2 text-center">
                    <button class="btn btn-outline-primary btn-sm mx-auto" id="refresh-button">Refresh</button> 
                </div>     
            </div>
        </div>

    </div>
</div>
`;
