import styles from './ModalHead.module.scss'
import Icon from "@/components/construction/Icon/Icon";

export default function ModalHead({children, onClose}) {
    return (
        <div className={styles.modalHead}>
            <h2>{children}</h2>
            <div className={styles.closeModal} onClick={onClose}>
                <Icon type="material-outlined" name="close"/>
            </div>
        </div>
    )
}
