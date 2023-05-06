import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BlockInterface} from "@/interfaces/Block.interface";
import {setAttributes} from "@/store/structureSlice";
import Input from "@/components/construction/Input/Input";
import {getAllStructureAnchors} from "@/helpers/block";

export default function Anchor() {
    const selectedBlock: BlockInterface = useSelector((state: any) => state.structure.selectedBlock);
    const structure: BlockInterface[] = useSelector((state: any) => state.structure.structure);
    const [anchor, setAnchor] = useState<string>(null);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const dispatch = useDispatch();
    const _setAttributes = useCallback((data) => {
        dispatch(setAttributes(data));
    }, [dispatch]);
    const updateAnchor = value => {
        setAnchor(value);
        const allAnchors = getAllStructureAnchors([...structure]);
        if (allAnchors.includes(value)) {
            setShowErrorMessage(true);
        } else {
            setShowErrorMessage(false);
            _setAttributes({blockId: selectedBlock?.id, attributes: {id: value || undefined}})
        }

    }
    useEffect(() => {
        setAnchor(selectedBlock?.attributes.id || '')
    }, [selectedBlock])
    return (
        <>
            <Input value={anchor} onChange={(ev, val) => updateAnchor(val)} label="Nazwa kotwicy"/>
            {showErrorMessage ? 'Podana nazwa kotwicy już istnieje' : ''}
        </>
    )
}
