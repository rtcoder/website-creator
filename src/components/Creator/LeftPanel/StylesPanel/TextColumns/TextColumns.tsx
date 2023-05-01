import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import InputWithUnits from "@/components/construction/InputWithUnits/InputWithUnits";
import {Input} from "@/components/construction/Input/Input";
import {Units} from "@/types/units";
import BorderStyle from "@/components/Creator/LeftPanel/StylesPanel/Border/BorderStyle/BorderStyle";
import ColorPicker from "@/components/construction/ColorPicker/ColorPicker";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function (props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);

    const [columnCount, setColumnCount] = useState('');
    const [columnWidth, setColumnWidth] = useState('');
    const [columnGap, setColumnGap] = useState('');
    const [columnRuleWidth, setColumnRuleWidth] = useState('');
    const [columnRuleStyle, setColumnRuleStyle] = useState('');
    const [columnRuleColor, setColumnRuleColor] = useState('');

    const units: Units[] = ['px', 'em', 'rem'];
    const borderUnits: Units[] = ['px', 'pt', 'em', 'rem'];


    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['columnCount', 'columnWidth', 'columnGap', 'columnRuleWidth', 'columnRuleStyle', 'columnRuleColor']
        ) as any;
        setColumnCount(style.columnCount || '');
        setColumnWidth(style.columnWidth || '');
        setColumnGap(style.columnGap || '');
        setColumnRuleWidth(style.columnRuleWidth || '');
        setColumnRuleStyle(style.columnRuleStyle || '');
        setColumnRuleColor(style.columnRuleColor || '');
    }, [selectedBlock, rwd, styleState])

    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <Input label="Liczba kolumn" value={columnCount}
                           onChange={(e, v) => props.onChange(v, 'columnCount')}/>
                </div>
            </div>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={units} label="Szerokość kolumn" value={columnWidth}
                                    onChange={e => props.onChange(e, 'columnWidth')}/>
                </div>
            </div>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={units} label="Odległość między kolumnami" value={columnGap}
                                    onChange={e => props.onChange(e, 'columnGap')}/>
                </div>
            </div>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={borderUnits} label="Rozdzielacz"
                                    value={columnRuleWidth}
                                    onChange={e => props.onChange(e, 'columnRuleWidth')}/>
                </div>
                <div className={styles.stylesFormField}>
                    <BorderStyle value={columnRuleStyle}
                                 onChange={e => props.onChange(e, 'columnRuleStyle')}/>
                </div>
                <div className={styles.stylesFormField}
                     style={{width: '30px'}}>
                    <ColorPicker value={columnRuleColor}
                                 onChange={e => props.onChange(e, 'columnRuleColor')}/>
                </div>
            </div>
        </div>)
}
