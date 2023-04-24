import styles from "./LeftSettingsPanel.module.scss"
import React from "react";
import {eventEmitter} from "@/services/EventEmitter";
import {Events} from "@/interfaces/EventEmitter.interface";
import {leftSettingsPanelService, PanelNames} from "@/services/LeftSettingsPanel.service";
import Icon from "@/components/construction/Icon/Icon";


export default abstract class PanelAbstract extends React.Component<any, any> {

    protected constructor(props) {
        super(props);
        this.state = {
            isOpen: false
        }
    }

    private closePanel() {
        leftSettingsPanelService.close(this.getPanelName(), this.getPanelCloseData());
        this.setState({isOpen: false});
    }

    protected forceClosePanel() {
        leftSettingsPanelService.close(this.getPanelName(), null);
        this.setState({isOpen: false});
    }

    componentDidMount() {
        eventEmitter.subscribe(Events.OPEN_SETTINGS_PANEL, panelName => {
            if (panelName === this.getPanelName()) {
                this.setState({isOpen: true});
            }
        });
    }

    protected abstract getPanelName(): PanelNames;

    protected abstract getPanelContent(): JSX.Element;

    abstract getPanelCloseData(): any;

    abstract getPanelTitle(): string;

    render() {
        return (
            <div className={styles.leftSettingsPanel} style={(this.state.isOpen ? {display: 'flex'} : {})}>
                <div className={styles.panelHeader}>
                    <span>{this.getPanelTitle()}</span>

                    <div className={styles.icons}>
                        <Icon type="material-outlined" name="done" className={styles.saveButton}
                              onClick={this.closePanel.bind(this)}/>
                        <Icon type="material-outlined" name="close" className={styles.closeButton}
                              onClick={this.forceClosePanel.bind(this)}/>
                    </div>
                </div>
                <div className={styles.panelContainer}>
                    {this.getPanelContent()}
                </div>
            </div>
        )
    }
}
