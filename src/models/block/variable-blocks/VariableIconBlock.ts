import {BLOCK_TYPES} from "@/helpers/blocks";
import {IconBlock} from "@/models/block/basic-blocks/IconBlock";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class VariableIconBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): VariableIconBlock {
        return new VariableIconBlock({...data, type: BLOCK_TYPES.ICON_VARIABLE});
    }

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
