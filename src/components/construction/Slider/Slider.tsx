import styles from './Slider.module.scss'
import {useEffect, useRef, useState} from "react";
import classNames from "@/helpers/classNames";

interface Props {
    value: number;
    min: number;
    max: number;
    step?: number;
    label?: string;
    showTicks?: boolean;
    displayValueFn?: (value: number) => string;
    onChange?: (value:  number) => void;
}

export default function Slider(props: Props) {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [value, setValue] = useState(props.value || 0);

    const thumbRef = useRef(null);
    const trackContainerRef = useRef(null);
    const activeTrackContainerRef = useRef(null);
    const getStep = () => props.step || 1;
    const getShowTicks = () => props.showTicks || false;
    const getTicks = () => {
        const step = getStep();

        const ticks: [position: number, active: boolean][] = [];
        for (let i = 0; i < (props.max - props.min); i += step) {
            const posPercent = (i) / (props.max - props.min) * 100;
            ticks.push([posPercent, i <= value])
        }
        return ticks;
    }
    const round = (n: number, to: number): number => Math.round(n / to) * to;
    const getStepFractionalDigitsCount = (): number => {
        return (String(+getStep()).split('.')[1] || '').length
    }
    const getValue = (xPosition: number): number => {
        const step = getStep();

        const {width} = (trackContainerRef.current as HTMLElement).getBoundingClientRect();

        const percent = (xPosition / width) * 100;

        const maxRange = props.max - props.min;

        let value = ((percent / 100) * maxRange) + props.min;
        value = +round(value, step).toFixed(getStepFractionalDigitsCount()) as number;
        return value;
    }
    const getPositionByValue = (val: number): number => {
        return val / (props.max - props.min) * 100;
    }

    const getXMousePosition = e => {
        const {clientX} = e;
        const {left, width} = (trackContainerRef.current as HTMLElement).getBoundingClientRect();
        let x = clientX - left;
        if (x < 0) {
            x = 0
        }
        if (x > width) {
            x = width
        }
        return x;
    }
    const setThumbPosition = e => {
        const x = getXMousePosition(e);
        const val = getValue(x)
        setValue(val);
        const position = getPositionByValue(val)
        thumbRef.current.style.left = `${position}%`;
        activeTrackContainerRef.current.style.width = `${position}%`;
        props.onChange?.( val)
    }
    const mouseDown = e => {
        setIsMouseDown(true);
        setThumbPosition(e);
    }
    const mouseUp = () => {
        setIsMouseDown(false);
    }
    const mouseMove = e => {
        if (!isMouseDown) {
            return;
        }
        setThumbPosition(e);
    }

    useEffect(() => {
        const val = props.value;
        setValue(val);
        const position = getPositionByValue(val)
        thumbRef.current.style.left = `${position}%`;
        activeTrackContainerRef.current.style.width = `${position}%`;
    }, [props.value])
    return (
        <div className={styles.slider}>
            <div className={styles.labelContainer}>
                <span>{props.label || ''}</span>
                <span>{props.displayValueFn?.(value) || value}</span>
            </div>
            <div className={styles.sliderContainer}
                 onMouseMove={mouseMove}
                 onMouseUp={mouseUp}
                 onMouseDown={mouseDown}>
                <div className={styles.trackContainer} ref={trackContainerRef}>
                    <div className={styles.tracks}>
                        <div className={styles.inactiveTrackContainer}/>
                        <div className={styles.activeTrackContainer} ref={activeTrackContainerRef}/>
                    </div>
                    {getShowTicks() ? <div className={styles.ticksContainer}>
                        <div className={styles.ticksList}>
                            {getTicks().map(([pos, active]) =>
                                <div key={pos} style={{left: `${pos}%`}}
                                     className={classNames({[styles.tick]: true, [styles.active]: active})}/>)}
                        </div>
                    </div> : ''}
                </div>
                <div className={styles.thumb} ref={thumbRef}>
                    <div className={styles.thumbPoint}/>
                </div>
            </div>
        </div>
    )
}
