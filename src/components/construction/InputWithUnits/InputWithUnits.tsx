import {Units} from "@/types/units";
import {useEffect, useRef, useState} from "react";
import styles from "./InputWithUnits.module.scss"
import {Input} from "@/components/construction/Input/Input";

interface Props {
    label?: string;
    value?: string | number;
    units: Units[];
    onChange: (value: string) => void;
}

const ALL_UNITS = ['px', 'pt', 'pc', 'in', 'mm', 'cm', '%', 'rem', 'em', 'vw', 'vh', 'vmin', 'vmax'];
export default function (props: Props) {
    const propsValue = String(props.value || '');
    const [inputValue, setInputValue] = useState('');
    const [unitsValue, setUnitsValue] = useState('');
    const inputRef = useRef(null);
    const selectRef = useRef(null);

    useEffect(() => {
        const unit = ALL_UNITS.find(unit => propsValue.includes(unit));
        const val = unit ? propsValue.replace(unit, '') : propsValue;
        setInputValue(val);
        setUnitsValue(unit || '');
    }, [propsValue])
    const onChange = () => {
        const inputVal = inputRef.current.value.replace(/[^0-9\.]/g, "");
        inputRef.current.value=inputVal;
        const unitsVal = selectRef.current.value;
        const val = `${inputVal}${unitsVal}`;
        props.onChange(inputVal ? val : '');
    }
    const onInputValueChanged = () => {
        setInputValue(inputRef.current.value.replace(/[^0-9\.]/g, ""));
        onChange();
    }
    const onSelectValueChanged = () => {
        setUnitsValue(selectRef.current.value);
        onChange();
    }
    return (
        <div className={styles.inputRow}>
            <Input type="text" value={inputValue} ref={inputRef} label={props.label} onChange={onInputValueChanged}/>
            <select value={unitsValue} ref={selectRef} onChange={onSelectValueChanged}>
                {props.units.map(unit => <option value={unit} key={unit}>{unit}</option>)}
            </select>
        </div>)
}
