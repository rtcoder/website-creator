import styles from '@/styles/Components/TopPanel.module.scss';
import Icon from "@/components/Icon";
import classNames from "@/helpers/classNames";
import {RWD_MODES} from "@/enums/rwd";
import {eventEmitter} from "@/services/EventEmitter";
import {Events} from "@/interfaces/EventEmitter.interface";
import HelpModal from "@/components/HelpModal";
import {useState} from "react";

interface TopPanelProps {
    rwd: RWD_MODES;
}

export default function TopPanel(props: TopPanelProps) {
    const changeRwd = (rwdName: RWD_MODES) => {
        eventEmitter.dispatch(Events.RWD_CHANGED, rwdName);
    }
    const [helpModalOpened, setHelpModalOpened] = useState(false);
    const openHelpModal = () => {
        setHelpModalOpened(true);
    }
    const closeHelpModal = () => {
        setHelpModalOpened(false);
    }
    return (
        <div className={styles.topPanel}>
            <div className={styles.buttonsContainer}>
                <div>
                    <Icon type="material-outlined" name="border_clear"/>
                </div>
                <div onClick={openHelpModal}>
                    <Icon type="material-outlined" name="help"/>
                </div>
                <div>
                    <Icon type="material-outlined" name="settings"/>
                </div>
            </div>

            <div className={classNames([styles.rwd, styles.buttonsContainer])}>
                <div onClick={() => changeRwd(RWD_MODES.DESKTOP)}
                     className={props.rwd === RWD_MODES.DESKTOP ? styles.active : ''}>
                    <Icon type="material-outlined" name="desktop_windows"/>
                </div>
                <div onClick={() => changeRwd(RWD_MODES.TABLET)}
                     className={props.rwd === RWD_MODES.TABLET ? styles.active : ''}>
                    <Icon type="material-outlined" name="tablet_android"/>
                </div>
                <div onClick={() => changeRwd(RWD_MODES.MOBILE)}
                     className={props.rwd === RWD_MODES.MOBILE ? styles.active : ''}>
                    <Icon type="material-outlined" name="smartphone"/>
                </div>
            </div>
            <div></div>
            <HelpModal opened={helpModalOpened} onClose={closeHelpModal}/>
        </div>
    );
}
