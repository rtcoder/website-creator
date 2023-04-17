import {BLOCK_TYPES_HUMAN_NAMES} from "@/helpers/blocks";
import {eventEmitter, Events} from "@/helpers/EventEmitter";
import {useDrop} from "react-dnd";
import styles from "@/styles/Components/Blocks/Block.module.scss"
import Block from "@/components/Blocks/Block";
import classNames from "@/helpers/classNames";
import {BlockProps} from "@/interfaces/BlockProps.interface";

export default function (props: BlockProps) {
    const {block, selectedBlock, rwdMode, styleState} = props;

    const [{isDragover}, drop] = useDrop({
        accept: Object.values(BLOCK_TYPES_HUMAN_NAMES),
        drop: (item, monitor) => {
            if (!monitor.isOver({shallow: true})) {
                return;
            }
            if (item.isNew) {
                const {type} = item;
                eventEmitter.dispatch(Events.DROP_NEW_ELEMENT, {element: {type}, targetId: block.id});
            } else {
                eventEmitter.dispatch(Events.DROP_ELEMENT, {element: item, targetId: block.id});
            }
        }, canDrop: (item, monitor) => {
            return !!(item.isNew || (item.id !== block.id && (block.id && !item.children.findByIdRecursive(block.id))))
        },
        collect: (monitor) => ({
            isDragover: monitor.isOver({shallow: false}) && monitor.canDrop()
        })
    });
    const classes = classNames({
        [styles.children]: true,
        [styles.dragover]: isDragover
    })
    return (
        <div className={classes}
             ref={drop}>
            {block.children.map(b =>
                <div key={b.id}>
                    <Block block={b} selectedBlock={selectedBlock} rwdMode={rwdMode}
                           styleState={styleState}/>
                </div>)}
        </div>
    )

}

