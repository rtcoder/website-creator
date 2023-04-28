import {useEffect, useState} from "react";
import styles from "./ColorHistory.module.scss"
import {ColorPickerHistoryProps, Rgba} from "@/components/construction/ColorPicker/types";
import {getPreviewStyle} from "@/components/construction/ColorPicker/functions";


export default function (props: ColorPickerHistoryProps) {
    const [colorsHistory, setColorsHistory] = useState<Rgba[]>([]);
    const isColorInHistory = ([red, green, blue, alpha]: Rgba): boolean => {
        return !!colorsHistory.find(([r, g, b, a]) => r === red && g === green && b === blue && a === alpha);
    }
    const addColorToHistory = (color: Rgba) => {
        if (!color || isColorInHistory(color)) {
            return;
        }
        colorsHistory.unshift(color);
        if (colorsHistory.length > 20) {
            colorsHistory.splice(-1)
        }
        setColorsHistory(colorsHistory);
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

    useEffect(() => {
        addColorToHistory(props.color);
    }, [props.color])

    return (
        <div className={styles.colorsHistory}>
            {colorsHistory.map(color =>
                <div key={color.join('')} style={getPreviewStyle(color)} onClick={_ => props.onClickColor(color)}>
                    <div/>
                </div>
            )}
        </div>
    )
}
