import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BlockInterface} from "@/interfaces/Block.interface";
import {setTagName} from "@/store/structureSlice";
import {Option, Select} from "@/components/construction/Select";

export default function HeadingTagName() {
    const selectedBlock: BlockInterface = useSelector((state: any) => state.structure.selectedBlock);
    const [headingTagName, setHeadingTagName] = useState<string>('h1');

    const dispatch = useDispatch();
    const _setTagName = useCallback((data) => {
        dispatch(setTagName(data));
    }, [dispatch]);
    const updateTagName = value => {
        setHeadingTagName(value);
        _setTagName({blockId: selectedBlock?.id, tagName: value})
    }
    useEffect(() => {
        setHeadingTagName(selectedBlock?.tagName)
    }, [selectedBlock])
    return (
        <>
            <Select label="Rodzaj nagłówka" onChange={updateTagName}>
                <Option value='h1' selected={headingTagName === 'h1'}>Nagłówek H1</Option>
                <Option value='h2' selected={headingTagName === 'h2'}>Nagłówek H2</Option>
                <Option value='h3' selected={headingTagName === 'h3'}>Nagłówek H3</Option>
                <Option value='h4' selected={headingTagName === 'h4'}>Nagłówek H4</Option>
                <Option value='h5' selected={headingTagName === 'h5'}>Nagłówek H5</Option>
                <Option value='h6' selected={headingTagName === 'h6'}>Nagłówek H6</Option>
            </Select>
        </>
    )
}
