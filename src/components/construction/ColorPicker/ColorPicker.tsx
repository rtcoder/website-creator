import {useEffect, useRef, useState} from "react";
import styles from "./ColorPicker.module.scss"
import {ColorPickerProps, MousePos, Rgba} from "@/components/construction/ColorPicker/types";
import {
    any2rgba,
    clamp,
    colorArrayToString,
    getHueFromRgba,
    getPreviewStyle,
    hex2hsb,
    rgb2hex
} from "@/components/construction/ColorPicker/functions";
import {getMousePosOnElement} from "@/components/construction/ColorPicker/mouse-functions";
import {
    generateHSV,
    generateOpacityCanvas,
    generateRangeHSV,
    getColorFromCanvas,
    renderCursor
} from "@/components/construction/ColorPicker/canvas-render-functions";
import classNames from "@/helpers/classNames";
import ColorHistory from "@/components/construction/ColorPicker/ColorHistory/ColorHistory";
import RgbaValues from "@/components/construction/ColorPicker/RgbaValues/RgbaValues";


export default function ColorPicker(props: ColorPickerProps) {
    const canvasOpacityRef = useRef(null);
    const canvasOpacityCursorRef = useRef(null);
    const canvasSelectRef = useRef(null);
    const canvasSelectCursorRef = useRef(null);
    const canvasRef = useRef(null);
    const canvasCursorRef = useRef(null);
    const colorSquareRef = useRef(null);
    const colorPickerContainerRef = useRef(null);

    const [isShown, setIsShown] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [isMouseDownColorSelect, setIsMouseDownColorSelect] = useState(false);
    const [isMouseDownOpacity, setIsMouseDownOpacity] = useState(false);

    const [currentColor, setCurrentColor] = useState<Rgba>([255, 255, 255, 1]);
    const [currentOpacity, setCurrentOpacity] = useState<number>(1);
    const [posMainCanvasCursor, setPosMainCanvasCursor] = useState<MousePos>({x: 0, y: 0});
    const [colorToHistory, setColorToHistory] = useState<Rgba>(null);
    const onChange = (color: Rgba) => {
        props.onChange(colorArrayToString(color));
    }
    const setColorValue = (color, change = true) => {
        setCurrentColor(color);
        if (change) {
            onChange(color);
        }
    }
    const init = () => {
        if (!props.value) {
            setColor(any2rgba(props.defaultValue || props.value), false);
            return;
        }
        setColor(any2rgba(props.value));
    }
    const setColor = (color: Rgba, change = true) => {
        setColorValue(color, change);
        const hue = getHueFromRgba(color);
        const canvasSelectCursorWidth = canvasSelectCursorRef.current.width;
        const canvasOpacityCursorWidth = canvasOpacityCursorRef.current.width;
        const mainCanvasWidth = canvasCursorRef.current.width;
        const mainCanvasHeight = canvasCursorRef.current.height;
        const huePercent = hue / 360 * 100;
        const selectCursorXPosition = Math.round(canvasSelectCursorWidth - (canvasSelectCursorWidth * huePercent / 100));
        const [, , , a] = color;
        setCurrentOpacity(a);
        const alphaPercent = a * 100;
        const opacityCursorXPosition = Math.round(canvasOpacityCursorWidth * alphaPercent / 100)


        const hsb = hex2hsb(rgb2hex(color));
        const x = clamp(Math.ceil(hsb.s / (100 / mainCanvasWidth)), 0, mainCanvasWidth - 1);
        const y = clamp(mainCanvasHeight - Math.ceil(hsb.b / (100 / mainCanvasHeight)), 0, mainCanvasHeight);
        setPosMainCanvasCursor({x, y});

        generateHSV(canvasRef, canvasCursorRef, hue, {x, y});
        generateRangeHSV(canvasSelectRef, canvasSelectCursorRef, selectCursorXPosition);
        generateOpacityCanvas(canvasOpacityRef, canvasOpacityCursorRef, opacityCursorXPosition);
    }
    useEffect(() => {
        init();
    }, [])
    useEffect(() => {
        if (colorArrayToString(any2rgba(props.value)) !== colorArrayToString(currentColor)) {
            init();
        }
    }, [props.value])
    const mouseUpAll = () => {
        setIsMouseDown(false);
        setIsMouseDownColorSelect(false);
        setIsMouseDownOpacity(false);
    }
    const mouseUp = (e) => {
        if (!isMouseDown) {
            return
        }
        mouseUpAll();
        const color = updateColorValues(e);
        setColorToHistory(color);
    }
    const mouseUpSelect = (e) => {
        if (!isMouseDownColorSelect) {
            return
        }
        mouseUpAll();
        const color = updateColorSelectValues(e);
        setColorToHistory(color);
    }
    const mouseUpOpacity = (e) => {
        if (!isMouseDownOpacity) {
            return
        }
        mouseUpAll();
        const color = updateColorOpacityValues(e);
        setColorToHistory(color);
    }
    const updateColorSelectValues = (e): Rgba => {
        const mousePos = getMousePosOnElement(e);
        const color = getColorFromCanvas(canvasSelectRef, mousePos);
        generateHSV(canvasRef, canvasCursorRef, getHueFromRgba(color), posMainCanvasCursor);
        const mainCanvasColor = getColorFromCanvas(canvasRef, posMainCanvasCursor);
        const [r, g, b] = mainCanvasColor;
        setColorValue([r, g, b, currentOpacity]);
        renderCursor(canvasSelectCursorRef, {x: mousePos.x, y: 10})
        return [r, g, b, currentOpacity];
    }
    const updateColorOpacityValues = (e): Rgba => {
        const mousePos = getMousePosOnElement(e);
        const color = getColorFromCanvas(canvasOpacityRef, mousePos);
        const [r, g, b] = currentColor;
        const [, , , a] = color;
        setCurrentOpacity(a);
        setColorValue([r, g, b, a]);
        renderCursor(canvasOpacityCursorRef, {x: mousePos.x, y: 10})
        return [r, g, b, a];
    }
    const updateColorValues = (e): Rgba => {
        const mousePos = getMousePosOnElement(e);
        const color = getColorFromCanvas(canvasRef, mousePos);
        const [r, g, b] = color;
        setCurrentColor([r, g, b, currentOpacity]);
        onChange([r, g, b, currentOpacity]);
        setPosMainCanvasCursor(mousePos)
        renderCursor(canvasCursorRef, mousePos)
        return [r, g, b, currentOpacity];
    }
    const mouseDown = () => {
        setIsMouseDown(true);
    }
    const mouseMove = (e) => {
        if (!isMouseDown) {
            return;
        }
        updateColorValues(e);
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
    const mouseDownOpacity = () => {
        setIsMouseDownOpacity(true);
    }
    const mouseMoveColorOpacity = (e) => {
        if (!isMouseDownOpacity) {
            return;
        }
        updateColorOpacityValues(e);
    }
    const show = () => {
        setIsShown(true)
    }
    const hide = (e) => {
        if (e.target.classList.contains(styles.fixedLayer)) {
            setIsShown(false)
        }
    }

    return (
        <div className={styles.colorPicker}>
            <div ref={colorSquareRef} className={styles.colorSquare}
                 style={{backgroundColor: colorArrayToString(currentColor)}}
                 onClick={show}></div>

            <div className={classNames({[styles.fixedLayer]: true, [styles.show]: isShown})} onClick={hide}>
                <div className={styles.colorPickerContainer} ref={colorPickerContainerRef}>
                    <div className={styles.pickerContainer}>
                        <div className={styles.canvasContainer}>
                            <canvas width="250" height="125" ref={canvasRef}/>
                            <canvas width="250" height="125" ref={canvasCursorRef}
                                    onMouseDown={mouseDown}
                                    onMouseMove={mouseMove}
                                    onMouseUp={mouseUp}
                                    onMouseLeave={mouseUp}/>
                        </div>
                        <div className={styles.middleContainer}>
                            <div className={styles.colorPreview}>
                                <div className={styles.color} style={getPreviewStyle(currentColor)}/>
                            </div>
                            <div className={styles.barsContainer}>
                                <div className={styles.canvasContainer}>
                                    <canvas width="210" height="20" ref={canvasSelectRef}/>
                                    <canvas width="210" height="20" ref={canvasSelectCursorRef}
                                            onMouseDown={mouseDownColorSelect}
                                            onMouseMove={mouseMoveColorSelect}
                                            onMouseUp={mouseUpSelect}
                                            onMouseLeave={mouseUpSelect}/>
                                </div>
                                <div className={styles.canvasContainer}>
                                    <canvas width="210" height="20" ref={canvasOpacityRef} className={styles.opacity}/>
                                    <canvas width="210" height="20" ref={canvasOpacityCursorRef}
                                            onMouseDown={mouseDownOpacity}
                                            onMouseMove={mouseMoveColorOpacity}
                                            onMouseUp={mouseUpOpacity}
                                            onMouseLeave={mouseUpOpacity}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <RgbaValues color={currentColor}/>
                    <ColorHistory color={colorToHistory} onClickColor={setColor}/>
                </div>
            </div>
        </div>
    )
}
