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
    const [marginTop, setMarginTop] = useState('');
    const [marginBottom, setMarginBottom] = useState('');
    const [marginLeft, setMarginLeft] = useState('');
    const [marginRight, setMarginRight] = useState('');
    const units: Units[] = ['px', '%', 'em', 'rem']

    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
        ) as any;
        setMarginTop(style.marginTop);
        setMarginBottom(style.marginBottom);
        setMarginLeft(style.marginLeft);
        setMarginRight(style.marginRight);
    }, [selectedBlock, rwd, styleState])

    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={units} label="Górny" value={marginTop}
                                    onChange={e => props.onChange(e, 'marginTop')}/>
                </div>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={units} label="Dolny" value={marginBottom}
                                    onChange={e => props.onChange(e, 'marginBottom')}/>
                </div>
            </div>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={units} label="Lewy" value={marginLeft}
                                    onChange={e => props.onChange(e, 'marginLeft')}/>
                </div>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={units} label="Prawy" value={marginRight}
                                    onChange={e => props.onChange(e, 'marginRight')}/>
                </div>
            </div>
        </div>
    )
}
