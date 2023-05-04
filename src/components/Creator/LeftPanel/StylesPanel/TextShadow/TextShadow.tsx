import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import stylesTextShadow from './TextShadow.module.scss'
import ColorPicker from "@/components/construction/ColorPicker/ColorPicker";
import InputWithUnits from "@/components/construction/InputWithUnits/InputWithUnits";
import {Units} from "@/types/units";
import Icon from "@/components/construction/Icon/Icon";
import AddButton from "@/components/construction/AddButton/AddButton";

type Shadow = { x: string, y: string, blur: string, color: string };

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function TextShadow(props: Props) {
    const emptyShadow: Shadow = {x: '0px', y: '0px', blur: '0px', color: '#000'};
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [shadowArray, setShadowArray] = useState<Shadow[]>([]);
    const getShadowValues = shadow => {
        if (!shadow) {
            return [];
        }
        const splitVal = shadow.split(',');
        const shadowArray = [];
        let i = 0;
        while (i < splitVal.length) {
            let singleVal = '';
            if (splitVal[i].includes('rgba')) {
                singleVal = `${splitVal[i].trim()}, ${splitVal[i + 1].trim()}, ${splitVal[i + 2].trim()}, ${splitVal[i + 3].trim()}`;
                i = i + 4;
            } else if (splitVal[i].includes('rgb')) {
                singleVal = `${splitVal[i].trim()}, ${splitVal[i + 1].trim()}, ${splitVal[i + 2].trim()}`;
                i = i + 3;
            } else {
                singleVal = splitVal[i];
                i++;
            }
            shadowArray.push(singleVal)
        }
        return shadowArray;
    };
    const shadowStartsWithColor = shadow => {
        shadow = shadow.trim();
        return shadow.startsWith('rgb')
            || shadow.startsWith('hsl')
            || shadow.startsWith('hwb')
            || shadow.startsWith('lab')
            || shadow.startsWith('lch')
            || shadow.startsWith('#');
    }
    const mapShadowArrayToString = (shadowArr: Shadow[]) =>
        shadowArr.map(({x, y, blur, color}) => `${x} ${y} ${blur} ${color}`).join(', ');

    const mapShadowStringToArray = shadowString => {
        const shadow = getShadowValues(shadowString);
        return shadow.map(shadowString => {
            let x, y, blur, color;
            const matchRegex = /\S+\([\d\s,\.]+\)|[\-\w\#]+/gm;
            if (!shadowStartsWithColor(shadowString)) {
                [x, y, blur, color] = shadowString.match(matchRegex);
            } else {
                [color, x, y, blur] = shadowString.match(matchRegex);
            }
            return {
                x, y, blur, color
            }
        })
    }
    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['textShadow'],
        ) as any;
        setShadowArray(
            [...mapShadowStringToArray(style.textShadow)]
        );

    }, [selectedBlock, rwd, styleState])

    const updateShadow = (prop: string, value: string, index: number) => {
        if (!shadowArray[index]) {
            return
        }
        if (['x', 'y', 'blur'].includes(prop)) {
            if (!value.length) {
                value = '0px';
            }
        }
        shadowArray[index][prop] = value;
        setShadowArray([...shadowArray]);
        props.onChange(mapShadowArrayToString(shadowArray), 'textShadow');
    }
    const addShadow = () => {
        setShadowArray([...shadowArray, emptyShadow]);
        props.onChange(mapShadowArrayToString([...shadowArray, emptyShadow]), 'textShadow');
    }
    const removeShadow = index => {
        shadowArray.splice(index, 1);
        setShadowArray([...shadowArray]);
        props.onChange(mapShadowArrayToString(shadowArray), 'textShadow');
    }
    const units: Units[] = ['px']
    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                <div className={stylesTextShadow.letterPreview}
                     style={{textShadow: mapShadowArrayToString(shadowArray)}}>A
                </div>
            </div>
            {shadowArray.map(({x, y, blur, color}, index) =>
                <div className={styles.stylesFormColumn} key={index}>
                    <div className={styles.stylesFormRow}>
                        <div className={styles.stylesFormField}>
                            <InputWithUnits units={units} value={x} min={-20} max={20} label="X"
                                            type="number" onChange={e => updateShadow('x', e, index)}/>
                        </div>
                        <div className={styles.stylesFormField}>
                            <InputWithUnits units={units} value={y} min={-20} max={20} label="Y"
                                            type="number" onChange={e => updateShadow('y', e, index)}/>
                        </div>
                    </div>
                    <div className={styles.stylesFormRow}>
                        <div className={styles.stylesFormField}>
                            <InputWithUnits units={units} value={blur} min={0} max={20} label="Rozmycie"
                                            type="number" onChange={e => updateShadow('blur', e, index)}/>
                        </div>
                        <div className={styles.stylesFormField}
                             style={{width: '30px'}}>
                            <ColorPicker value={color} onChange={e => updateShadow('color', e, index)}/>
                        </div>
                        <div className={styles.stylesFormField}
                             style={{width: '30px'}}>
                            <Icon type="material" name="close" className={stylesTextShadow.closeIcon}
                                  onClick={_ => removeShadow(index)}/>
                        </div>
                    </div>
                </div>
            )}
            <AddButton onClick={addShadow}>Dodaj cień</AddButton>
        </div>
    )
}
