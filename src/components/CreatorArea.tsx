import {RWD_MODES} from "@/enums/rwd";
import {STYLE_STATE_NAMES} from "@/enums/styleState";
import styles from "@/styles/Components/CreatorArea.module.scss";
import React, {useEffect, useState} from "react";
import {Structure} from "@/models/Structure";
import ContainerBlockComponent from "@/components/Blocks/ContainerBlockComponent";
import {BlockInterface} from "@/interfaces/Block.interface";

interface CreatorAreaProps {
    rwdMode: RWD_MODES;
    styleState: STYLE_STATE_NAMES;
    structure: Structure;
    selectedBlock: BlockInterface | null;
}

export default function CreatorArea(props: CreatorAreaProps) {
    const {rwdMode, styleState, structure, selectedBlock} = props;
    const [block, setBlock] = useState({
        id: null,
        children: structure
    });
    useEffect(() => {
        setBlock({
            id: null,
            children: structure
        });
    }, [props]);
    return (
        <div className={styles.creatorArea}>
            <ContainerBlockComponent block={block} selectedBlock={selectedBlock} rwdMode={rwdMode}
                                     styleState={styleState}/>
        </div>
    )
}
