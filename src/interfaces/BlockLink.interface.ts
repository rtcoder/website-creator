export enum BLOCK_LINK_TYPES {
    URL = 0,
    EMAIL = 1,
    TEL = 2,
    SKYPE = 3,
    ANCHOR = 4,
}

export interface BlockLinkInterface {
    type: BLOCK_LINK_TYPES;
    value: string;
}
