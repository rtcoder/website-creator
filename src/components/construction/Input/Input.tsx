import {forwardRef, HTMLInputTypeAttribute, useEffect, useState} from "react";
import styles from "./Input.module.scss"
import classNames from "@/helpers/classNames";

interface Props {
    label?: string;
    onChange: (ev: any, value: string) => void;
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

const Input = forwardRef(function (props: Props, ref:any) {
    const {label, type, value, onChange, ...otherProps} = props;
    const [val, setValue] = useState(value);
    const [invalid, setInvalid] = useState(false);

    const numberValidator = ev => {
        if (props.type === "number") {
            if (props.max && +ev.target.value > +props.max) {
                return false
            }
            if (props.min && +ev.target.value < +props.min) {
                return false;
            }
        }
        return true;
    }

    const requiredValidator = ev => {
        if (props.required) {
            return !!ev.target.value.length;
        }
        return true;
    }
    const lengthValidator = ev => {
        if (props.maxLength) {
            return ev.target.value.length <= props.maxLength;
        }
        if (props.minLength) {
            return ev.target.value.length >= props.minLength;
        }
        return true;
    }
    const validate = ev => {
        return numberValidator(ev)
            && requiredValidator(ev)
            && lengthValidator(ev)
    }

    const handleChange = ev => {
        const valid = validate(ev);
        setInvalid(!valid)
        setValue(ev.target.value);
        if (valid) {
            onChange(ev, ev.target.value);
        }
    }
    useEffect(() => {
        setValue(value)
    }, [value])

    const classes = classNames({
        [styles.formInput]: true,
        [styles.hasError]: invalid
    })
    return (
        <div className={styles.formInputContainer}>
            <input {...otherProps}
                   type={type || 'text'}
                   value={val || ''}
                   className={classes}
                   // onKeyUp={handleChange}
                   // onChange={handleChange}
                   onInput={handleChange}
                   ref={ref}/>
            <div className={styles.overlay}/>
            <label className={styles.formInputLabel}>{label}</label>
        </div>
    )
});
Input.displayName = 'Input';
export default Input;
