import {useEffect, useRef, useState} from "react";
import styles from "./ColorPicker.module.scss"
import {ColorPickerProps, Rgb, Rgba} from "@/components/construction/ColorPicker/types";
import {
    any2rgba,
    colorArrayToString,
    getHueFromRgba,
    getPreviewStyle
} from "@/components/construction/ColorPicker/functions";
import classNames from "@/helpers/classNames";
import ColorHistory from "@/components/construction/ColorPicker/ColorHistory/ColorHistory";
import RgbaValues from "@/components/construction/ColorPicker/RgbaValues/RgbaValues";
import CanvasOpacity from "@/components/construction/ColorPicker/CanvasOpacity/CanvasOpacity";
import CanvasHueSelect from "@/components/construction/ColorPicker/CanvasHueSelect/CanvasHueSelect";
import MainCanvas from "@/components/construction/ColorPicker/MainCanvas/MainCanvas";


export default function ColorPicker(props: ColorPickerProps) {
    const colorSquareRef = useRef(null);
    const colorPickerContainerRef = useRef(null);

    const [isShown, setIsShown] = useState(false);

    const [currentColor, setCurrentColor] = useState<Rgba>([255, 255, 255, 1]);
    const [currentOpacity, setCurrentOpacity] = useState<number>(1);
    const [hue, setHue] = useState(0)
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
        setCurrentOpacity(color[3])
        setHue(getHueFromRgba(color))
    }
    useEffect(() => {
        init();
    }, [])
    useEffect(() => {
        if (colorArrayToString(any2rgba(props.value)) !== colorArrayToString(currentColor)) {
            init();
        }
    }, [props.value])
    const updateColorOpacityValues = (opacity) => {
        const [r, g, b] = currentColor;
        setCurrentOpacity(opacity);
        setColorValue([r, g, b, opacity]);
    }
    const updateColorValues = (color: Rgb) => {
        const [r, g, b] = color;
        setColorValue([r, g, b, currentOpacity]);
    }
    const show = () => {
        setIsShown(true)
        setPosition();
    }
    const hide = (e) => {
        if (e.target.classList.contains(styles.fixedLayer)) {
            setIsShown(false)
        }
    }
    const setPosition = () => {
        const {top, left, width, height} = (colorSquareRef.current as HTMLElement).getBoundingClientRect();
        const colorPickerContainer = (colorPickerContainerRef.current as HTMLElement);
        const pickerHeight = 335;

        if (top + height - pickerHeight >= 0) {
            colorPickerContainer.style.top = `${top + height - pickerHeight}px`
        } else {
            colorPickerContainer.style.top = `${top}px`
        }
        colorPickerContainer.style.left = `${left + width}px`
    }

    return (
        <div className={styles.colorPicker}>
            <div ref={colorSquareRef} className={styles.colorSquare}
                 style={{backgroundColor: colorArrayToString(currentColor)}}
                 onClick={show}></div>

            <div className={classNames({[styles.fixedLayer]: true, [styles.show]: isShown})} onClick={hide}>
                <div className={styles.colorPickerContainer} ref={colorPickerContainerRef}>
                    <div className={styles.pickerContainer}>
                        <MainCanvas color={currentColor} hue={hue} onChange={updateColorValues}/>
                        <div className={styles.middleContainer}>
                            <div className={styles.colorPreview}>
                                <div className={styles.color} style={getPreviewStyle(currentColor)}/>
                            </div>
                            <div className={styles.barsContainer}>
                                <CanvasHueSelect color={currentColor} onChange={setHue}/>
                                <CanvasOpacity color={currentColor} onChange={updateColorOpacityValues}/>
                            </div>
                        </div>
                    </div>
                    <RgbaValues color={currentColor}/>
                    <ColorHistory color={currentColor} onClickColor={setColor}/>
                </div>
            </div>
        </div>
    )
}
