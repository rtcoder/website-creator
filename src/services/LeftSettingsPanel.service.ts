import {IconType} from "@/components/Creator/Icon";
import {PlainObj} from "@/interfaces/PlainObj";
import {eventEmitter} from "@/services/EventEmitter";
import {Events} from "@/interfaces/EventEmitter.interface";

export enum PanelNames {
    ICON_PANEL = 'iconPanel'
}

interface CloseIconPanelDataInterface {
    type: IconType;
    name: string;
}

interface LeftSettingsPanelServiceInterface {
    _events: PlainObj;

    close(panelName: PanelNames, data: any): void

    open(panelName: PanelNames, onCloseCallback: (data: any) => void): void

    close(panelName: PanelNames.ICON_PANEL, data: CloseIconPanelDataInterface): void

    open(panelName: PanelNames.ICON_PANEL, onCloseCallback: (data: CloseIconPanelDataInterface) => void): void

}

export const leftSettingsPanelService: LeftSettingsPanelServiceInterface = {
    _events: {},

    close(panelName: PanelNames, data: any): void {
        if (!this._events[panelName]) {
            return;
        }
        this._events[panelName](data);
        delete this._events[panelName];
    },

    open(panelName: PanelNames, onCloseCallback: (data: any) => void): void {
        if (!this._events[panelName]) {
            this._events[panelName] = [];
        }
        eventEmitter.dispatch(Events.OPEN_SETTINGS_PANEL, panelName);
        this._events[panelName] = onCloseCallback;
    },
}
