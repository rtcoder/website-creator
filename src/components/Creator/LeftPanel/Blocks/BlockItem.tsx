import {BLOCK_TYPES_HUMAN_NAMES} from "@/helpers/blocks";
import Icon, {IconType} from "@/components/Creator/Icon";
import styles from "@/styles/Components/LeftPanel/Blocks/BlockItem.module.scss"
import {useDrag} from "react-dnd";
import {BlockType} from "@/types/block-type";

export interface BlockItemProps {
    name: string;
    type: BlockType;

    icon: {
        type: IconType;
        name: string;
    }
}

export default function (props: BlockItemProps) {
    const [{opacity}, dragRef] = useDrag({
        type: `${BLOCK_TYPES_HUMAN_NAMES[props.type]}`,
        item: () => ({type: props.type, isNew: true}),
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 0.5 : 1
        })
    });

    return (
        <div className={styles.blockItem} ref={dragRef} style={{opacity}}>
            <div className={styles.icon}>
                <Icon name={props.icon.name} type={props.icon.type}/>
            </div>
            <div className={styles.name}>{props.name}</div>
        </div>
    );
}
