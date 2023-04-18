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
import HrBlockComponent from "@/components/Blocks/HrBlockComponent";
import YouTubeBlockComponent from "@/components/Blocks/YouTubeBlockComponent";
import VimeoBlockComponent from "@/components/Blocks/VimeoBlockComponent";
import SpotifyBlockComponent from "@/components/Blocks/SpotifyBlockComponent";
import GoogleMapsBlockComponent from "@/components/Blocks/GoogleMapsBlockComponent";
import GoogleCalendarBlockComponent from "@/components/Blocks/GoogleCalendarBlockComponent";
import IframeBlockComponent from "@/components/Blocks/IframeBlockComponent";
import ImageBlockComponent from "@/components/Blocks/ImageBlockComponent";
import VideoBlockComponent from "@/components/Blocks/VideoBlockComponent";
import AudioBlockComponent from "@/components/Blocks/AudioBlockComponent";

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
    const withoutProperties = ['width', 'min-width', 'max-width'];

    return (
        <div className={classes}
             ref={dragRef}
             onClick={toggleSelected}
             style={block.styles.getInheritedStyleWithout(rwdMode, styleState, withoutProperties)}>
            <div className={styles.maskLayer}/>
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
            return <TextBlockComponent block={block} multiline={true} editable={true}/>
        case BLOCK_TYPES.HEADING:
            return <TextBlockComponent block={block} editable={true}/>
        case BLOCK_TYPES.UL:

            break;
        case BLOCK_TYPES.IMAGE:
            return <ImageBlockComponent block={block}/>
        case BLOCK_TYPES.VIDEO:
            return <VideoBlockComponent block={block}/>
        case BLOCK_TYPES.BUTTON:
            return <TextBlockComponent block={block} editable={true}/>
        case BLOCK_TYPES.ICON:

            break;
        case BLOCK_TYPES.AUDIO:
            return <AudioBlockComponent block={block}/>
        case BLOCK_TYPES.YOUTUBE:
            return <YouTubeBlockComponent block={block}/>
        case BLOCK_TYPES.VIMEO:
            return <VimeoBlockComponent block={block}/>
        case BLOCK_TYPES.HR:
            return <HrBlockComponent/>
        case BLOCK_TYPES.QUOTE:
            return <TextBlockComponent block={block} editable={true}/>
        case BLOCK_TYPES.IFRAME:
            return <IframeBlockComponent block={block}/>
        case BLOCK_TYPES.SPOTIFY:
            return <SpotifyBlockComponent block={block}/>
        case BLOCK_TYPES.PARAGRAPH_VARIABLE:
            return <TextBlockComponent block={block}/>
        case BLOCK_TYPES.HEADING_VARIABLE:
            return <TextBlockComponent block={block}/>
        case BLOCK_TYPES.IMAGE_VARIABLE:

            break;
        case BLOCK_TYPES.VIDEO_VARIABLE:

            break;
        case BLOCK_TYPES.AUDIO_VARIABLE:

            break;
        case BLOCK_TYPES.ICON_VARIABLE:

            break;
        case BLOCK_TYPES.QUOTE_VARIABLE:
            return <TextBlockComponent block={block}/>
        case BLOCK_TYPES.GOOGLE_MAPS:
            return <GoogleMapsBlockComponent block={block}/>
        case BLOCK_TYPES.GOOGLE_CALENDAR:
            return <GoogleCalendarBlockComponent block={block}/>
    }
    return '';
}
