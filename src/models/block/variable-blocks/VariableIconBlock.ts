import {VariableBlock} from "@/models/VariableBlock";
import {BLOCK_TYPES} from "@/helpers/blocks";
import {IconBlock} from "@/models/block/basic-blocks/IconBlock";

export class VariableIconBlock extends VariableBlock {
    type = BLOCK_TYPES.ICON_VARIABLE;

    getStartingStyle() {
        return IconBlock.getIconStartingStyles();
    }

    getContentHtml() {
        return '<my-icon type="fontawesome" name="fa-thin fa-icons"></my-icon>';
    }

    getStartingTagName() {
        return 'my-icon';
    }
}
