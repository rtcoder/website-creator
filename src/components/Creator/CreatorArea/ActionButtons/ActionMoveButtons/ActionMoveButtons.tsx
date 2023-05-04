import styles from '../ActionButtons.module.scss'
import Icon from "@/components/construction/Icon/Icon";
import {useSelector} from "react-redux";
import {findIndexByIdRecursive, getBlockParent} from "@/helpers/block";
import {BlockInterface} from "@/interfaces/Block.interface";
import {getInheritedStyleWith} from "@/helpers/block-styles";

export default function ActionMoveButtons(props) {

    const structure = useSelector((state: any) => state.structure.structure);
    const parent = getBlockParent(structure, props.block.id);
    const index = findIndexByIdRecursive(structure, props.block.id);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const parentStyles = parent ? parent.styles : {};
    const parentFlexDirection = getInheritedStyleWith(parentStyles, rwd, styleState, ['flex-direction']).flexDirection || '';
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
    return showMoveButtons()
        ? (
            <>
                {showMoveVerticalButtons()
                    ? (<>
                        {showMoveBottomButton()
                            ? <Icon className={styles.itemButton}
                                    title="Przenieś w dół"
                                    type="material-outlined"
                                    name="expand_more"/> : <></>}

                        {showMoveTopButton()
                            ? <Icon className={styles.itemButton}
                                    title="Przenieś w górę"
                                    type="material-outlined"
                                    name="expand_less"/> : <></>}
                    </>) : <></>}

                {showMoveHorizontalButtons()
                    ? (<>
                        {showMoveTopButton()
                            ? <Icon className={styles.itemButton}
                                    title="Przenieś w lewo"
                                    type="material-outlined"
                                    name="chevron_left"/> : <></>}

                        {showMoveBottomButton()
                            ? <Icon className={styles.itemButton}
                                    title="Przenieś w prawo"
                                    type="material-outlined"
                                    name="chevron_right"/> : <></>}
                    </>) : <></>}
            </>)
        : (<></>)
}
