import styles from './TopPanel.module.scss';
import Icon from "@/components/construction/Icon/Icon";
import classNames from "@/helpers/classNames";
import {RWD_MODES} from "@/enums/rwd";
import HelpModal from "@/components/Creator/HelpModal";
import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setRwdMode} from "@/store/structureSlice";
import {downloadFile} from "@/helpers/misc";
import {convertStructureToHtml} from "@/helpers/structure";

export default function TopPanel() {
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const structure = useSelector((state: any) => state.structure.structure);
    const [helpModalOpened, setHelpModalOpened] = useState(false);
    const dispatch = useDispatch();

    const setRwd = useCallback((val) => {
        dispatch(setRwdMode(val));
    }, [dispatch]);

    const openHelpModal = () => setHelpModalOpened(true);
    const closeHelpModal = () => setHelpModalOpened(false);

    const rwdModes: [RWD_MODES, string][] = [
        [RWD_MODES.DESKTOP, 'desktop_windows'],
        [RWD_MODES.TABLET, 'tablet_android'],
        [RWD_MODES.MOBILE, 'smartphone'],
    ];
    const downloadHtml = () => {
        downloadFile('index.html', convertStructureToHtml(structure))
    }
    const downloadJson = () => {
        downloadFile('index.json', JSON.stringify(structure))
    }
    return (
        <div className={styles.topPanel}>
            <div className={styles.buttonsContainer}>
                <div onClick={openHelpModal}>
                    <Icon type="material-outlined" name="help"/>
                </div>
                <div>
                    <Icon type="material-outlined" name="settings"/>
                </div>
            </div>

            <div className={classNames([styles.rwd, styles.buttonsContainer])}>
                {rwdModes.map(([mode, icon]) =>
                    <div key={mode} onClick={() => setRwd(mode)} className={rwd === mode ? styles.active : ''}>
                        <Icon type="material-outlined" name={icon}/>
                    </div>
                )}
            </div>
            <div className={styles.buttonsContainer}>
                <Icon type="material-outlined" name="download" onClick={downloadHtml}/>
            </div>
            <HelpModal opened={helpModalOpened} onClose={closeHelpModal}/>
        </div>
    );
}
