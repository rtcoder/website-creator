import {BLOCK_TYPES} from "@/helpers/blocks";
import Icon, {IconType} from "@/components/Icon";
import styles from "@/styles/Components/LeftPanel/Blocks/BlockItem.module.scss"

export interface BlockItemProps {
    name: string;
    type: BLOCK_TYPES;

    icon: {
        type: IconType;
        name: string;
    }
}

export default function (props: BlockItemProps) {
    return (
        <div className={styles.blockItem}>
            <div className={styles.icon}>
                <Icon name={props.icon.name} type={props.icon.type}/>
            </div>
            <div className={styles.name}>{props.name}</div>
        </div>
    )
}
