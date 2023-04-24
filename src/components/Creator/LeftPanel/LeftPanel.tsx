import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Icon from "@/components/construction/Icon/Icon";
import BlocksPanel from "@/components/Creator/LeftPanel/BlocksPanel/BlocksPanel";
import styles from "./LeftPanel.module.scss";
import StylesPanel from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel";
import StructurePanel from "@/components/Creator/LeftPanel/StructurePanel/StructurePanel";
import LeftSettingsPanel from "@/components/Creator/LeftPanel/LeftSettingsPanel/LeftSettingsPanel";


export default function () {
    return (
        <div className={styles.leftPanel}>
            <LeftSettingsPanel/>
            <Tabs defaultIndex={1}>
                <TabList>
                    <Tab>
                        <Icon type="material-outlined" name="deployed_code"/>
                        Bloki
                    </Tab>
                    <Tab>
                        <Icon type="material-outlined" name="auto_fix"/>
                        Style
                    </Tab>
                    <Tab>
                        <Icon type="material-outlined" name="account_tree"/>
                        Struktura
                    </Tab>
                </TabList>

                <TabPanel>
                    <BlocksPanel/>
                </TabPanel>
                <TabPanel>
                    <StylesPanel/>
                </TabPanel>
                <TabPanel>
                    <StructurePanel/>
                </TabPanel>
            </Tabs>
        </div>
    )
}
