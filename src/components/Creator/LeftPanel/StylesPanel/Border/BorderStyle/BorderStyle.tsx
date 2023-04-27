import {useEffect, useRef, useState} from "react";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function (props: Props) {
    const propsValue = props.value;
    const [value, setVal] = useState('');
    const selectRef = useRef(null);

    useEffect(() => {
        setVal(propsValue);
    }, [propsValue])
    const onChange = () => {
        const unitsVal = selectRef.current.value;
        setVal(unitsVal);
        props.onChange(unitsVal);
    }
    const styleValues = ['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden']
    return (
        <div style={{paddingTop: '20px'}}>
            <select value={value} ref={selectRef} onChange={onChange}>
                <option value="">Wybierz styl</option>
                {styleValues.map(val => <option value={val} key={val}>{val}</option>)}
            </select>
        </div>
    )
}
