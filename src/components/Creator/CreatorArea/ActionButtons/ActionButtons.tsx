import styles from './ActionButtons.module.scss'
import Icon from "@/components/construction/Icon/Icon";
import classNames from "@/helpers/classNames";
import {useCallback, useEffect, useRef} from "react";
import {duplicateBlock, removeBlock} from "@/store/structureSlice";
import {useDispatch, useSelector} from "react-redux";
import ActionMoveButtons from "@/components/Creator/CreatorArea/ActionButtons/ActionMoveButtons/ActionMoveButtons";
import MediaActionButtons from "@/components/Creator/CreatorArea/ActionButtons/MediaActionButtons/MediaActionButtons";
import {isMobile} from "@/helpers/mobile-detector";

export default function ActionButtons() {
    const dispatch = useDispatch();
    const ref = useRef(null);
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const structure = useSelector((state: any) => state.structure.structure);
    const pageYOffset = useSelector((state: any) => state.structure.pageYOffset);

    const duplicate = useCallback((block) => {
        dispatch(duplicateBlock({...block}));
    }, [dispatch]);

    const deleteBlk = useCallback((block) => {
        if (confirm('Are you sure you want to delete this block?')) {
            dispatch(removeBlock({...block}));
        }
    }, [dispatch]);

    const setComponentPosition = () => {
        if (!selectedBlock) {
            return;
        }
        const container = ref.current as HTMLElement;
        const parent = document.querySelector(`[data-id="${selectedBlock.id}"]`) as HTMLElement;
        const parentBoundingRect = parent.getBoundingClientRect();
        const parentWidth = parentBoundingRect.width;
        const parentTop = parentBoundingRect.top;
        const parentLeft = parentBoundingRect.left;
        const parentHeight = parentBoundingRect.height;
        const {width, height} = container.getBoundingClientRect();
        const creatorAreaLeftPos = isMobile() ? 0 : 380;
        const creatorAreaBottomPos = isMobile() ? window.innerHeight - 350 : window.innerHeight - 50;
        const creatorAreaTopPos = 50;

        let newTop = parentTop - height;
        if (newTop < creatorAreaTopPos) {
            newTop = parentTop + parentHeight;
            if (newTop > creatorAreaBottomPos) {
                newTop = parentTop;
                if (newTop > creatorAreaBottomPos || newTop < creatorAreaTopPos) {
                    newTop = creatorAreaTopPos;
                }
            }
        }
        let newLeft = parentLeft + (parentWidth / 2) - (width / 2);
        if (newLeft < creatorAreaLeftPos) {
            newLeft = parentLeft;
        }
        if (newLeft + width > window.innerWidth) {
            newLeft = window.innerWidth - width
        }
        container.style.top = `${newTop}px`
        container.style.left = `${newLeft}px`
    }
    useEffect(() => {
        setComponentPosition();
    }, [selectedBlock, pageYOffset, structure])

    const classes = classNames({
        [styles.actionButtons]: true,
        [styles.mobile]: isMobile()
    })
    return (
        <> {selectedBlock
            ? <div className={classes} ref={ref}>
                <ActionMoveButtons/>
                <MediaActionButtons block={selectedBlock}/>

                <Icon className={styles.itemButton}
                      title="Duplikuj"
                      type="material-outlined"
                      name="content_copy"
                      onClick={() => duplicate(selectedBlock)}/>

                <Icon className={classNames([styles.itemButton, styles.delete])}
                      title="Usuń"
                      type="material-outlined"
                      name="close"
                      onClick={() => deleteBlk(selectedBlock)}/>
            </div> : ''}</>
    )
}
