import {BLOCK_TYPES_HUMAN_NAMES} from "@/helpers/blocks";
import Icon, {IconType} from "@/components/construction/Icon/Icon";
import styles from "./BlockItem.module.scss"
import {useDrag} from "react-dnd";
import {BlockTypes} from "@/types/block-type";
import {useRef} from "react";

export interface BlockItemProps {
    name: string;
    type: BlockTypes.BlockType;

    icon: {
        type: IconType;
        name: string;
    }
}

export default function BlockItem(props: BlockItemProps) {
    const blockRef = useRef(null);
    const defaultOffset = {
        x: 0,
        y: 0,
    };
    const [{isDragging, offset, initialOffset}, dragRef] = useDrag({
        type: `${BLOCK_TYPES_HUMAN_NAMES[props.type]}`,
        item: () => ({type: props.type, isNew: true}),
        collect: (monitor) => {
            const isDragging = monitor.isDragging();
            const offset = isDragging ? (monitor.getClientOffset() || defaultOffset) : defaultOffset;
            const initialOffset = isDragging ? (monitor.getInitialClientOffset() || defaultOffset) : defaultOffset;
            return {
                isDragging,
                offset,
                initialOffset
            }
        }
    });
    const posOnElement = () => {
        const {top, left} = (blockRef.current as HTMLElement).getBoundingClientRect();
        const mousePosRelativeToElement = {
            x: initialOffset.x - left,
            y: initialOffset.y - top
        }
        return {
            top: offset.y - mousePosRelativeToElement.y,
            left: offset.x - mousePosRelativeToElement.x
        }
    }
    const style: any = isDragging ? {
        ...posOnElement(),
        zIndex: 100000,
        pointerEvents: 'none',
        position: 'fixed',
        border: 'inherit',
        opacity: 0.9,
        borderColor: '#09c',
        background: '#09d'
    } : {};
    return (
        <>
            <div className={styles.blockItem} ref={blockRef}>
                <div className={styles.container} ref={dragRef} style={style}>
                    <div className={styles.icon}>
                        <Icon name={props.icon.name} type={props.icon.type}/>
                    </div>
                    <div className={styles.name}>{props.name}</div>
                </div>
            </div>
        </>
    );
}
