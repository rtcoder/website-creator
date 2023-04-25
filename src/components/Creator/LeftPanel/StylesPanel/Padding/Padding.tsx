import {useSelector} from "react-redux";
import styles from "../StylesPanel.module.scss"
import InputWithUnits from "@/components/construction/InputWithUnits/InputWithUnits";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {Units} from "@/types/units";
import {useEffect, useState} from "react";

interface Props {
    onChange: (value: string, property: string) => void
}

export default function (props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [paddingTop, setPaddingTop] = useState('');
    const [paddingBottom, setPaddingBottom] = useState('');
    const [paddingLeft, setPaddingLeft] = useState('');
    const [paddingRight, setPaddingRight] = useState('');
    const units: Units[] = ['px', '%', 'em', 'rem']

    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
        ) as any;
        setPaddingTop(style.paddingTop);
        setPaddingBottom(style.paddingBottom);
        setPaddingLeft(style.paddingLeft);
        setPaddingRight(style.paddingRight);
    }, [selectedBlock, rwd, styleState])

    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={units} label="Górny" value={paddingTop}
                                    onChange={e => props.onChange(e, 'paddingTop')}/>
                </div>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={units} label="Dolny" value={paddingBottom}
                                    onChange={e => props.onChange(e, 'paddingBottom')}/>
                </div>
            </div>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={units} label="Lewy" value={paddingLeft}
                                    onChange={e => props.onChange(e, 'paddingLeft')}/>
                </div>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={units} label="Prawy" value={paddingRight}
                                    onChange={e => props.onChange(e, 'paddingRight')}/>
                </div>
            </div>
        </div>
    )
}
