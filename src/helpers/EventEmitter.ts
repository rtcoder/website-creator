export enum Events {
    RWD_CHANGED = 'rwdChanged',
    DROP_ELEMENT = 'dropped',
    DROP_NEW_ELEMENT = 'droppedNew',
    DELETE_ELEMENT = 'itemDeleted',
    DUPLICATE_ELEMENT = 'duplicateElement',
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

export const eventEmitter = {
    _events: {},

    dispatch(event: Events, data: any) {
        if (!this._events[event]) {
            return;
        }
        this._events[event].forEach(callback => callback(data))
    },

    subscribe(event: Events, callback: (data: any) => any) {
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(callback);
    },

    unsubscribe(event: Events) {
        if (!this._events[event]) {
            return;
        }
        delete this._events[event];
    }
}
