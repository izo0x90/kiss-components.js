import {BaseElement} from "path_to_library/kiss/kiss_web_ui/base.js";

export class ExampleComponent extends BaseElement {
    template = TEMPLATESTRING;

    exampleProp = null;
    exampleAttrib = null;

    buildComponent(){
        const templateInstance = this.defaultTemplate;
        templateInstance.utils.updateTextById("example-id", this.exampleProp);
        return templateInstance;
    }

    static get observedAttributes() {
        // Any values set on the element attribute `example-attrib` will be set on this.exampleAttrib and
        // component will be on real DOM and redrawn
        return ["example-attrib"]
    }
}

const TEMPLATESTRING =`
    <div id="example-id">
        Text that will be set to exampleProp.
    </div>
`;
