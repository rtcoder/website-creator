import styles from "@/styles/Components/CreatorArea.module.scss";
import React from "react";
import ContainerBlockComponent from "@/components/Blocks/ContainerBlockComponent";
import {useSelector} from "react-redux";

export default function () {
    const structure = useSelector((state: any) => state.structure.structure);
    return (
        <div className={styles.creatorArea}>
            {JSON.stringify(structure)}
            <ContainerBlockComponent id={null} children={structure}/>
        </div>
    )
}
