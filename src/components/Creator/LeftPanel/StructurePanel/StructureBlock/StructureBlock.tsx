import styles from './StructureBlock.module.scss'
import {BLOCK_TYPES_HUMAN_NAMES} from "@/helpers/blocks";
import {useCallback, useEffect, useRef, useState} from "react";
import classNames from "@/helpers/classNames";
import Icon from "@/components/construction/Icon/Icon";
import {useDispatch, useSelector} from "react-redux";
import {BlockInterface} from "@/interfaces/Block.interface";
import {
    addHiddenBlockIdToArray,
    removeBlock,
    removeHiddenBlockIdFromArray,
    setSelectedBlock
} from "@/store/structureSlice";

interface Props {
    block: BlockInterface;
    expandParent?: () => void
}

export default function StructureBlock(props: Props) {
    const [expanded, setExpanded] = useState(false);
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const hiddenBlocksIds = useSelector((state: any) => state.structure.hiddenBlocksIds);
    const ref = useRef(null);
    const dispatch = useDispatch();

    const selectBlock = useCallback((data) => {
        dispatch(setSelectedBlock(data));
    }, [dispatch]);
    const makeHidden = useCallback(() => {
        dispatch(addHiddenBlockIdToArray(props.block.id));
    }, [dispatch]);
    const makeVisible = useCallback(() => {
        dispatch(removeHiddenBlockIdFromArray(props.block.id));
    }, [dispatch]);
    const deleteBlk = useCallback(() => {
        if (confirm('Are you sure you want to delete this block?')) {
            dispatch(removeBlock(props.block));
        }
    }, [dispatch]);

    const isHidden = (): boolean => {
        return hiddenBlocksIds.includes(props.block.id)
    }

    const classes = classNames({
        [styles.structureBlock]: true,
        [styles.expanded]: expanded,
        [styles.selected]: props.block.id === selectedBlock?.id,
        [styles.hidden]: isHidden()
    })
    const toggleHidden = () => {
        if (isHidden()) {
            makeVisible()
        } else {
            makeHidden()
        }
    }
    const toggleExpanded = () => setExpanded(!expanded);
    const expandParent = () => {
        props.expandParent?.();
        setExpanded(true);
    }
    const toggleSelectedBlock = (ev) => {
        ev.stopPropagation();
        selectBlock({block: props.block});
    };

    useEffect(() => {
        if (props.block.id === selectedBlock?.id) {
            props.expandParent?.();
            (ref.current as HTMLElement)?.scrollIntoView({behavior: 'smooth'})
        }
    }, [selectedBlock])
    return (
        <div className={classes} ref={ref}>
            <div className={styles.row}>
                <div className={styles.expander}>
                    {props.block.children.length
                        ? <Icon type="fontawesome"
                                name={expanded ? 'fa-sharp fa-regular fa-chevron-down' : 'fa-sharp fa-regular fa-chevron-right'}
                                onClick={toggleExpanded}
                        /> : ''}
                </div>
                <div className={styles.name}
                     onClick={toggleSelectedBlock}>
                    {BLOCK_TYPES_HUMAN_NAMES[props.block.type]}
                    {props.block.attributes.id ?
                        <div className={styles.anchorName}>
                            <Icon type="material" name="tag" className={styles.icon}/>
                            {props.block.attributes.id}
                        </div> : ''}
                </div>
                <div className={styles.buttons}>
                    <Icon type="fontawesome"
                          className={styles.icon}
                          name={isHidden() ? 'fa-light fa-eye-slash' : 'fa-light fa-eye'}
                          onClick={toggleHidden}
                    />
                    <Icon type="fontawesome"
                          className={styles.icon}
                          name="fa-regular fa-trash delete"
                          onClick={deleteBlk}
                    />
                </div>
            </div>
            {props.block.children.length
                ? <div className={styles.children} hidden={!expanded}>
                    {props.block.children.map(block =>
                        <StructureBlock key={block.id} block={block} expandParent={expandParent}/>)
                    }
                </div> : ''}
        </div>
    )
}
