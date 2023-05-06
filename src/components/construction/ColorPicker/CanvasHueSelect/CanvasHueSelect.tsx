import {useEffect, useRef, useState} from "react";
import styles from "../ColorPicker.module.scss"
import {CanvasHueSelectProps} from "@/components/construction/ColorPicker/types";
import {getHueFromRgba} from "@/components/construction/ColorPicker/functions";
import {getMousePosOnElement} from "@/components/construction/ColorPicker/mouse-functions";
import {
    generateRangeHSV,
    getColorFromCanvas,
    renderCursor
} from "@/components/construction/ColorPicker/canvas-render-functions";


export default function CanvasHueSelect(props: CanvasHueSelectProps) {
    const canvasSelectRef = useRef(null);
    const canvasSelectCursorRef = useRef(null);

    const [isMouseDownColorSelect, setIsMouseDownColorSelect] = useState(false);
    const [hue, setHue] = useState(0);

    const setHueValue = (hueVal, change = true) => {
        setHue(hueVal);
        if (change) {
            props.onChange(hueVal);
        }
    }
    const setColor = () => {
        const _hue = getHueFromRgba(props.color);
        setHueValue(_hue, false);
        const canvasSelectCursorWidth = canvasSelectCursorRef.current.width;
        const huePercent = _hue / 360 * 100;
        const selectCursorXPosition = Math.round(canvasSelectCursorWidth - (canvasSelectCursorWidth * huePercent / 100));

        generateRangeHSV(canvasSelectRef, canvasSelectCursorRef, selectCursorXPosition);
    }
    useEffect(() => {
        setColor();
    }, [])
    useEffect(() => {
        if (hue !== getHueFromRgba(props.color)) {
            setColor();
        }
    }, [props.color])
    const mouseUpSelect = (e) => {
        if (!isMouseDownColorSelect) {
            return
        }
        setIsMouseDownColorSelect(false);
        updateColorSelectValues(e);
    }
    const updateColorSelectValues = (e) => {
        const mousePos = getMousePosOnElement(e);
        const color = getColorFromCanvas(canvasSelectRef, mousePos);
        setHueValue(getHueFromRgba(color));
        renderCursor(canvasSelectCursorRef, {x: mousePos.x, y: 10})
    }
    const mouseDownColorSelect = () => {
        setIsMouseDownColorSelect(true);
    }
    const mouseMoveColorSelect = (e) => {
        if (!isMouseDownColorSelect) {
            return;
        }
        updateColorSelectValues(e);
    }

    return (
        <div className={styles.canvasContainer}>
            <canvas width="210" height="20" ref={canvasSelectRef}/>
            <canvas width="210" height="20" ref={canvasSelectCursorRef}
                    onMouseDown={mouseDownColorSelect}
                    onMouseMove={mouseMoveColorSelect}
                    onMouseUp={mouseUpSelect}
                    onMouseLeave={mouseUpSelect}/>
        </div>
    )
}
