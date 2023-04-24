import styles from "./IconBlock.module.scss"
import {BlockProps} from "@/interfaces/BlockProps.interface";
import Icon from "@/components/construction/Icon/Icon";
import {leftSettingsPanelService, PanelNames} from "@/services/LeftSettingsPanel.service";
import {useCallback} from "react";
import {setIcon, setSelectedBlock} from "@/store/structureSlice";
import {useDispatch} from "react-redux";

export default function (props: BlockProps) {
    const dispatch = useDispatch();

    const selectBlock = useCallback((blk) => {
        dispatch(setSelectedBlock(blk));
    }, [dispatch]);

    const selectBlockIcon = useCallback((data) => {
        dispatch(setIcon(data));
    }, [dispatch]);
    const openPanel = () => {
        leftSettingsPanelService.open(PanelNames.ICON_PANEL, data => {
            selectBlockIcon({icon: data, blockId: props.block.id})
            selectBlock({block: props.block, force: true});
        })
    }

    return (
        <div className={styles.iconContainer}>
            {props.block.settings.icon
                ? <Icon type={props.block.settings.icon.type}
                        name={props.block.settings.icon.name}
                        onClick={openPanel}
                        className={styles.icon}/>
                : <div onClick={openPanel}>open</div>}
        </div>
    )

}

