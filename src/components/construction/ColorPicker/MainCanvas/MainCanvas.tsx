import {useEffect, useRef, useState} from "react";
import styles from "../ColorPicker.module.scss"
import {MainCanvasProps, MousePos, Rgb, Rgba} from "@/components/construction/ColorPicker/types";
import {
    clamp,
    colorArrayToString,
    getHueFromRgba,
    hex2hsb,
    rgb2hex
} from "@/components/construction/ColorPicker/functions";
import {getMousePosOnElement} from "@/components/construction/ColorPicker/mouse-functions";
import {
    generateHSV,
    getColorFromCanvas,
    renderCursor
} from "@/components/construction/ColorPicker/canvas-render-functions";


export default function MainCanvas(props: MainCanvasProps) {
    const canvasRef = useRef(null);
    const canvasCursorRef = useRef(null);

    const [isMouseDown, setIsMouseDown] = useState(false);

    const [currentColor, setCurrentColor] = useState<Rgb>([255, 255, 255]);
    const [posMainCanvasCursor, setPosMainCanvasCursor] = useState<MousePos>({x: 0, y: 0});

    const onChange = (color: Rgb) => {
        props.onChange(color);
    }
    const setColorValue = (color: Rgb | Rgba, change = true) => {
        const [r, g, b] = color;
        setCurrentColor([r, g, b]);
        if (change) {
            onChange([r, g, b]);
        }
    }
    const setColor = (color: Rgb | Rgba, change = true) => {
        setColorValue(color, change);
        const hue = getHueFromRgba(color);
        const mainCanvasWidth = canvasCursorRef.current.width;
        const mainCanvasHeight = canvasCursorRef.current.height;

        const hsb = hex2hsb(rgb2hex(color));
        const x = clamp(Math.ceil(hsb.s / (100 / mainCanvasWidth)), 0, mainCanvasWidth - 1);
        const y = clamp(mainCanvasHeight - Math.ceil(hsb.b / (100 / mainCanvasHeight)), 0, mainCanvasHeight);
        setPosMainCanvasCursor({x, y});

        generateHSV(canvasRef, canvasCursorRef, hue, {x, y});
    }
    useEffect(() => {
        setColor(props.color);
    }, [])
    useEffect(() => {
        updateColorFromHueValues()
    }, [props.hue])
    useEffect(() => {
        const [r, g, b] = props.color;
        if (colorArrayToString(currentColor) !== colorArrayToString([r, g, b])) {
            setColor(props.color);
        }
    }, [props.color])
    const mouseUp = (e) => {
        if (!isMouseDown) {
            return
        }
        setIsMouseDown(false);
        updateColorValues(e);
    }
    const updateColorFromHueValues = () => {
        generateHSV(canvasRef, canvasCursorRef, props.hue, posMainCanvasCursor);
        const mainCanvasColor = getColorFromCanvas(canvasRef, posMainCanvasCursor);
        const [r, g, b] = mainCanvasColor;
        setColorValue([r, g, b]);
    }
    const updateColorValues = (e) => {
        const mousePos = getMousePosOnElement(e);
        const color = getColorFromCanvas(canvasRef, mousePos);
        const [r, g, b] = color;
        setColorValue([r, g, b]);
        setPosMainCanvasCursor(mousePos)
        renderCursor(canvasCursorRef, mousePos)
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

    return (
        <div className={styles.canvasContainer}>
            <canvas width="250" height="125" ref={canvasRef}/>
            <canvas width="250" height="125" ref={canvasCursorRef}
                    onMouseDown={mouseDown}
                    onMouseMove={mouseMove}
                    onMouseUp={mouseUp}
                    onMouseLeave={mouseUp}/>
        </div>
    )
}
