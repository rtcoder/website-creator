export enum LINK_TYPES {
    URL = 0,
    EMAIL = 1,
    TEL = 2,
    SKYPE = 3,
    ANCHOR = 4,
}

export interface BlockLinkInterface {
    type: LINK_TYPES;
    value: string;
    target: LinkTarget;
}

export type LinkTarget = '_blank' | '_self';
