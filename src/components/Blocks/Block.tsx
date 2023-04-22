import styles from "@/styles/Components/Blocks/Block.module.scss"
import {BLOCK_TYPES, BLOCK_TYPES_HUMAN_NAMES} from "@/helpers/blocks";
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
import IconBlockComponent from "@/components/Blocks/IconBlockComponent";
import {getInheritedStyleWithout} from "@/helpers/block-styles";
import {useDispatch, useSelector} from "react-redux";
import {useCallback} from "react";
import {setSelectedBlock} from "@/store/structureSlice";

export default function (props: BlockProps) {
    const {block} = props;
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);

    const [{opacity}, dragRef] = useDrag({
        type: `${BLOCK_TYPES_HUMAN_NAMES[block.type]}`,
        item: () => block,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });
    const dispatch = useDispatch();

    const selectBlock = useCallback((blk) => {
        dispatch(setSelectedBlock(blk));
    }, [dispatch]);

    const toggleSelected = (ev) => {
        ev.stopPropagation();

        selectBlock({block, force: !!ev.target.closest('[contenteditable]')});
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
             style={getInheritedStyleWithout(block.styles, rwd, styleState, withoutProperties)}>
            <div className={styles.maskLayer}/>
            {/*${this.#getButtonsHtml()}*/}
            {getBlockContent(block)}
        </div>
    )

}

function getBlockContent(block: BlockInterface) {
    switch (block.type) {
        case BLOCK_TYPES.CONTAINER:
            return <ContainerBlockComponent id={block.id} children={block.children}/>
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
            return <IconBlockComponent block={block}/>
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
