import {useEffect, useState} from "react";
import {Option, Select} from "@/components/construction/Select";

interface Props {
    value: string;
    onChange: (value: string) => void;
}

export default function (props: Props) {
    const propsValue = props.value;
    const [value, setVal] = useState('');

    useEffect(() => {
        setVal(propsValue);
    }, [propsValue])
    const onChange = (val) => {
        setVal(val);
        props.onChange(val);
    }
    const styleValues = ['solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset', 'none', 'hidden']
    return (
        <div style={{paddingTop: '20px'}}>
            <Select onChange={onChange} label="Wybierz styl">
                <Option value="">Brak</Option>
                {styleValues.map(val => <Option value={val} key={val} selected={val === value}>{val}</Option>)}
            </Select>
        </div>
    )
}
