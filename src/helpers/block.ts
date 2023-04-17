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
            block = ContainerBlock.create(block);
            block.children = mapStructure(block.children, resetId);
            break;
        case BLOCK_TYPES.PARAGRAPH:
            block = ParagraphBlock.create(block);
            break;
        case BLOCK_TYPES.HEADING:
            block = HeadingBlock.create(block);
            break;
        case BLOCK_TYPES.UL:
            block = UlBlock.create(block);
            block.children = mapStructure(block.children, resetId);
            break;
        case BLOCK_TYPES.IMAGE:
            block = ImageBlock.create(block);
            break;
        case BLOCK_TYPES.VIDEO:
            block = VideoBlock.create(block);
            break;
        case BLOCK_TYPES.BUTTON:
            block = ButtonBlock.create(block);
            break;
        case BLOCK_TYPES.ICON:
            block = IconBlock.create(block);
            break;
        case BLOCK_TYPES.AUDIO:
            block = AudioBlock.create(block);
            break;
        case BLOCK_TYPES.YOUTUBE:
            block = YoutubeBlock.create(block);
            break;
        case BLOCK_TYPES.VIMEO:
            block = VimeoBlock.create(block);
            break;
        case BLOCK_TYPES.HR:
            block = HrBlock.create(block);
            break;
        case BLOCK_TYPES.QUOTE:
            block = QuoteBlock.create(block);
            break;
        case BLOCK_TYPES.IFRAME:
            block = IframeBlock.create(block);
            break;
        case BLOCK_TYPES.SPOTIFY:
            block = SpotifyBlock.create(block);
            break;
        case BLOCK_TYPES.PARAGRAPH_VARIABLE:
            block = VariableParagraphBlock.create(block);
            break;
        case BLOCK_TYPES.HEADING_VARIABLE:
            block = VariableHeadingBlock.create(block);
            break;
        case BLOCK_TYPES.IMAGE_VARIABLE:
            block = VariableImageBlock.create(block);
            break;
        case BLOCK_TYPES.VIDEO_VARIABLE:
            block = VariableVideoBlock.create(block);
            break;
        case BLOCK_TYPES.AUDIO_VARIABLE:
            block = VariableAudioBlock.create(block);
            break;
        case BLOCK_TYPES.ICON_VARIABLE:
            block = VariableIconBlock.create(block);
            break;
        case BLOCK_TYPES.QUOTE_VARIABLE:
            block = VariableQuoteBlock.create(block);
            break;
        case BLOCK_TYPES.GOOGLE_MAPS:
            block = GoogleMapsBlock.create(block);
            break;
        case BLOCK_TYPES.GOOGLE_CALENDAR:
            block = GoogleCalendarBlock.create(block);
            break;
    }
    return block as BlockInterface;
}

export function mapStructure(structure, resetId = false) {
    return structure.map(block => mapBlock(block, resetId));
}
