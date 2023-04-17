import {BLOCK_TYPES} from "@/helpers/blocks";
import {ContainerBlock} from "@/models/block/basic-blocks/ContainerBlock";
import {ParagraphBlock} from "@/models/block/basic-blocks/ParagraphBlock";
import {HeadingBlock} from "@/models/block/basic-blocks/HeadingBlock";
import {UlBlock} from "@/models/block/basic-blocks/UlBlock";
import {ImageBlock} from "@/models/block/basic-blocks/ImageBlock";
import {VideoBlock} from "@/models/block/basic-blocks/VideoBlock";
import {ButtonBlock} from "@/models/block/basic-blocks/ButtonBlock";
import {IconBlock} from "@/models/block/basic-blocks/IconBlock";
import {AudioBlock} from "@/models/block/basic-blocks/AudioBlock";
import {YoutubeBlock} from "@/models/block/embed-blocks/YoutubeBlock";
import {VimeoBlock} from "@/models/block/embed-blocks/VimeoBlock";
import {HrBlock} from "@/models/block/basic-blocks/HrBlock";
import {QuoteBlock} from "@/models/block/basic-blocks/QuoteBlock";
import {IframeBlock} from "@/models/block/basic-blocks/IframeBlock";
import {SpotifyBlock} from "@/models/block/embed-blocks/SpotifyBlock";
import {VariableParagraphBlock} from "@/models/block/variable-blocks/VariableParagraphBlock";
import {VariableHeadingBlock} from "@/models/block/variable-blocks/VariableHeadingBlock";
import {VariableImageBlock} from "@/models/block/variable-blocks/VariableImageBlock";
import {VariableVideoBlock} from "@/models/block/variable-blocks/VariableVideoBlock";
import {VariableAudioBlock} from "@/models/block/variable-blocks/VariableAudioBlock";
import {VariableIconBlock} from "@/models/block/variable-blocks/VariableIconBlock";
import {VariableQuoteBlock} from "@/models/block/variable-blocks/VariableQuoteBlock";
import {GoogleMapsBlock} from "@/models/block/embed-blocks/GoogleMapsBlock";
import {GoogleCalendarBlock} from "@/models/block/embed-blocks/GoogleCalendarBlock";
import {BlockInterface, BlockPlainInterface} from "@/interfaces/Block.interface";

export function mapBlock(block: Partial<BlockPlainInterface>, resetId = false): BlockInterface {
    block = {...block};
    if (resetId) {
        block.id = null;
    }
    switch (block.type) {
        case BLOCK_TYPES.CONTAINER:
            block = new ContainerBlock(block);
            break;
        case BLOCK_TYPES.PARAGRAPH:
            block = new ParagraphBlock(block);
            break;
        case BLOCK_TYPES.HEADING:
            block = new HeadingBlock(block);
            break;
        case BLOCK_TYPES.UL:
            block = new UlBlock(block);
            break;
        case BLOCK_TYPES.IMAGE:
            block = new ImageBlock(block);
            break;
        case BLOCK_TYPES.VIDEO:
            block = new VideoBlock(block);
            break;
        case BLOCK_TYPES.BUTTON:
            block = new ButtonBlock(block);
            break;
        case BLOCK_TYPES.ICON:
            block = new IconBlock(block);
            break;
        case BLOCK_TYPES.AUDIO:
            block = new AudioBlock(block);
            break;
        case BLOCK_TYPES.YOUTUBE:
            block = new YoutubeBlock(block);
            break;
        case BLOCK_TYPES.VIMEO:
            block = new VimeoBlock(block);
            break;
        case BLOCK_TYPES.HR:
            block = new HrBlock(block);
            break;
        case BLOCK_TYPES.QUOTE:
            block = new QuoteBlock(block);
            break;
        case BLOCK_TYPES.IFRAME:
            block = new IframeBlock(block);
            break;
        case BLOCK_TYPES.SPOTIFY:
            block = new SpotifyBlock(block);
            break;
        case BLOCK_TYPES.PARAGRAPH_VARIABLE:
            block = new VariableParagraphBlock(block);
            break;
        case BLOCK_TYPES.HEADING_VARIABLE:
            block = new VariableHeadingBlock(block);
            break;
        case BLOCK_TYPES.IMAGE_VARIABLE:
            block = new VariableImageBlock(block);
            break;
        case BLOCK_TYPES.VIDEO_VARIABLE:
            block = new VariableVideoBlock(block);
            break;
        case BLOCK_TYPES.AUDIO_VARIABLE:
            block = new VariableAudioBlock(block);
            break;
        case BLOCK_TYPES.ICON_VARIABLE:
            block = new VariableIconBlock(block);
            break;
        case BLOCK_TYPES.QUOTE_VARIABLE:
            block = new VariableQuoteBlock(block);
            break;
        case BLOCK_TYPES.GOOGLE_MAPS:
            block = new GoogleMapsBlock(block);
            break;
        case BLOCK_TYPES.GOOGLE_CALENDAR:
            block = new GoogleCalendarBlock(block);
            break;
    }
    block.children = mapStructure(block.children, resetId);
    return block;
}

export function mapStructure(structure, resetId = false) {
    return structure.map(block => mapBlock(block, resetId));
}
