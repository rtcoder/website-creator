import {BlockLinkInterface} from "@/interfaces/BlockLink.interface";
import {IconType} from "@/components/construction/Icon/Icon";
import {WithStyles} from "@/interfaces/Styles.interface";
import {BlockTypes} from "@/types/block-type";

export interface BlockInterface extends WithStyles {
    id: string;
    type: BlockTypes.BlockType;
    tagName: TagName;
    children: BlockInterface[];
    textContent: string;
    settings: BlockSettingsInterface;
    attributes: BlockAttributesInterface;
    blockLink: BlockLinkInterface | null;
}

export interface BlockSettingsInterface {
    icon?: BlockSettingsIconInterface;
}

export interface BlockSettingsIconInterface {
    type: IconType;
    name: string;
}

export interface BlockAttributesInterface {
    id?: string;
    scrolling?: string;
    style?: string;
    referrerPolicy?: string;
    width?: string;
    height?: string;
    loading?: string;
    src?: string;
    frameBorder?: string;
    allow?: string;
    allowFullscreen?: string;
    type?: string;

}

export type TagName =
    | 'a'
    | 'abbr'
    | 'acronym'
    | 'address'
    | 'applet'
    | 'area'
    | 'article'
    | 'aside'
    | 'audio'
    | 'b'
    | 'base'
    | 'basefont'
    | 'bdi'
    | 'bdo'
    | 'big'
    | 'blockquote'
    | 'body'
    | 'br'
    | 'button'
    | 'canvas'
    | 'caption'
    | 'center'
    | 'cite'
    | 'code'
    | 'col'
    | 'colgroup'
    | 'data'
    | 'datalist'
    | 'dd'
    | 'del'
    | 'details'
    | 'dfn'
    | 'dialog'
    | 'dir'
    | 'div'
    | 'dl'
    | 'dt'
    | 'em'
    | 'embed'
    | 'fieldset'
    | 'figcaption'
    | 'figure'
    | 'font'
    | 'footer'
    | 'form'
    | 'frame'
    | 'frameset'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'head'
    | 'header'
    | 'hr'
    | 'html'
    | 'i'
    | 'iframe'
    | 'img'
    | 'input'
    | 'ins'
    | 'kbd'
    | 'label'
    | 'legend'
    | 'li'
    | 'link'
    | 'main'
    | 'map'
    | 'mark'
    | 'meta'
    | 'meter'
    | 'nav'
    | 'noframes'
    | 'noscript'
    | 'object'
    | 'ol'
    | 'optgroup'
    | 'option'
    | 'output'
    | 'p'
    | 'param'
    | 'picture'
    | 'pre'
    | 'progress'
    | 'q'
    | 'rp'
    | 'rt'
    | 'ruby'
    | 's'
    | 'samp'
    | 'script'
    | 'section'
    | 'select'
    | 'small'
    | 'source'
    | 'span'
    | 'strike'
    | 'strong'
    | 'style'
    | 'sub'
    | 'summary'
    | 'sup'
    | 'svg'
    | 'table'
    | 'tbody'
    | 'td'
    | 'template'
    | 'textarea'
    | 'tfoot'
    | 'th'
    | 'thead'
    | 'time'
    | 'title'
    | 'tr'
    | 'track'
    | 'tt'
    | 'u'
    | 'ul'
    | 'var'
    | 'video'
    | 'wbr'
