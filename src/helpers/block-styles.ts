import {RWD_MODES, RWD_STYLE_NAMES, STYLES_RWD_INHERITANCE_ORDER} from "@/enums/rwd";
import {STYLE_STATE_INHERITANCE_ORDER, STYLE_STATE_NAMES} from "@/enums/styleState";
import {toCamelCase, toKebabCase} from "@/helpers/string-helpers";
import {RwdModeNames, StyleGroupName, StyleProperties, StyleRwd, Styles} from "@/interfaces/Styles.interface";
import {CSSProperties} from "react";

export function getInheritedStyle(rwd: RWD_MODES, styleState: STYLE_STATE_NAMES, styles: CSSProperties | Styles): CSSProperties {

    const rwdStyleName = RWD_STYLE_NAMES[rwd] as RwdModeNames;

    const inheritedStyles = {
        basic: {},
        hover: {}
    } as StyleRwd;

    for (const rwd of STYLES_RWD_INHERITANCE_ORDER) {
        const s = (styles[rwd] || {}) as StyleRwd;
        inheritedStyles.basic = {
            ...inheritedStyles.basic,
            ...(s.basic || {})
        };
        inheritedStyles.hover = {
            ...inheritedStyles.hover,
            ...(s.hover || {})
        };
        if (rwd === rwdStyleName) {
            break;
        }
    }

    const finalStyles = {};

    for (const state of STYLE_STATE_INHERITANCE_ORDER) {
        Object.keys(inheritedStyles[state]).forEach(key => {
            finalStyles[toCamelCase(key)] = inheritedStyles[state]![key];
        })
        if (state === styleState) {
            break;
        }
    }

    return finalStyles;
}

export function getInheritedStyleWith(styles: Styles, rwd: RWD_MODES, styleState: STYLE_STATE_NAMES, properties: string[]): CSSProperties {
    properties = properties.map(prop => toKebabCase(prop));
    return getInheritedStyle(rwd, styleState,
        getFilteredProperties(styles, property => properties.includes(property))
    );
}

export function getInheritedStyleWithout(styles: Styles, rwd: RWD_MODES, styleState: STYLE_STATE_NAMES, properties: string[]): CSSProperties {
    properties = properties.map(prop => toKebabCase(prop));
    return getInheritedStyle(rwd, styleState,
        getFilteredProperties(styles, property => !properties.includes(property))
    );
}

export function getFilteredProperties(styles: Styles, filterFn: (prop: StyleProperties) => boolean): CSSProperties {
    const _styles = {};
    Object.keys(styles).forEach((rwd: RwdModeNames) => {
        _styles[rwd] = {};

        Object.keys(styles[rwd]).forEach((state: StyleGroupName) => {
            _styles[rwd][state] = {};

            Object.keys(styles[rwd]![state])
                .filter((property: any) => filterFn(property))
                .forEach(prop => {
                    _styles[rwd][state][prop] = styles[rwd]![state]![prop];
                })
        })
    });
    return _styles;
}

export function getStyleString(styles: Styles, rwd: RWD_MODES, styleState: STYLE_STATE_NAMES): string {
    const finalStyles = getInheritedStyle(rwd, styleState, styles);
    return Object.keys(finalStyles).map(key => {
        return `${toKebabCase(key)}: ${finalStyles[key]}`;
    }).join(';')
}

export function getProperty(styles: Styles, key: string, rwd: RWD_MODES, styleState: STYLE_STATE_NAMES): string {
    const rwdStyleName = RWD_STYLE_NAMES[rwd];
    const stylesRwd = styles[rwdStyleName] || {};
    const _styles = stylesRwd[styleState] || {};

    return _styles[key] || '';
}

export function setStyleValue(styles: Styles, rwdMode: RWD_MODES, styleState: STYLE_STATE_NAMES, propName: string, value: string | null): Styles {
    const _styles = Object.assign({}, styles);

    const styleNameForRwdMode = RWD_STYLE_NAMES[rwdMode]

    if (!_styles[styleNameForRwdMode] || Array.isArray(_styles[styleNameForRwdMode])) {
        _styles[styleNameForRwdMode] = {};
    }

    if (!_styles[styleNameForRwdMode]![styleState] || Array.isArray(_styles[styleNameForRwdMode]![styleState])) {
        _styles[styleNameForRwdMode]![styleState] = {};
    }

    if (value) {
        _styles[styleNameForRwdMode]![styleState]![propName] = value;
    } else {
        delete _styles[styleNameForRwdMode]![styleState]![propName];
    }

    if (!Object.keys(_styles[styleNameForRwdMode]![styleState])) {
        delete _styles[styleNameForRwdMode]![styleState];
    }

    if (!Object.keys(_styles[styleNameForRwdMode])) {
        delete _styles[styleNameForRwdMode];
    }
    return _styles;
}
