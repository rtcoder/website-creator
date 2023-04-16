import {RWD_MODES} from "@/enums/rwd";
import {STYLE_STATE_NAMES} from "@/enums/styleState";
import styles from "@/styles/Components/CreatorArea.module.scss";

interface CreatorAreaProps {
    rwd: RWD_MODES;
    styleState: STYLE_STATE_NAMES;
}

export default function CreatorArea(props: CreatorAreaProps) {
    const rwdMode = RWD_MODES.DESKTOP;
    const styleState = STYLE_STATE_NAMES.BASIC;

    return (
        <div className={styles.creatorArea}/>)
}
