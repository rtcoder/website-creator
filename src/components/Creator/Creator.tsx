import TopPanel from "./TopPanel/TopPanel";
import CreatorArea from "./CreatorArea/CreatorArea";
import React, {useCallback, useEffect} from "react";
import LeftPanel from "./LeftPanel/LeftPanel";
import styles from "./Creator.module.scss";
import {DndProvider} from "react-dnd";
import {TouchBackend} from 'react-dnd-touch-backend'
import {setStructure} from "@/store/structureSlice";
import {useDispatch} from "react-redux";
import classNames from "@/helpers/classNames";
import {isMobile} from "@/helpers/mobile-detector";

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
    const classes = classNames({
        [styles.creator]: true,
        [styles.mobile]: isMobile()
    })
    return (
        <DndProvider backend={TouchBackend} options={{enableMouseEvents: true}}>
            <div className={classes}>
                <TopPanel/>
                <LeftPanel/>
                <CreatorArea/>
            </div>
        </DndProvider>
    )
}
