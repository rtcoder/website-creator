import {PlainObj} from "@/interfaces/PlainObj";
import {PanelNames} from "@/services/LeftSettingsPanel.service";

export enum Events {
    SET_STYLES = 'setStyles',
    SET_STYLE_STATE = 'setStyleState',
    ADD_SPECIAL_CHAR_TO_CONTENT = 'addSpecialCharacter',
    SET_SETTINGS_VALUE = 'setSettingsValue',
    SET_TAG_NAME = 'setTagName',
    SET_LINK = 'setLink',

    OPEN_SETTINGS_PANEL = 'openSettingsPanel',
    CLICK_UPLOAD_INPUT = 'clickUploadInput'
}

export interface EventEmitterInterface {
    _events: PlainObj;

    // dispatch(event: Events.SET_STYLES, data: BlockInterface): void;
    // subscribe(event: Events.SET_STYLES, callback: (data: BlockInterface) => void): void;
    // dispatch(event: Events.SET_STYLE_STATE, data: BlockInterface): void;
    // subscribe(event: Events.SET_STYLE_STATE, callback: (data: BlockInterface) => void): void;
    // dispatch(event: Events.ADD_SPECIAL_CHAR_TO_CONTENT, data: BlockInterface): void;
    // subscribe(event: Events.ADD_SPECIAL_CHAR_TO_CONTENT, callback: (data: BlockInterface) => void): void;
    // dispatch(event: Events.SET_SETTINGS_VALUE, data: BlockInterface): void;
    // subscribe(event: Events.SET_SETTINGS_VALUE, callback: (data: BlockInterface) => void): void;
    // dispatch(event: Events.SET_TAG_NAME, data: BlockInterface): void;
    // subscribe(event: Events.SET_TAG_NAME, callback: (data: BlockInterface) => void): void;
    // dispatch(event: Events.SET_LINK, data: BlockInterface): void;
    // subscribe(event: Events.SET_LINK, callback: (data: BlockInterface) => void): void;
    dispatch(event: Events.OPEN_SETTINGS_PANEL, data: PanelNames): void;

    subscribe(event: Events.OPEN_SETTINGS_PANEL, callback: (data: PanelNames) => void): void;
    dispatch(event: Events.CLICK_UPLOAD_INPUT, blockId:string): void;

    subscribe(event: Events.CLICK_UPLOAD_INPUT, callback: (blockId:string) => void): void;

    unsubscribe(event: Events): void;
}
