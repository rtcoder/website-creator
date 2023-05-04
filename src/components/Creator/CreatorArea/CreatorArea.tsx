import styles from "./CreatorArea.module.scss";
import React, {useCallback} from "react";
import ContainerBlock from "@/components/Creator/CreatorArea/Blocks/ContainerBlock";
import {useDispatch, useSelector} from "react-redux";
import {setPageYOffset} from "@/store/structureSlice";
import BlockSelectionBorder from "@/components/Creator/CreatorArea/BlockSelectionBorder/BlockSelectionBorder";
import ActionButtons from "@/components/Creator/CreatorArea/ActionButtons/ActionButtons";

export default function CreatorArea() {
    const structure = useSelector((state: any) => state.structure.structure);
    const dispatch = useDispatch();
    const _setPageYOffset = useCallback((data: number) => {
        dispatch(setPageYOffset(data));
    }, [dispatch]);
    const onScroll = () => {
        _setPageYOffset(window.scrollY)
    }
    return (
        <div className={styles.creatorArea} onScroll={onScroll}>
            <ContainerBlock id={null} blocks={structure}/>
            <ActionButtons/>
            <BlockSelectionBorder/>
        </div>
    )
}
