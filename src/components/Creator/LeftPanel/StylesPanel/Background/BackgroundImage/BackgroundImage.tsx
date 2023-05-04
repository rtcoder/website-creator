import {useEffect, useState} from "react";
import styles from "./BackgroundImage.module.scss";
import Icon from "@/components/construction/Icon/Icon";

interface Props {
    label?: string;
    onChange: (value: string) => void;
    value?: string;
}

export default function BackgroundImage(props: Props, ref) {
    const [file, setFile] = useState<string>(null)

    const readFile = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            setFile(result);
            props.onChange(`url(${result})`);
        };
    }
    const getUrlFromStringValue = val => {
        if (val.startsWith('url(')) {
            return val.replace('url(', '').replace(/\)$/, '')
        }
        return val;
    }
    const handleChange = ev => {
        [...ev.target.files].forEach(readFile);
        ev.target.value = '';
    }
    const removeImage = () => {
        setFile(null);
        props.onChange('');
    }
    useEffect(() => {
        setFile(getUrlFromStringValue(props.value))
    }, [props.value])

    return (
        <div className={styles.formInputContainer}>

            <label>
                {props.label}

                <input type="file" onChange={handleChange} accept="image/*"/>
                <div className={styles.files}>
                    {file ? <img src={file}/> : ''}
                </div>
            </label>
            <Icon type="material" name="close" className={styles.icon} onClick={removeImage}/>
        </div>
    )
}
