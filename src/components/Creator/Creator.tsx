import TopPanel from "./TopPanel/TopPanel";
import CreatorArea from "./CreatorArea/CreatorArea";
import React, {useCallback, useEffect} from "react";
import LeftPanel from "./LeftPanel/LeftPanel";
import styles from "./Creator.module.scss";
import {DndProvider} from "react-dnd";
import {TouchBackend} from 'react-dnd-touch-backend'
import {setStructure} from "@/store/structureSlice";
import {useDispatch} from "react-redux";

export default function Creator() {
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
        <DndProvider backend={TouchBackend} options={{enableMouseEvents: true}}>
            <div className={styles.creator}>
                <TopPanel/>
                <LeftPanel/>
                <CreatorArea/>
            </div>
        </DndProvider>
    )
}
