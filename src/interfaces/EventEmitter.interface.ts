import {PlainObj} from "@/interfaces/PlainObj";

export enum Events {
    ADD_SPECIAL_CHAR_TO_CONTENT = 'addSpecialCharacter',
    SET_SETTINGS_VALUE = 'setSettingsValue',

    CLICK_UPLOAD_INPUT = 'clickUploadInput'
}

export interface EventEmitterInterface {
    _events: PlainObj;
    // dispatch(event: Events.ADD_SPECIAL_CHAR_TO_CONTENT, data: BlockInterface): void;
    // subscribe(event: Events.ADD_SPECIAL_CHAR_TO_CONTENT, callback: (data: BlockInterface) => void): void;
    // dispatch(event: Events.SET_SETTINGS_VALUE, data: BlockInterface): void;
    // subscribe(event: Events.SET_SETTINGS_VALUE, callback: (data: BlockInterface) => void): void;
    dispatch(event: Events.CLICK_UPLOAD_INPUT, blockId: string): void;

    subscribe(event: Events.CLICK_UPLOAD_INPUT, callback: (blockId: string) => void): void;

    unsubscribe(event: Events): void;
}
