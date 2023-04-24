import {forwardRef, HTMLInputTypeAttribute, useEffect, useState} from "react";
import styles from "./Input.module.scss"

interface InputProps {
    label?: string;
    onChange: (value: string) => void;
    accept?: string | undefined;
    alt?: string | undefined;
    autoComplete?: string | undefined;
    capture?: boolean | 'user' | 'environment' | undefined;
    checked?: boolean | undefined;
    crossOrigin?: "anonymous" | "use-credentials" | "" | undefined;
    disabled?: boolean | undefined;
    enterKeyHint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send' | undefined;
    form?: string | undefined;
    formAction?: string | undefined;
    formEncType?: string | undefined;
    formMethod?: string | undefined;
    formNoValidate?: boolean | undefined;
    formTarget?: string | undefined;
    height?: number | string | undefined;
    list?: string | undefined;
    max?: number | string | undefined;
    maxLength?: number | undefined;
    min?: number | string | undefined;
    minLength?: number | undefined;
    multiple?: boolean | undefined;
    name?: string | undefined;
    pattern?: string | undefined;
    placeholder?: string | undefined;
    readOnly?: boolean | undefined;
    required?: boolean | undefined;
    size?: number | undefined;
    src?: string | undefined;
    step?: number | string | undefined;
    type?: HTMLInputTypeAttribute | undefined;
    value?: string | ReadonlyArray<string> | number | undefined;
    width?: number | string | undefined;
}

export const Input = forwardRef(function (props: InputProps, ref) {
    const {label, type, value, onChange, ...otherProps} = props;
    const [val, setValue] = useState(value)
    const handleChange = ev => {
        setValue(ev.target.value)
        onChange(ev);
    }
    useEffect(() => {
        setValue(value)
    }, [value])
    return (
        <div className={styles.formInputContainer}>
            <input {...otherProps}
                   type={type || 'text'}
                   value={val}
                   className={styles.formInput}
                   onKeyUp={handleChange}
                   onChange={handleChange}
                   ref={ref}/>
            <div className={styles.overlay}/>
            <label className={styles.formInputLabel}>{label}</label>
        </div>
    )
});
