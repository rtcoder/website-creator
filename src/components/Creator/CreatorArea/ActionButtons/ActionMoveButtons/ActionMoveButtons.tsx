import styles from '../ActionButtons.module.scss'
import Icon from "@/components/construction/Icon/Icon";
import {useDispatch, useSelector} from "react-redux";
import {findIndexByIdRecursive, getBlockParent} from "@/helpers/block";
import {BlockInterface} from "@/interfaces/Block.interface";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useCallback, useEffect, useState} from "react";
import {moveDownBlock, moveUpBlock} from "@/store/structureSlice";

export default function ActionMoveButtons() {
    const structure = useSelector((state: any) => state.structure.structure);
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const [parent, setParent] = useState(null);
    const [index, setIndex] = useState(0);
    const [parentFlexDirection, setParentFlexDirection] = useState('');
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const dispatch = useDispatch();
    const moveUp = useCallback((data) => {
        dispatch(moveUpBlock(data));
    }, [dispatch]);
    const moveDown = useCallback((data) => {
        dispatch(moveDownBlock(data));
    }, [dispatch]);
    const getParentChildren = (): BlockInterface[] => {
        return parent
            ? parent.children
            : structure;
    }
    const showMoveTopButton = (): boolean => {
        return index > 0;
    }
    const showMoveBottomButton = (): boolean => {
        return (index + 1) < getParentChildren().length;
    }
    const showMoveVerticalButtons = (): boolean => {
        return ['column', 'column-reverse', ''].includes(parentFlexDirection);
    }
    const showMoveHorizontalButtons = (): boolean => {
        return ['row', 'row-reverse'].includes(parentFlexDirection);
    }
    const showMoveButtons = (): boolean => {
        return getParentChildren().length > 1;
    }
    const isReversedDirection = (): boolean => {
        return ['row-reverse', 'column-reverse'].includes(parentFlexDirection);
    }
    useEffect(() => {
        setParent(
            getBlockParent(structure, selectedBlock.id)
        );
        setIndex(
            findIndexByIdRecursive(structure, selectedBlock.id)
        );

    }, [selectedBlock, structure])
    useEffect(() => {
        setParentFlexDirection(
            getInheritedStyleWith(
                (parent ? parent.styles : {}),
                rwd, styleState, ['flex-direction']
            ).flexDirection || ''
        )
    }, [parent, rwd, styleState])
    return showMoveButtons()
        ? (
            <>
                {showMoveVerticalButtons()
                    ? (<>
                        {showMoveBottomButton()
                            ? <Icon className={styles.itemButton}
                                    onClick={() => moveDown(selectedBlock)}
                                    title="Przenieś w dół"
                                    type="material-outlined"
                                    name={isReversedDirection() ? 'expand_less' : 'expand_more'}/> : <></>}

                        {showMoveTopButton()
                            ? <Icon className={styles.itemButton}
                                    onClick={() => moveUp(selectedBlock)}
                                    title="Przenieś w górę"
                                    type="material-outlined"
                                    name={isReversedDirection() ? 'expand_more' : 'expand_less'}/> : <></>}
                    </>) : <></>}

                {showMoveHorizontalButtons()
                    ? (<>
                        {showMoveTopButton()
                            ? <Icon className={styles.itemButton}
                                    onClick={() => moveUp(selectedBlock)}
                                    title="Przenieś w lewo"
                                    type="material-outlined"
                                    name={isReversedDirection() ? 'chevron_right' : 'chevron_left'}/> : <></>}

                        {showMoveBottomButton()
                            ? <Icon className={styles.itemButton}
                                    onClick={() => moveDown(selectedBlock)}
                                    title="Przenieś w prawo"
                                    type="material-outlined"
                                    name={isReversedDirection() ? 'chevron_left' : 'chevron_right'}/> : <></>}
                    </>) : <></>}
            </>)
        : (<></>)
}
