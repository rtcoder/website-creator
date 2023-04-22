import {PlainObj} from "@/interfaces/PlainObj";
import {PanelNames} from "@/services/LeftSettingsPanel.service";

export enum Events {
    DELETE_ELEMENT = 'itemDeleted',
    DUPLICATE_ELEMENT = 'duplicateElement',
    SET_STYLES = 'setStyles',
    SET_STYLE_STATE = 'setStyleState',
    UPDATE_CONTENT = 'updateContent',
    ADD_SPECIAL_CHAR_TO_CONTENT = 'addSpecialCharacter',
    UPDATE_ATTRIBUTES = 'updateAttributes',
    SET_ICON = 'setIcon',
    SET_SETTINGS_VALUE = 'setSettingsValue',
    SET_TAG_NAME = 'setTagName',
    SET_LINK = 'setLink',
    RELOAD_EVENTS = 'reloadEvents',

    OPEN_SETTINGS_PANEL = 'openSettingsPanel',
}

export interface EventEmitterInterface {
    _events: PlainObj;

    // dispatch(event: Events.DELETE_ELEMENT, data: BlockInterface): void;

    // subscribe(event: Events.DELETE_ELEMENT, callback: (data: BlockInterface) => void): void;

    // dispatch(event: Events.DUPLICATE_ELEMENT, data: BlockInterface): void;

    // subscribe(event: Events.DUPLICATE_ELEMENT, callback: (data: BlockInterface) => void): void;

    // dispatch(event: Events.SET_STYLES, data: BlockInterface): void;

    // subscribe(event: Events.SET_STYLES, callback: (data: BlockInterface) => void): void;

    // dispatch(event: Events.SET_STYLE_STATE, data: BlockInterface): void;

    // subscribe(event: Events.SET_STYLE_STATE, callback: (data: BlockInterface) => void): void;

    // dispatch(event: Events.ADD_SPECIAL_CHAR_TO_CONTENT, data: BlockInterface): void;

    // subscribe(event: Events.ADD_SPECIAL_CHAR_TO_CONTENT, callback: (data: BlockInterface) => void): void;

    // dispatch(event: Events.SET_ICON, data: BlockInterface): void;

    // subscribe(event: Events.SET_ICON, callback: (data: BlockInterface) => void): void;

    // dispatch(event: Events.SET_SETTINGS_VALUE, data: BlockInterface): void;

    // subscribe(event: Events.SET_SETTINGS_VALUE, callback: (data: BlockInterface) => void): void;

    // dispatch(event: Events.SET_TAG_NAME, data: BlockInterface): void;

    // subscribe(event: Events.SET_TAG_NAME, callback: (data: BlockInterface) => void): void;

    // dispatch(event: Events.SET_LINK, data: BlockInterface): void;

    // subscribe(event: Events.SET_LINK, callback: (data: BlockInterface) => void): void;

    // dispatch(event: Events.RELOAD_EVENTS, data: BlockInterface): void;

    // subscribe(event: Events.RELOAD_EVENTS, callback: (data: BlockInterface) => void): void;
    dispatch(event: Events.OPEN_SETTINGS_PANEL, data: PanelNames): void;

    subscribe(event: Events.OPEN_SETTINGS_PANEL, callback: (data: PanelNames) => void): void;

    unsubscribe(event: Events): void;
}
