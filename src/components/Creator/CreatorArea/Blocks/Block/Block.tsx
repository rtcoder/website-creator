import styles from "./Block.module.scss"
import {BLOCK_TYPES_HUMAN_NAMES} from "@/helpers/blocks";
import classNames from "@/helpers/classNames";
import {useDrag} from "react-dnd";
import ContainerBlock from "@/components/Creator/CreatorArea/Blocks/ContainerBlock";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockProps} from "@/interfaces/BlockProps.interface";
import TextBlock from "@/components/Creator/CreatorArea/Blocks/TextBlock";
import HrBlock from "@/components/Creator/CreatorArea/Blocks/HrBlock";
import YouTubeBlock from "@/components/Creator/CreatorArea/Blocks/YouTubeBlock";
import VimeoBlock from "@/components/Creator/CreatorArea/Blocks/VimeoBlock";
import SpotifyBlock from "@/components/Creator/CreatorArea/Blocks/SpotifyBlock";
import GoogleMapsBlock from "@/components/Creator/CreatorArea/Blocks/GoogleMapsBlock";
import GoogleCalendarBlock from "@/components/Creator/CreatorArea/Blocks/GoogleCalendarBlock";
import IframeBlock from "@/components/Creator/CreatorArea/Blocks/IframeBlock";
import ImageBlock from "@/components/Creator/CreatorArea/Blocks/ImageBlock";
import VideoBlock from "@/components/Creator/CreatorArea/Blocks/VideoBlock";
import AudioBlock from "@/components/Creator/CreatorArea/Blocks/AudioBlock";
import IconBlock from "../IconBlock/IconBlock";
import {getInheritedStyleWithout} from "@/helpers/block-styles";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useState} from "react";
import {setSelectedBlock} from "@/store/structureSlice";
import {BlockTypes} from "@/types/block-type";
import {isMobile} from "@/helpers/mobile-detector";


export default function Block(props: BlockProps) {
    const {block} = props;
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const hiddenBlocksIds = useSelector((state: any) => state.structure.hiddenBlocksIds);
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();
    const defaultOffset = {
        x: 0,
        y: 0,
    };
    const [{isDragging, offset}, dragRef] = useDrag({
        type: `${BLOCK_TYPES_HUMAN_NAMES[block.type]}`,
        item: () => block,
        canDrag: () => {
            return isMobile() ? (block.id === selectedBlock?.id) : true;
        },
        collect: (monitor) => {
            const isDragging = monitor.isDragging();
            const offset = isDragging ? (monitor.getDifferenceFromInitialOffset() || defaultOffset) : defaultOffset;
            return {
                isDragging,
                offset
            }
        }
    });

    const selectBlock = useCallback((blk) => {
        dispatch(setSelectedBlock(blk));
    }, [dispatch]);
    const isHidden = () => {
        return hiddenBlocksIds.includes(block.id)
    }
    const onMouseOver = () => {
        setIsHovered(true);
    };
    const onMouseLeave = () => {
        setIsHovered(false);
    };
    const toggleSelected = (ev) => {
        ev.stopPropagation();
        const clickOnEditableChild = !!ev.target.closest('[contenteditable]');
        const clickOnTextField = !!ev.target.closest('input');
        const force = clickOnEditableChild || clickOnTextField;

        selectBlock({block, force});
    };

    const classes = classNames({
        [styles.singleBlock]: true,
        [styles.hovered]: isHovered,
        [styles.minimized]: isHidden()
    });
    const withoutProperties = ['width', 'min-width', 'max-width', 'margin-top', 'margin-bottom', 'margin-left', 'margin-right'];
    const style = {
        ...getInheritedStyleWithout(block.styles, rwd, styleState, withoutProperties) as any,
        ...(isDragging ? {
            top: offset.y + "px",
            left: offset.x + "px",
            zIndex: 100000,
            pointerEvents: 'none'
        } : {})
    }
    return (
        <div className={classes}
             ref={dragRef}
             onClick={toggleSelected}
             onMouseOver={onMouseOver}
             onMouseLeave={onMouseLeave}
             data-id={block.id}
             style={style}>

            <div className={styles.maskLayer}
                 title={BLOCK_TYPES_HUMAN_NAMES[block.type]}>
                {BLOCK_TYPES_HUMAN_NAMES[block.type]}
            </div>

            {getBlockContent(block)}
        </div>
    )

}

function getBlockContent(block: BlockInterface) {
    switch (block.type) {
        case BlockTypes.CONTAINER:
            return <ContainerBlock id={block.id} blocks={block.children}/>
        case BlockTypes.PARAGRAPH:
            return <TextBlock block={block} multiline={true} editable={true}/>
        case BlockTypes.HEADING:
            return <TextBlock block={block} editable={true}/>
        case BlockTypes.UL:

            break;
        case BlockTypes.IMAGE:
            return <ImageBlock block={block}/>
        case BlockTypes.VIDEO:
            return <VideoBlock block={block}/>
        case BlockTypes.BUTTON:
            return <TextBlock block={block} editable={true}/>
        case BlockTypes.ICON:
            return <IconBlock block={block}/>
        case BlockTypes.AUDIO:
            return <AudioBlock block={block}/>
        case BlockTypes.YOUTUBE:
            return <YouTubeBlock block={block}/>
        case BlockTypes.VIMEO:
            return <VimeoBlock block={block}/>
        case BlockTypes.HR:
            return <HrBlock/>
        case BlockTypes.QUOTE:
            return <TextBlock block={block} editable={true}/>
        case BlockTypes.IFRAME:
            return <IframeBlock block={block}/>
        case BlockTypes.SPOTIFY:
            return <SpotifyBlock block={block}/>
        case BlockTypes.PARAGRAPH_VARIABLE:
            return <TextBlock block={block}/>
        case BlockTypes.HEADING_VARIABLE:
            return <TextBlock block={block}/>
        case BlockTypes.IMAGE_VARIABLE:

            break;
        case BlockTypes.VIDEO_VARIABLE:

            break;
        case BlockTypes.AUDIO_VARIABLE:

            break;
        case BlockTypes.ICON_VARIABLE:

            break;
        case BlockTypes.QUOTE_VARIABLE:
            return <TextBlock block={block}/>
        case BlockTypes.GOOGLE_MAPS:
            return <GoogleMapsBlock block={block}/>
        case BlockTypes.GOOGLE_CALENDAR:
            return <GoogleCalendarBlock block={block}/>
    }
    return '';
}
