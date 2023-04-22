import {BLOCK_TYPES_HUMAN_NAMES} from "@/helpers/blocks";
import {useDrop} from "react-dnd";
import styles from "@/styles/Components/Blocks/Block.module.scss"
import Block from "@/components/Blocks/Block";
import classNames from "@/helpers/classNames";
import {findByIdRecursive} from "@/helpers/block";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useDispatch, useSelector} from "react-redux";
import {BlockInterface} from "@/interfaces/Block.interface";
import {useCallback} from "react";
import {dropBlock, dropNewBlock} from "@/store/structureSlice";

export default function (props: { id: string | null; children: BlockInterface[] }) {
    const {id, children} = props;
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const dispatch = useDispatch();

    const _dropBlock = useCallback((data) => {
        dispatch(dropBlock(data));
    }, [dispatch]);

    const _dropNewBlock = useCallback((data) => {
        dispatch(dropNewBlock(data));
    }, [dispatch]);

    const [{isDragover}, drop] = useDrop({
        accept: Object.values(BLOCK_TYPES_HUMAN_NAMES),
        drop: (item, monitor) => {
            if (!monitor.isOver({shallow: true})) {
                return;
            }
            if (item.isNew) {
                const {type} = item;
                _dropNewBlock({block: {type}, targetId: id});
            } else {
                _dropBlock({block: item, targetId: id});
            }
        }, canDrop: (item) => {
            return !!(item.isNew || (item.id !== id && (id && !findByIdRecursive(item.children, id))))
        },
        collect: (monitor) => ({
            isDragover: monitor.isOver({shallow: false}) && monitor.canDrop()
        })
    });
    const classes = classNames({
        [styles.children]: true,
        [styles.dragover]: isDragover
    });
    const widthProperties = ['width', 'min-width', 'max-width'];

    return (
        <div className={classes}
             ref={drop}>
            {children.map(b =>
                <div key={b.id} style={getInheritedStyleWith(b.styles, rwd, styleState, widthProperties)}>
                    <Block block={b}/>
                </div>)}
        </div>
    )

}

