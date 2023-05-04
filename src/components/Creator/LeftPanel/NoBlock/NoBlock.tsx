import styles from "./NoBlock.module.scss"
import Icon from "@/components/construction/Icon/Icon";

export default function NoBlock() {
    return (
        <div className={styles.noBlock}>
            <span>Zaznacz blok</span>
            <Icon type="fontawesome" name="fa-solid fa-object-group" className={styles.icon}/>
        </div>

    )
}
