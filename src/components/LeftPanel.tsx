import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import Icon from "@/components/Icon";
import BlocksPanel from "@/components/LeftPanel/BlocksPanel";
import styles from "@/styles/Components/LeftPanel.module.scss";
import {STYLE_STATE_NAMES} from "@/enums/styleState";
import StylesPanel from "@/components/LeftPanel/StylesPanel";
import StructurePanel from "@/components/LeftPanel/StructurePanel";

interface LeftPanelProps {
    styleState: STYLE_STATE_NAMES;
}

export default function (props: LeftPanelProps) {


    return (
        <div className={styles.leftPanel}>
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
