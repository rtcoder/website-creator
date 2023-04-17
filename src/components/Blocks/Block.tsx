import styles from "@/styles/Components/Blocks/Block.module.scss"
import {RWD_MODES} from "@/enums/rwd";
import {STYLE_STATE_NAMES} from "@/enums/styleState";
import {BLOCK_TYPES, BLOCK_TYPES_HUMAN_NAMES} from "@/helpers/blocks";
import {eventEmitter, Events} from "@/helpers/EventEmitter";
import classNames from "@/helpers/classNames";
import {useDrag} from "react-dnd";
import ContainerBlockComponent from "@/components/Blocks/ContainerBlockComponent";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockProps} from "@/interfaces/BlockProps.interface";
import TextBlockComponent from "@/components/Blocks/TextBlockComponent";

export default function (props: BlockProps) {
    const {block, selectedBlock, rwdMode, styleState} = props;

    const [{opacity}, dragRef] = useDrag({
        type: `${BLOCK_TYPES_HUMAN_NAMES[block.type]}`,
        item: () => block,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const toggleSelected = (ev) => {
        if (!ev.target.closest('[contenteditable]')) {
            ev.stopPropagation();
        }
        if (ev.target.closest('[contenteditable]')) {
            eventEmitter.dispatch(Events.FORCE_SELECT_ELEMENT, block);
            return;
        }
        eventEmitter.dispatch(Events.SELECT_ELEMENT, block);
    };

    const classes = classNames({
        [styles.singleBlock]: true,
        [styles.selected]: selectedBlock?.id === block.id
    });

    return (
        <div className={classes}
             ref={dragRef}
             onClick={toggleSelected}
             style={block.styles.getInheritedStyle(rwdMode, styleState)}>
            <div className="mask-layer"></div>
            {/*${this.#getButtonsHtml()}*/}
            ${getBlockContent(block, selectedBlock, rwdMode, styleState)}
        </div>
    )

}

function getBlockContent(
    block: BlockInterface,
    selectedBlock: BlockInterface | null,
    rwdMode: RWD_MODES,
    styleState: STYLE_STATE_NAMES
) {
    switch (block.type) {
        case BLOCK_TYPES.CONTAINER:
            return <ContainerBlockComponent block={block} selectedBlock={selectedBlock} rwdMode={rwdMode}
                                            styleState={styleState}/>
        case BLOCK_TYPES.PARAGRAPH:
            return <TextBlockComponent block={block} multiline={true}/>
        case BLOCK_TYPES.HEADING:
            return <TextBlockComponent block={block} multiline={false}/>
        case BLOCK_TYPES.UL:

            break;
        case BLOCK_TYPES.IMAGE:

            break;
        case BLOCK_TYPES.VIDEO:

            break;
        case BLOCK_TYPES.BUTTON:
            return <TextBlockComponent block={block} multiline={false}/>
        case BLOCK_TYPES.ICON:

            break;
        case BLOCK_TYPES.AUDIO:

            break;
        case BLOCK_TYPES.YOUTUBE:

            break;
        case BLOCK_TYPES.VIMEO:

            break;
        case BLOCK_TYPES.HR:

            break;
        case BLOCK_TYPES.QUOTE:
            return <TextBlockComponent block={block} multiline={true}/>
        case BLOCK_TYPES.IFRAME:

            break;
        case BLOCK_TYPES.SPOTIFY:

            break;
        case BLOCK_TYPES.PARAGRAPH_VARIABLE:

            break;
        case BLOCK_TYPES.HEADING_VARIABLE:

            break;
        case BLOCK_TYPES.IMAGE_VARIABLE:

            break;
        case BLOCK_TYPES.VIDEO_VARIABLE:

            break;
        case BLOCK_TYPES.AUDIO_VARIABLE:

            break;
        case BLOCK_TYPES.ICON_VARIABLE:

            break;
        case BLOCK_TYPES.QUOTE_VARIABLE:

            break;
        case BLOCK_TYPES.GOOGLE_MAPS:

            break;
        case BLOCK_TYPES.GOOGLE_CALENDAR:

            break;
    }
    return '';
}
