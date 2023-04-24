import styles from "./CreatorArea.module.scss";
import React from "react";
import ContainerBlock from "@/components/Creator/CreatorArea/Blocks/ContainerBlock";
import {useSelector} from "react-redux";

export default function () {
    const structure = useSelector((state: any) => state.structure.structure);
    return (
        <div className={styles.creatorArea}>
            <ContainerBlock id={null} children={structure}/>
        </div>
    )
}
