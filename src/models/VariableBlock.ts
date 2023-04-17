import {BlockHTML} from "@/models/BlockHTML";

export class VariableBlock extends BlockHTML {

    getContentHtml() {
        return this.generateSelector();
    }
}
