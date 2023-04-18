import {RWD_MODES, RWD_STYLE_NAMES, STYLES_RWD_INHERITANCE_ORDER} from "@/enums/rwd";
import {STYLE_STATE_INHERITANCE_ORDER, STYLE_STATE_NAMES} from "@/enums/styleState";
import {toCamelCase, toKebabCase} from "@/helpers/string-helpers";
import {CSSProperties} from "react";
import {PlainObj} from "@/interfaces/PlainObj";

type rwdKeys = keyof typeof RWD_STYLE_NAMES;
type rwdValues = (typeof RWD_STYLE_NAMES)[rwdKeys];

export class Styles {
    [rwd: rwdValues]: {
        [state: STYLE_STATE_NAMES | string]: {
            [key: string]: string;
        };
    };

    constructor(data) {
        Object.assign(this as Styles, data);
    }

    getProperty(key: string, rwd: RWD_MODES, styleState: STYLE_STATE_NAMES): string {
        const rwdStyleName = RWD_STYLE_NAMES[rwd];
        const stylesRwd = this[rwdStyleName] || {};
        const styles = stylesRwd[styleState] || {};

        return styles[key] || '';
    }

    getInheritedStyleWith(rwd: RWD_MODES, styleState: STYLE_STATE_NAMES, properties: string[]): CSSProperties {
        const styles = this.getFilteredProperties(property => properties.includes(property));
        return this.getInheritedStyle(rwd, styleState, styles);
    }

    getInheritedStyleWithout(rwd: RWD_MODES, styleState: STYLE_STATE_NAMES, properties: string[]): CSSProperties {
        const styles = this.getFilteredProperties(property => !properties.includes(property));
        return this.getInheritedStyle(rwd, styleState, styles);
    }

    private getFilteredProperties(filterFn: (prop: string) => boolean): CSSProperties {
        const styles = {};
        Object.keys(this).forEach(rwd => {
            styles[rwd] = {};

            Object.keys(this[rwd]).forEach(state => {
                styles[rwd][state] = {};

                Object.keys(this[rwd][state])
                    .filter(property => filterFn(property))
                    .forEach(prop => {
                        styles[rwd][state][prop] = this[rwd][state][prop];
                    })
            })
        });
        return styles;
    }

    getInheritedStyle(rwd: RWD_MODES, styleState: STYLE_STATE_NAMES, styles: PlainObj = this): CSSProperties {

        const rwdStyleName = RWD_STYLE_NAMES[rwd];

        const inheritedStyles = {
            basic: {},
            hover: {}
        }

        for (const rwd of STYLES_RWD_INHERITANCE_ORDER) {
            const s = styles[rwd] || {};
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
                finalStyles[toCamelCase(key)] = inheritedStyles[state][key];
            })
            if (state === styleState) {
                break;
            }
        }

        if (finalStyles['border-top-width'] && finalStyles['border-top-style']) {
            finalStyles['--border-top-width'] = finalStyles['border-top-width'];
        } else if (!finalStyles['border-top-width'] && finalStyles['border-top-style']) {
            finalStyles['--border-top-width'] = '1px';
        }
        if (finalStyles['filter']) {
            finalStyles['--filter'] = finalStyles['filter'];
        }
        if (finalStyles['animation']) {
            finalStyles['--animation'] = finalStyles['animation'];
        }
        if (finalStyles['animation-delay']) {
            finalStyles['--animation-delay'] = finalStyles['animation-delay'];
        }
        if (finalStyles['animation-direction']) {
            finalStyles['--animation-direction'] = finalStyles['animation-direction'];
        }
        return finalStyles;
    }

    getStyleString(rwd: RWD_MODES, styleState: STYLE_STATE_NAMES): string {
        const finalStyles = this.getInheritedStyle(rwd, styleState);
        return Object.keys(finalStyles).map(key => {
            return `${toKebabCase(key)}: ${finalStyles[key]}`;
        }).join(';')
    }

    setStyleValue(rwdMode: RWD_MODES, styleState: STYLE_STATE_NAMES, propName: string, value: string) {
        const styleNameForRwdMode = RWD_STYLE_NAMES[rwdMode]

        if (!this[styleNameForRwdMode] || Array.isArray(this[styleNameForRwdMode])) {
            this[styleNameForRwdMode] = {};
        }

        if (!this[styleNameForRwdMode][styleState] || Array.isArray(this[styleNameForRwdMode][styleState])) {
            this[styleNameForRwdMode][styleState] = {};
        }

        if (value) {
            this[styleNameForRwdMode][styleState][propName] = value;
        } else {
            delete this[styleNameForRwdMode][styleState][propName];
        }

        if (!Object.keys(this[styleNameForRwdMode][styleState])) {
            delete this[styleNameForRwdMode][styleState];
        }

        if (!Object.keys(this[styleNameForRwdMode])) {
            delete this[styleNameForRwdMode];
        }
    }
}
