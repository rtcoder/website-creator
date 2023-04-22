import TopPanel from "@/components/TopPanel";
import CreatorArea from "@/components/CreatorArea";
import React from "react";
import LeftPanel from "@/components/LeftPanel";
import styles from "@/styles/Components/Creator.module.scss";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

export default function () {
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
