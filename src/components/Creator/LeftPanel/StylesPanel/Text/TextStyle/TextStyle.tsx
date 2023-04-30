import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import ButtonToggleGroup from "@/components/construction/ButtonToggleGroup/ButtonToggleGroup";
import ButtonToggle from "@/components/construction/ButtonToggleGroup/ButtonToggle/ButtonToggle";
import Icon from "@/components/construction/Icon/Icon";
import InputWithUnits from "@/components/construction/InputWithUnits/InputWithUnits";
import {Units} from "@/types/units";
import {Option, Select} from "@/components/construction/Select";
import style from "./TextStyle.module.scss";
import ColorPicker from "@/components/construction/ColorPicker/ColorPicker";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function (props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [fontStyle, setFontStyle] = useState('');
    const [fontWeight, setFontWeight] = useState('');
    const [textDecorationLine, setTextDecorationLine] = useState('');

    const [textDecorationStyle, setTextDecorationStyle] = useState('');
    const [textDecorationColor, setTextDecorationColor] = useState('');
    const [textDecorationThickness, setTextDecorationThickness] = useState('');

    const [values, setValues] = useState([]);
    const units: Units[] = ['px', 'pt', 'em', 'rem'];

    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['fontStyle', 'fontWeight', 'textDecorationLine', 'textDecorationStyle', 'textDecorationColor', 'textDecorationThickness'],
        ) as any;
        setFontStyle(style.fontStyle || '');
        setFontWeight(style.fontWeight || '');
        setTextDecorationLine(style.textDecorationLine || '');
        setTextDecorationStyle(style.textDecorationStyle || '');
        setTextDecorationColor(style.textDecorationColor || '');
        setTextDecorationThickness(style.textDecorationThickness || '');

        values.length = 0;
        if (style.fontStyle) {
            values.push(style.fontStyle)
        }
        if (style.fontWeight) {
            values.push(style.fontWeight)
        }
        if (style.textDecorationLine) {
            values.push(...style.textDecorationLine.split(' '))
        }
        setValues([...values])
    }, [selectedBlock, rwd, styleState]);
    const onChange = (values) => {
        const textDecorationValuesArray = values.filter(v => ['underline', 'overline', 'line-through'].includes(v))
        const textDecorationVal = textDecorationValuesArray.join(' ');
        const fontWeightVal = values.includes('700') ? '700' : '';
        const fontStyleVal = values.includes('italic') ? 'italic' : '';
        if (fontStyleVal !== fontStyle) {
            props.onChange(fontStyleVal || null, 'fontStyle')
            setFontStyle(fontStyleVal);
        }
        if (fontWeightVal !== fontWeight) {
            props.onChange(fontWeightVal || null, 'fontWeight')
            setFontWeight(fontWeightVal);
        }
        if (textDecorationVal !== textDecorationLine) {
            props.onChange(textDecorationVal || null, 'textDecorationLine')
            setTextDecorationLine(textDecorationVal);
        }
    }
    const styleValues = ['solid', 'dotted', 'dashed', 'double', 'wavy']
    return (
        <>
            <div className={styles.stylesFormRow}>
                <ButtonToggleGroup onChange={onChange} value={values} multi={true}>
                    <ButtonToggle value="700" active={['bold', '700'].includes(fontWeight)}>
                        <Icon type="material" name="format_bold"/>
                    </ButtonToggle>
                    <ButtonToggle value="italic" active={fontStyle === 'italic'}>
                        <Icon type="material" name="format_italic"/>
                    </ButtonToggle>
                    <ButtonToggle value="overline" active={textDecorationLine.includes('overline')}>
                        <Icon type="material" name="format_overline"/>
                    </ButtonToggle>
                    <ButtonToggle value="underline" active={textDecorationLine.includes('underline')}>
                        <Icon type="material" name="format_underlined"/>
                    </ButtonToggle>
                    <ButtonToggle value="line-through" active={textDecorationLine.includes('line-through')}>
                        <Icon type="material" name="format_strikethrough"/>
                    </ButtonToggle>
                </ButtonToggleGroup>
            </div>

            {textDecorationLine.length
                ? <div className={styles.stylesFormRow}>
                    <div className={styles.stylesFormField}>
                        <InputWithUnits units={units} label="Grubość linii" value={textDecorationThickness}
                                        onChange={e => props.onChange(e, 'textDecorationThickness')}/>
                    </div>
                    <div className={styles.stylesFormField}>
                        <Select onChange={e => props.onChange(e, 'textDecorationStyle')} label="Wybierz styl">
                            {styleValues.map(val =>
                                <Option value={val} key={val} selected={val === textDecorationStyle}>
                                    <div className={style.optionStyle} style={{textDecorationStyle: (val as any)}}>
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    </div>
                                </Option>)}
                        </Select>
                    </div>
                    <div className={styles.stylesFormField}
                         style={{
                             display: 'flex',
                             flexDirection: 'row',
                             justifyContent: 'center',
                             alignItems: 'flex-end',
                             width: '30px',
                             alignSelf: 'flex-end'
                         }}>
                        <ColorPicker value={textDecorationColor}
                                     onChange={e => props.onChange(e, 'textDecorationColor')}/>
                    </div>
                </div> : ''}
        </>
    )
}
