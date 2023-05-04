import React, {useCallback, useState} from "react";
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import IconsList from "@/components/Creator/LeftPanel/LeftSettingsPanel/IconPanel/IconsList";
import styles from "./IconsList.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {BlockSettingsIconInterface} from "@/interfaces/Block.interface";
import {setIcon} from "@/store/structureSlice";

export default function () {
    const iconTypes = ['Material', 'FontAwesome', 'Ionicons', 'IcoFont', 'DevIcon', 'OctIcons'];
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const [selectedIcon, setSelectedIcon] = useState<BlockSettingsIconInterface>(null);

    const dispatch = useDispatch();
    const _setIcon = useCallback((data) => {
        dispatch(setIcon(data));
    }, [dispatch]);
    const selectIcon = icon => {
        setSelectedIcon(icon);
        _setIcon({icon, blockId: selectedBlock?.id})
    }
    return (
        <Tabs className={[styles.tabs, 'react-tabs']}>
            <TabList>
                {iconTypes.map(type => <Tab key={type}>{type}</Tab>)}
            </TabList>
            {iconTypes.map(type =>
                <TabPanel key={type} className={styles.tabPanel} selectedClassName={styles.selected}>
                    <IconsList type={type.toLowerCase()}
                               onSelectIcon={selectIcon}
                               selectedIcon={selectedIcon}/>
                </TabPanel>)}
        </Tabs>
    )
}
