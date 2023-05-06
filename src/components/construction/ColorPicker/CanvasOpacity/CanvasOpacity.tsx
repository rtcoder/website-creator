import {useEffect, useRef, useState} from "react";
import styles from "../ColorPicker.module.scss"
import {CanvasOpacityProps} from "@/components/construction/ColorPicker/types";
import {getMousePosOnElement} from "@/components/construction/ColorPicker/mouse-functions";
import {
    generateOpacityCanvas,
    getColorFromCanvas,
    renderCursor
} from "@/components/construction/ColorPicker/canvas-render-functions";


export default function CanvasOpacity(props: CanvasOpacityProps) {
    const canvasOpacityRef = useRef(null);
    const canvasOpacityCursorRef = useRef(null);

    const [isMouseDownOpacity, setIsMouseDownOpacity] = useState(false);

    const [currentOpacity, setCurrentOpacity] = useState<number>(1);

    const onChange = (opacity: number) => {
        props.onChange(opacity);
    }
    const setOpacity = (opacity, change = true) => {
        setCurrentOpacity(opacity);
        if (change) {
            onChange(opacity);
        }
    }
    const setColor = () => {
        const canvasOpacityCursorWidth = canvasOpacityCursorRef.current.width;
        const [, , , a] = props.color;
        setOpacity(a, false);
        const alphaPercent = a * 100;
        const opacityCursorXPosition = Math.round(canvasOpacityCursorWidth * alphaPercent / 100)

        generateOpacityCanvas(canvasOpacityRef, canvasOpacityCursorRef, opacityCursorXPosition);
    }
    useEffect(() => {
        setColor();
    }, [])
    useEffect(() => {
        const [, , , a] = props.color;
        if (a !== currentOpacity) {
            setColor();
        }
    }, [props.color])
    const mouseUpOpacity = (e) => {
        if (!isMouseDownOpacity) {
            return
        }
        setIsMouseDownOpacity(false);
        updateColorOpacityValues(e);
    }
    const updateColorOpacityValues = (e) => {
        const mousePos = getMousePosOnElement(e);
        const color = getColorFromCanvas(canvasOpacityRef, mousePos);
        const [, , , a] = color;
        setOpacity(a);
        renderCursor(canvasOpacityCursorRef, {x: mousePos.x, y: 10})
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

    return (
        <div className={styles.canvasContainer}>
            <canvas width="210" height="20" ref={canvasOpacityRef} className={styles.opacity}/>
            <canvas width="210" height="20" ref={canvasOpacityCursorRef}
                    onMouseDown={mouseDownOpacity}
                    onMouseMove={mouseMoveColorOpacity}
                    onMouseUp={mouseUpOpacity}
                    onMouseLeave={mouseUpOpacity}/>
        </div>
    )
}
