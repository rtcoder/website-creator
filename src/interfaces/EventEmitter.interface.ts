import {PlainObj} from "@/interfaces/PlainObj";

export enum Events {
    CLICK_UPLOAD_INPUT = 'clickUploadInput'
}

export interface EventEmitterInterface {
    _events: PlainObj;
    dispatch(event: Events.CLICK_UPLOAD_INPUT, blockId: string): void;

    subscribe(event: Events.CLICK_UPLOAD_INPUT, callback: (blockId: string) => void): void;

    unsubscribe(event: Events): void;
}
