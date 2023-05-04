import styles from "./IconBlock.module.scss"
import {BlockProps} from "@/interfaces/BlockProps.interface";
import Icon from "@/components/construction/Icon/Icon";

export default function IconBlock(props: BlockProps) {
    return (
        <div className={styles.iconContainer}>
            {props.block.settings.icon
                ? <Icon type={props.block.settings.icon.type}
                        name={props.block.settings.icon.name}
                        className={styles.icon}/>
                : <div>open</div>}
        </div>
    )

}

