import {useEffect, useRef, useState} from "react";
import Input from "@/components/construction/Input/Input";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function AspectRatio(props: Props) {
    const propsValue = props.value;
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);

    useEffect(() => {
        setInputValue(propsValue);
    }, [propsValue])
    const onInputValueChanged = () => {
        const inputVal = inputRef.current.value;
        setInputValue(inputVal);
        props.onChange(inputVal);
    }
    return (
        <>
            <Input label="Współczynnik proporcji" value={inputValue}
                   ref={inputRef}
                   onChange={onInputValueChanged}
                   list="datalistAspectRatio"/>
            <datalist id="datalistAspectRatio">
                <option value="1/1"/>
                <option value="1/2"/>
                <option value="1/4"/>
                <option value="2/1"/>
                <option value="2/3"/>
            </datalist>
        </>
    )
}
