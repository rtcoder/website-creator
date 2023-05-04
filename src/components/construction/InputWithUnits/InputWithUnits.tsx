import {Units} from "@/types/units";
import {HTMLInputTypeAttribute, useEffect, useRef, useState} from "react";
import styles from "./InputWithUnits.module.scss"
import Input from "@/components/construction/Input/Input";
import {Option, Select} from "@/components/construction/Select";

interface Props {
    label?: string;
    value?: string | number;
    type?: HTMLInputTypeAttribute | undefined;
    max?: number | string | undefined;
    maxLength?: number | undefined;
    min?: number | string | undefined;
    minLength?: number | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    disabled?: boolean | undefined;
    units: Units[];
    onChange: (value: string) => void;
}

const ALL_UNITS: Units[] = ['px', 'pt', 'pc', 'in', 'mm', 'cm', '%', 'rem', 'em', 'vw', 'vh', 'vmin', 'vmax', 'deg', 'ms', 's'];
export default function InputWithUnits(props: Props) {
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
    const onChangeValue = () => {
        const inputVal = inputRef.current.value.replace(/[^0-9\.\-]/g, "");
        inputRef.current.value = inputVal;
        const unitsVal = selectRef.current.value;
        const val = `${inputVal}${unitsVal}`;
        props.onChange(inputVal ? val : '');
    }
    const onInputValueChanged = () => {
        setInputValue(inputRef.current.value.replace(/[^0-9\.]/g, ""));
        onChangeValue();
    }
    const onSelectValueChanged = (val) => {
        setUnitsValue(val);
        selectRef.current.value = val;
        onChangeValue();
    }
    const {units, onChange, value, ...restProps} = props;
    return (
        <div className={styles.inputRow}>
            <Input value={inputValue} ref={inputRef}
                   {...restProps}
                   onChange={onInputValueChanged}/>
            <Select onChange={onSelectValueChanged} className={styles.select} ref={selectRef}>
                {props.units.map(unit => <Option value={unit} key={unit}
                                                 selected={unitsValue === unit}>{unit}</Option>)}
            </Select>
        </div>)
}
