import React from "react";
import {PanelNames} from "@/services/LeftSettingsPanel.service";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import PanelAbstract from "@/components/LeftPanel/LeftSettingsPanel/PanelAbstract";
import IconsList from "@/components/LeftPanel/LeftSettingsPanel/IconPanel/IconsList";
import styles from "./IconsList.module.scss";
import {connect} from "react-redux";


class IconPanel extends PanelAbstract {

    constructor(props) {
        super(props);

        this.state = {
            iconTypes: ['Material', 'FontAwesome', 'Ionicons', 'IcoFont', 'DevIcon', 'OctIcons'],
            selectedIcon: props.selectedBlock?.settings.icon || null,
        }
    }

    getPanelCloseData(): any {
        return this.state.selectedIcon;
    }

    getPanelName(): PanelNames {
        return PanelNames.ICON_PANEL;
    }

    getPanelTitle(): string {
        return 'Ikonka';
    }

    iconChange(icon) {
        this.setState({
            selectedIcon: icon
        })
    }

    getPanelContent() {
        return (
            <Tabs className={[styles.tabs, 'react-tabs']}>
                <TabList>
                    {this.state.iconTypes.map(type => <Tab key={type}>{type}</Tab>)}
                </TabList>
                {this.state.iconTypes.map(type =>
                    <TabPanel key={type} className={styles.tabPanel} selectedClassName={styles.selected}>
                        {this.state.selectedIcon?.name}
                        <IconsList type={type.toLowerCase()}
                                   onSelectIcon={icon => this.iconChange(icon)}
                                   selectedIcon={this.state.selectedIcon}/>
                    </TabPanel>)}
            </Tabs>
        )
    }

}

const mapStateToProps = state => ({
    selectedBlock: state.structure.selectedBlock,
})

export default connect(mapStateToProps, null)(IconPanel)
