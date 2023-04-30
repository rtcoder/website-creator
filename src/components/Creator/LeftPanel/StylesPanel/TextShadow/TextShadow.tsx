import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import CartesianCoordinateSystem from "@/components/construction/CartesianCoordinateSystem/CartesianCoordinateSystem";
import stylesTextShadow from './TextShadow.module.scss'
import {Input} from "@/components/construction/Input/Input";

type Shadow = { x: number, y: number, blur: number, color: string };

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function (props: Props) {
    const emptyShadow: Shadow = {x: 0, y: 0, blur: 0, color: '#f30'};
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [shadowArray, setShadowArray] = useState<Shadow[]>([emptyShadow]);
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
                singleVal = `${splitVal[i]}, ${splitVal[i + 1]}, ${splitVal[i + 2]}, ${splitVal[i + 3]}`;
                i = i + 4;
            } else if (splitVal[i].includes('rgb')) {
                singleVal = `${splitVal[i]}, ${splitVal[i + 1]}, ${splitVal[i + 2]}`;
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
    const mapShadowArrayToString = (shadowArr: Shadow[]) => {
        return shadowArr.map(({x, y, blur, color}) => {
            return `${x}px ${y}px ${blur}px ${color}`
        }).join(', ')
    }

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
            x = x.replace(/[^\d.\-]+/, '');
            y = y.replace(/[^\d.\-]+/, '');
            blur = blur.replace(/[^\d.\-]+/, '');
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
    useEffect(() => {
        if (!shadowArray.length) {
            setShadowArray([...[emptyShadow]]);
        }
    }, [shadowArray])

    const updateShadow = (prop: string, value: string, index: number) => {
        if (!shadowArray[index]) {
            return
        }
        if (['x', 'y', 'blur'].includes(prop)) {
            if (!value) {
                value = '0';
            }
        }
        shadowArray[index][prop] = value;
        setShadowArray([...shadowArray]);
        props.onChange(mapShadowArrayToString(shadowArray), 'textShadow');
    }
    const updatePosition = (position, index) => {
        if (!shadowArray[index]) {
            return
        }

        shadowArray[index].x = position.x;
        shadowArray[index].y = position.y;
        setShadowArray([...shadowArray]);
        props.onChange(mapShadowArrayToString(shadowArray), 'textShadow');
    }
    const addShadow = ()=>{
        setShadowArray([...shadowArray, emptyShadow])
    }
    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                <div className={stylesTextShadow.letterPreview}
                     style={{textShadow: mapShadowArrayToString(shadowArray)}}>A
                </div>
            </div>
            {shadowArray.map(({x, y, blur, color}, index) =>
                <div className={styles.stylesFormRow} key={index}>
                    <div className={styles.stylesFormColumn}>
                        <Input type="number" max={20} min={-20}
                               onChange={(ev, val) => updateShadow('x', val, index)}
                               value={x} label="X"/>
                        <Input type="number" max={20} min={-20}
                               onChange={(ev, val) => updateShadow('y', val, index)}
                               value={y} label="Y"/>
                        <Input type="number" max={20} min={0}
                               onChange={(ev, val) => updateShadow('blur', val, index)}
                               value={blur} label="Rozmycie"/>
                    </div>
                    <div className={styles.stylesFormField}>
                        <CartesianCoordinateSystem maxRange={20} size={80} coordinates={{x, y}}
                                                   onChange={pos => updatePosition(pos, index)}/>
                    </div>
                </div>
            )}
            <div onClick={addShadow}>dodaj</div>
        </div>
    )
}
