export enum RWD_MODES {
    DESKTOP = 'desktop',
    TABLET = 'tablet',
    MOBILE = 'mobile',
}

export enum RWD_STYLE_NAMES {
    [RWD_MODES.DESKTOP] = 'all',
    [RWD_MODES.TABLET] = 'max-width:992px',
    [RWD_MODES.MOBILE] = 'max-width:576px'
}

export const STYLES_RWD_INHERITANCE_ORDER = [
    RWD_STYLE_NAMES[RWD_MODES.DESKTOP],
    RWD_STYLE_NAMES[RWD_MODES.TABLET],
    RWD_STYLE_NAMES[RWD_MODES.MOBILE],
];

