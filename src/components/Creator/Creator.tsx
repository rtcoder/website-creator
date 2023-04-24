import TopPanel from "./TopPanel";
import CreatorArea from "./CreatorArea";
import React, {useCallback, useEffect} from "react";
import LeftPanel from "./LeftPanel";
import styles from "./Creator.module.scss";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {setStructure} from "@/store/structureSlice";
import {useDispatch} from "react-redux";

export default function () {
    const dispatch = useDispatch();
    const setStructureValue = useCallback((data) => {
        dispatch(setStructure(data));
    }, [dispatch]);

    useEffect(() => {
        const lsStructure = localStorage.getItem('structure');
        if (lsStructure) {
            setStructureValue(JSON.parse(lsStructure));
        }
    })

    return (
        <DndProvider backend={HTML5Backend}>
            <div className={styles.creator}>
                <TopPanel/>
                <LeftPanel/>
                <CreatorArea/>
            </div>
        </DndProvider>
    )
}
