import styles from '../ActionButtons.module.scss'
import Icon from "@/components/construction/Icon/Icon";
import {eventEmitter} from "@/services/EventEmitter";
import {Events} from "@/interfaces/EventEmitter.interface";
import {BlockTypes} from "@/types/block-type";

export default function MediaActionButtons(props) {

    const showButtons = (): boolean => {
        return [BlockTypes.IMAGE, BlockTypes.VIDEO, BlockTypes.AUDIO].includes(props.block.type)
    }

    const clickChangeMedia = () => {
        eventEmitter.dispatch(Events.CLICK_UPLOAD_INPUT, props.block.id)
    }

    return showButtons() ? (<>
        <Icon className={styles.itemButton}
              title="Zmień"
              type="material-outlined"
              name="change_circle"
              onClick={clickChangeMedia}/>

    </>) : <></>
}
