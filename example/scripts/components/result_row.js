import {BaseElement} from "/src/kiss/kiss_web_ui/base.js";

export class ResultRow extends BaseElement {
    template = TEMPLATESTRING;

    name = "";
    isOdd = false;
    rating = null;
    selectId = null;

    buildComponent(){
        const templateInstance = this.defaultTemplate;
        if (!this.isOdd)
            templateInstance.utils.classListById("result-instance").add("bg-light", "text-dark");
        templateInstance.utils.updateTextById("name", this.name);
        if (this.rating) {
            const message_div = templateInstance.querySelector(".result-rating");
            message_div.innerText = this.rating;
            message_div.style.display = "block";
        }
       return templateInstance;
    }

    static get observedAttributes() {
        return ["name", "is-odd", "rating", "select-id"]
    }
}

const TEMPLATESTRING =`
    <div id="result-instance">
        <div class="row no-gutters">
            <div class="col-1">
                <div class="input-group">
                    <div class="input-group-text">
                        <input class="result-select" type="checkbox" aria-label="Checkbox for following text input" value="test">
                    </div>
                </div>
            </div>
            <div id="name" class="col-11 text-center">No name</div>
        </div>
        <div class="result-rating text-center" style="display:none">
        </div>
    </div>
`;

