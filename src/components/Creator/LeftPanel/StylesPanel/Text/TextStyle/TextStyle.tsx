import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import ButtonToggleGroup from "@/components/construction/ButtonToggleGroup/ButtonToggleGroup";
import ButtonToggle from "@/components/construction/ButtonToggleGroup/ButtonToggle/ButtonToggle";
import Icon from "@/components/construction/Icon/Icon";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function (props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [fontStyle, setFontStyle] = useState('');
    const [fontWeight, setFontWeight] = useState('');
    const [textDecoration, setTextDecoration] = useState('');
    const [values, setValues] = useState([]);
    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['fontStyle', 'fontWeight', 'textDecoration'],
        ) as any;
        setFontStyle(style.fontStyle || '');
        setFontWeight(style.fontWeight || '');
        setTextDecoration(style.textDecoration || '');

        values.length = 0;
        if (style.fontStyle) {
            values.push(style.fontStyle)
        }
        if (style.fontWeight) {
            values.push(style.fontWeight)
        }
        if (style.textDecoration) {
            values.push(...style.textDecoration.split(' '))
        }
        setValues([...values])
    }, [selectedBlock, rwd, styleState]);
    const onChange = (values) => {
        const textDecorationVal = values.filter(v => ['underline', 'overline', 'line-through'].includes(v)).join(' ');
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
        if (textDecorationVal !== textDecoration) {
            props.onChange(textDecorationVal || null, 'textDecoration')
            setTextDecoration(textDecorationVal);
        }
    }
    return (
        <div className={styles.stylesFormRow}>
            <ButtonToggleGroup onChange={onChange} value={values} multi={true}>
                <ButtonToggle value="700" name="fontWeight" active={['bold', '700'].includes(fontWeight)}>
                    <Icon type="material" name="format_bold"/>
                </ButtonToggle>
                <ButtonToggle value="italic" name="fontStyle" active={fontStyle === 'italic'}>
                    <Icon type="material" name="format_italic"/>
                </ButtonToggle>
                <ButtonToggle value="overline" name="textDecoration" active={textDecoration.includes('overline')}>
                    <Icon type="material" name="format_overline"/>
                </ButtonToggle>
                <ButtonToggle value="underline" name="textDecoration" active={textDecoration.includes('underline')}>
                    <Icon type="material" name="format_underlined"/>
                </ButtonToggle>
                <ButtonToggle value="line-through" name="textDecoration"
                              active={textDecoration.includes('line-through')}>
                    <Icon type="material" name="format_strikethrough"/>
                </ButtonToggle>
            </ButtonToggleGroup>
        </div>
    )
}
