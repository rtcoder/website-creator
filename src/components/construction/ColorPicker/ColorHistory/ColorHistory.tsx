import {useEffect, useState} from "react";
import styles from "./ColorHistory.module.scss"
import {ColorPickerHistoryProps, Rgba} from "@/components/construction/ColorPicker/types";
import {getPreviewStyle} from "@/components/construction/ColorPicker/functions";
import Icon from "@/components/construction/Icon/Icon";


export default function ColorHistory(props: ColorPickerHistoryProps) {
    const [colorsHistory, setColorsHistory] = useState<Rgba[]>([]);
    const isColorInHistory = ([red, green, blue, alpha]: Rgba): boolean => {
        return !!colorsHistory.find(([r, g, b, a]) => r === red && g === green && b === blue && a === alpha);
    }
    const addColorToHistory = (color: Rgba) => {
        if (!color || isColorInHistory(color)) {
            return;
        }
        colorsHistory.unshift(color);
        if (colorsHistory.length > 13) {
            colorsHistory.splice(-1)
        }
        setColorsHistory([...colorsHistory]);
        localStorage.setItem('colorsHistory', JSON.stringify(colorsHistory));
    }
    const updateColorsHistoryFromLocalStorage = (): void => {
        const history = localStorage.getItem('colorsHistory');
        if (history) {
            setColorsHistory(JSON.parse(history));
        }
    }

    useEffect(() => {
        updateColorsHistoryFromLocalStorage();
    }, [])

    return (
        <div className={styles.colorsHistory}>
            <div style={getPreviewStyle(props.color)} onClick={_ => addColorToHistory(props.color)}>
                <div>
                <Icon type="material" name="add" className={styles.icon}/>
                </div>
            </div>
            {colorsHistory.map(color =>
                <div key={color.join('')} style={getPreviewStyle(color)} onClick={_ => props.onClickColor(color)}>
                    <div/>
                </div>
            )}
        </div>
    )
}
