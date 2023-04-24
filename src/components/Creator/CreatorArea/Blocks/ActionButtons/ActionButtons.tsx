import styles from './ActionButtons.module.scss'
import Icon from "@/components/construction/Icon/Icon";
import classNames from "@/helpers/classNames";
import {useCallback, useEffect, useRef, useState} from "react";
import {duplicateBlock, removeBlock} from "@/store/structureSlice";
import {useDispatch} from "react-redux";
import ActionMoveButtons from "@/components/Creator/CreatorArea/Blocks/ActionButtons/ActionMoveButtons/ActionMoveButtons";
import MediaActionButtons from "@/components/Creator/CreatorArea/Blocks/ActionButtons/MediaActionButtons/MediaActionButtons";
import {ActionButtonsPropsInterface} from "@/interfaces/ActionButtons.interface";

export default function ActionButtons(props:ActionButtonsPropsInterface) {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const [posLeft, setPosLeft] = useState(false);
    const [posRight, setPosRight] = useState(false);
    const [posBottom, setPosBottom] = useState(false);

    const duplicate = useCallback(() => {
        dispatch(duplicateBlock(props.block));
    }, [dispatch]);

    const deleteBlk = useCallback(() => {
        if (confirm('Are you sure you want to delete this block?')) {
            dispatch(removeBlock(props.block));
        }
    }, [dispatch]);
    useEffect(() => {
        const container = ref.current as HTMLElement;
        const parent = container.parentNode as HTMLElement;
        const parentWidth = parent.getBoundingClientRect().width;
        const {left, width, top} = container.getBoundingClientRect();
        const creatorAreaLeftPos = 330;
        const creatorAreaTopPos = 50;

        if (!container.classList.contains('left')) {
            if (left < creatorAreaLeftPos) {
                setPosLeft(true);
            }
        } else {
            if ((left + (parentWidth / 2) - width / 2) >= creatorAreaLeftPos + 20) {
                setPosLeft(false);
            }
        }
        if (!container.classList.contains('right')) {
            if (left + width > window.innerWidth) {
                setPosRight(true);
            }
        } else {
            if ((left + width - (parentWidth / 2) + width / 2) <= window.innerWidth) {
                setPosRight(false);
            }
        }
        if (!container.classList.contains('bottom')) {
            if (top < creatorAreaTopPos) {
                setPosBottom(true);
            }
        } else {
            if (top >= creatorAreaTopPos) {
                setPosBottom(false);
            }
        }
    })

    const classes = classNames({
        [styles.actionButtons]: true,
        [styles.left]: posLeft,
        [styles.right]: posRight,
        [styles.bottom]: posBottom
    })

    return (
        <div className={classes} ref={ref}>
            <ActionMoveButtons block={props.block}/>
            <MediaActionButtons block={props.block}/>

            {/*${this.getAdditionalButtonsHtml()}*/}
            <Icon className={styles.itemButton}
                  title="Ustawienia"
                  type="material-outlined"
                  name="build"/>

            <Icon className={styles.itemButton}
                  title="Duplikuj"
                  type="material-outlined"
                  name="content_copy"
                  onClick={duplicate}/>

            <Icon className={styles.itemButton}
                  title="Przenieś"
                  type="material-outlined"
                  name="open_with"/>

            <Icon className={classNames([styles.itemButton, styles.delete])}
                  title="Usuń"
                  type="material-outlined"
                  name="close"
                  onClick={deleteBlk}/>
        </div>
    )
}