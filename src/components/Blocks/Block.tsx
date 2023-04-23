import styles from "@/styles/Components/Blocks/Block.module.scss"
import stylesActionButtons from "@/components/ActionButtons/ActionButtons.module.scss"
import {BLOCK_TYPES_HUMAN_NAMES} from "@/helpers/blocks";
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
import {useCallback, useState} from "react";
import {setSelectedBlock} from "@/store/structureSlice";
import ActionButtons from "@/components/ActionButtons/ActionButtons";
import {BlockTypes} from "@/types/block-type";
import CONTAINER = BlockTypes.CONTAINER;

export default function Block(props: BlockProps) {
    const {block} = props;
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useDispatch();

    const [{opacity}, dragRef] = useDrag({
        type: `${BLOCK_TYPES_HUMAN_NAMES[block.type]}`,
        item: () => block,
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    const selectBlock = useCallback((blk) => {
        dispatch(setSelectedBlock(blk));
    }, [dispatch]);

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
        const clickOnActionButton = !!ev.target.closest(`.${stylesActionButtons.actionButtons}`);
        const force = clickOnEditableChild || clickOnTextField || clickOnActionButton;

        selectBlock({block, force});
    };
    const isSelected = () => selectedBlock?.id === block.id;

    const classes = classNames({
        [styles.singleBlock]: true,
        [styles.selected]: isSelected(),
        [styles.hovered]: isHovered,
    });
    const withoutProperties = ['width', 'min-width', 'max-width'];

    return (
        <div className={classes}
             ref={dragRef}
             onClick={toggleSelected}
             onMouseOver={onMouseOver}
             onMouseLeave={onMouseLeave}
             style={getInheritedStyleWithout(block.styles, rwd, styleState, withoutProperties)}>
            <div className={styles.maskLayer}/>
            {isSelected() ? <ActionButtons block={block}/> : ''}
            {getBlockContent(block)}
        </div>
    )

}

function getBlockContent(block: BlockInterface) {
    switch (block.type) {
        case BlockTypes.CONTAINER:
            return <ContainerBlockComponent id={block.id} children={block.children}/>
        case BlockTypes.PARAGRAPH:
            return <TextBlockComponent block={block} multiline={true} editable={true}/>
        case BlockTypes.HEADING:
            return <TextBlockComponent block={block} editable={true}/>
        case BlockTypes.UL:

            break;
        case BlockTypes.IMAGE:
            return <ImageBlockComponent block={block}/>
        case BlockTypes.VIDEO:
            return <VideoBlockComponent block={block}/>
        case BlockTypes.BUTTON:
            return <TextBlockComponent block={block} editable={true}/>
        case BlockTypes.ICON:
            return <IconBlockComponent block={block}/>
        case BlockTypes.AUDIO:
            return <AudioBlockComponent block={block}/>
        case BlockTypes.YOUTUBE:
            return <YouTubeBlockComponent block={block}/>
        case BlockTypes.VIMEO:
            return <VimeoBlockComponent block={block}/>
        case BlockTypes.HR:
            return <HrBlockComponent/>
        case BlockTypes.QUOTE:
            return <TextBlockComponent block={block} editable={true}/>
        case BlockTypes.IFRAME:
            return <IframeBlockComponent block={block}/>
        case BlockTypes.SPOTIFY:
            return <SpotifyBlockComponent block={block}/>
        case BlockTypes.PARAGRAPH_VARIABLE:
            return <TextBlockComponent block={block}/>
        case BlockTypes.HEADING_VARIABLE:
            return <TextBlockComponent block={block}/>
        case BlockTypes.IMAGE_VARIABLE:

            break;
        case BlockTypes.VIDEO_VARIABLE:

            break;
        case BlockTypes.AUDIO_VARIABLE:

            break;
        case BlockTypes.ICON_VARIABLE:

            break;
        case BlockTypes.QUOTE_VARIABLE:
            return <TextBlockComponent block={block}/>
        case BlockTypes.GOOGLE_MAPS:
            return <GoogleMapsBlockComponent block={block}/>
        case BlockTypes.GOOGLE_CALENDAR:
            return <GoogleCalendarBlockComponent block={block}/>
    }
    return '';
}
