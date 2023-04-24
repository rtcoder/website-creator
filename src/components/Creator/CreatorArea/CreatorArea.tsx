import styles from "./CreatorArea.module.scss";
import React from "react";
import ContainerBlockComponent from "@/components/Creator/CreatorArea/Blocks/ContainerBlockComponent";
import {useSelector} from "react-redux";

export default function () {
    const structure = useSelector((state: any) => state.structure.structure);
    return (
        <div className={styles.creatorArea}>
            <ContainerBlockComponent id={null} children={structure}/>
        </div>
    )
}
