import {useSelector} from "react-redux";
import styles from "../StylesPanel.module.scss"
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useEffect, useRef, useState} from "react";
import {Input} from "@/components/construction/Input/Input";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function Quote(props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [leftChar, setLeftChar] = useState('');
    const [rightChar, setRightChar] = useState('');
    const leftInputRef = useRef(null);
    const rightInputRef = useRef(null);

    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['quotes'],
        ) as any;
        const [left, right] = (style.quotes || '\'\' \'\'')
            .replace(/^'/, '')
            .replace(/'$/, '')
            .split('\' \'');

        setLeftChar(left);
        setRightChar(right);
    }, [selectedBlock, rwd, styleState])
    const changed = (e) => {
        e.target.value = e.target.value.replace(/[\\\/'"]/, '');
        const left = (leftInputRef.current as HTMLInputElement).value.replace(/[\\\/'"]/, '');
        const right = (rightInputRef.current as HTMLInputElement).value.replace(/[\\\/'"]/, '');
        setLeftChar(left);
        setRightChar(right);

        if (`${left}${right}`.trim().length > 0) {
            props.onChange(`'${left}' '${right}'`, 'quotes');
        } else {
            props.onChange(null, 'quotes');
        }
    }
    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <Input type="text" value={leftChar} ref={leftInputRef} label="Znak po lewej" onChange={changed}/>
                </div>
                <div className={styles.stylesFormField}>
                    <Input type="text" value={rightChar} ref={rightInputRef} label="Znak po prawej" onChange={changed}/>
                </div>
            </div>
        </div>
    )
}
