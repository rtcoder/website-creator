import styles from './BlockSelectionBorder.module.scss'
import {useEffect, useRef} from "react";
import {useSelector} from "react-redux";

export default function BlockSelectionBorder() {
    const ref = useRef(null);
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const structure = useSelector((state: any) => state.structure.structure);
    const pageYOffset = useSelector((state: any) => state.structure.pageYOffset);
    const hiddenBlocksIds = useSelector((state: any) => state.structure.hiddenBlocksIds);

    const setComponentPosition = () => {
        if (!selectedBlock) {
            return;
        }
        const container = ref.current as HTMLElement;
        const parent = document.querySelector(`[data-id="${selectedBlock.id}"]`) as HTMLElement;
        const {width, height, top, left} = parent.getBoundingClientRect();
        container.style.top = `${top}px`
        container.style.left = `${left}px`
        container.style.height = `${height}px`
        container.style.width = `${width}px`
    }
    useEffect(() => {
        setTimeout(() => {
            setComponentPosition();
        }, 1);
    }, [selectedBlock])
    useEffect(() => {
        setComponentPosition();
    }, [pageYOffset, hiddenBlocksIds, structure])

    return (
        <> {selectedBlock ? <div className={styles.selection} ref={ref}/> : ''}</>
    )
}
