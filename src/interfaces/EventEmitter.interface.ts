import {PlainObj} from "@/interfaces/PlainObj";
import {PanelNames} from "@/services/LeftSettingsPanel.service";

export enum Events {
    ADD_SPECIAL_CHAR_TO_CONTENT = 'addSpecialCharacter',
    SET_SETTINGS_VALUE = 'setSettingsValue',
    SET_TAG_NAME = 'setTagName',
    SET_LINK = 'setLink',

    CLICK_UPLOAD_INPUT = 'clickUploadInput'
}

export interface EventEmitterInterface {
    _events: PlainObj;
    // dispatch(event: Events.ADD_SPECIAL_CHAR_TO_CONTENT, data: BlockInterface): void;
    // subscribe(event: Events.ADD_SPECIAL_CHAR_TO_CONTENT, callback: (data: BlockInterface) => void): void;
    // dispatch(event: Events.SET_SETTINGS_VALUE, data: BlockInterface): void;
    // subscribe(event: Events.SET_SETTINGS_VALUE, callback: (data: BlockInterface) => void): void;
    // dispatch(event: Events.SET_TAG_NAME, data: BlockInterface): void;
    // subscribe(event: Events.SET_TAG_NAME, callback: (data: BlockInterface) => void): void;
    // dispatch(event: Events.SET_LINK, data: BlockInterface): void;
    // subscribe(event: Events.SET_LINK, callback: (data: BlockInterface) => void): void;
    dispatch(event: Events.CLICK_UPLOAD_INPUT, blockId:string): void;

    subscribe(event: Events.CLICK_UPLOAD_INPUT, callback: (blockId:string) => void): void;

    unsubscribe(event: Events): void;
}
