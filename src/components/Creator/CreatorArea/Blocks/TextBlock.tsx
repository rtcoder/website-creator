import {BlockInterface} from "@/interfaces/Block.interface";
import React, {useCallback, useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import {setTextContent} from "@/store/structureSlice";

interface Props {
    block: BlockInterface,
    multiline?: boolean,
    editable?: boolean
}

export default function TextBlock(props: Props) {
    const CustomTag = props.block.tagName;
    const ref = useRef(null);
    const [html, setHtml] = useState(props.block.textContent)
    const [isFocused, setIsFocused] = useState(false)
    const dispatch = useDispatch();
    const _setTextContent = useCallback((data) => {
        dispatch(setTextContent(data));
    }, [dispatch]);

    const updateContent = () => {
        const val = !!props.multiline
            ? ref.current.innerHTML
            : ref.current.innerText.replaceAll('\n', ' ');
        _setTextContent({blockId: props.block.id, content: val})
    }
    useEffect(() => {
        if (!isFocused) {
            setHtml(props.block.textContent)
        }
    }, [props.block])
    return (
        <CustomTag ref={ref}
                   onFocus={e => setIsFocused(true)}
                   onBlur={e => setIsFocused(false)}
                   contentEditable={!!props.editable}
                   suppressContentEditableWarning={true}
                   onInput={updateContent}
                   dangerouslySetInnerHTML={{__html: html}}
        />
    )
}


