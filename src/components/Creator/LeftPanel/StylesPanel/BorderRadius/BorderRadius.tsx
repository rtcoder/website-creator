import {useSelector} from "react-redux";
import styles from "../StylesPanel.module.scss"
import InputWithUnits from "@/components/construction/InputWithUnits/InputWithUnits";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {Units} from "@/types/units";
import {useEffect, useState} from "react";

interface Props {
    onChange: (value: string, property: string) => void
}

export default function BorderRadius(props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [borderTopLeftRadius, setBorderTopLeftRadius] = useState('');
    const [borderTopRightRadius, setBorderTopRightRadius] = useState('');
    const [borderBottomLeftRadius, setBorderBottomLeftRadius] = useState('');
    const [borderBottomRightRadius, setBorderBottomRightRadius] = useState('');
    const radiusUnits: Units[] = ['px', '%'];

    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomLeftRadius', 'borderBottomRightRadius']
        ) as any;
        setBorderTopLeftRadius(style.borderTopLeftRadius);
        setBorderTopRightRadius(style.borderTopRightRadius);
        setBorderBottomLeftRadius(style.borderBottomLeftRadius);
        setBorderBottomRightRadius(style.borderBottomRightRadius);
    }, [selectedBlock, rwd, styleState])

    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={radiusUnits} label="Lewy górny" value={borderTopLeftRadius}
                                    onChange={e => props.onChange(e, 'borderTopLeftRadius')}/>
                </div>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={radiusUnits} label="Prawy górny" value={borderTopRightRadius}
                                    onChange={e => props.onChange(e, 'borderTopRightRadius')}/>
                </div>
            </div>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={radiusUnits} label="Lewy dolny" value={borderBottomLeftRadius}
                                    onChange={e => props.onChange(e, 'borderBottomLeftRadius')}/>
                </div>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={radiusUnits} label="Prawy dolny" value={borderBottomRightRadius}
                                    onChange={e => props.onChange(e, 'borderBottomRightRadius')}/>
                </div>
            </div>
        </div>
    )
}
