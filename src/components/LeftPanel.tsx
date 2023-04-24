import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Icon from "@/components/Icon";
import BlocksPanel from "@/components/LeftPanel/BlocksPanel";
import styles from "@/styles/Components/LeftPanel.module.scss";
import StylesPanel from "@/components/LeftPanel/StylesPanel";
import StructurePanel from "@/components/LeftPanel/StructurePanel/StructurePanel";
import LeftSettingsPanel from "@/components/LeftPanel/LeftSettingsPanel";


export default function () {
    return (
        <div className={styles.leftPanel}>
            <LeftSettingsPanel/>
            <Tabs>
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
