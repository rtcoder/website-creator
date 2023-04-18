import {BlockInterface} from "@/interfaces/Block.interface";
import {PlainObj} from "@/interfaces/PlainObj";
import {RWD_MODES} from "@/enums/rwd";
import {BLOCK_TYPES} from "@/helpers/blocks";

export enum Events {
    RWD_CHANGED = 'rwdChanged',
    DROP_ELEMENT = 'dropped',
    DROP_NEW_ELEMENT = 'droppedNew',
    DELETE_ELEMENT = 'itemDeleted',
    DUPLICATE_ELEMENT = 'duplicateElement',
    FORCE_SELECT_ELEMENT = 'forceSelectItem',
    SELECT_ELEMENT = 'selectItem',
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
}

interface DropElementInterface {
    element: BlockInterface
    targetId: string | null;
}

interface DropNewElementInterface {
    element: { type: BLOCK_TYPES };
    targetId: string | null;
}


export interface EventEmitterInterface {
    _events: PlainObj;

    dispatch(event: Events.RWD_CHANGED, data: RWD_MODES): void;

    subscribe(event: Events.RWD_CHANGED, callback: (data: RWD_MODES) => void): void;

    dispatch(event: Events.DROP_ELEMENT, data: DropElementInterface): void;

    subscribe(event: Events.DROP_ELEMENT, callback: (data: DropElementInterface) => void): void;

    dispatch(event: Events.DROP_NEW_ELEMENT, data: DropNewElementInterface): void;

    subscribe(event: Events.DROP_NEW_ELEMENT, callback: (data: DropNewElementInterface) => void): void;

    // dispatch(event: Events.DELETE_ELEMENT, data: BlockInterface): void;

    // subscribe(event: Events.DELETE_ELEMENT, callback: (data: BlockInterface) => void): void;

    // dispatch(event: Events.DUPLICATE_ELEMENT, data: BlockInterface): void;

    // subscribe(event: Events.DUPLICATE_ELEMENT, callback: (data: BlockInterface) => void): void;

    dispatch(event: Events.FORCE_SELECT_ELEMENT, data: BlockInterface): void;

    subscribe(event: Events.FORCE_SELECT_ELEMENT, callback: (data: BlockInterface) => void): void;

    dispatch(event: Events.SELECT_ELEMENT, data: BlockInterface): void;

    subscribe(event: Events.SELECT_ELEMENT, callback: (data: BlockInterface) => void): void;

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

    unsubscribe(event: Events): void;
}
