import {useEffect, useRef, useState} from "react";
import styles from "./CartesianCoordinateSystem.module.scss"

type Coordinates = { x: number; y: number };

interface Props {
    maxRange?: number;
    coordinates?: Coordinates;
    size: number;
    onChange?: (coordinates: Coordinates) => void
}

export default function CartesianCoordinateSystem(props: Props) {
    const [coordinates, setCoordinates] = useState<Coordinates>({x: 0, y: 0});
    const canvasRef = useRef<any>(null);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const maxRange = props.maxRange || props.size / 2;
    const setCoords = value => {
        value = {
            x: parseInt(value.x),
            y: parseInt(value.y)
        }
        setCoordinates(value);
        props.onChange?.(value)
    }
    const init = (pos) => {
        const canvas = canvasRef.current as HTMLCanvasElement;
        const ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, props.size, props.size);

        ctx.beginPath();
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.moveTo(0, props.size / 2);
        ctx.lineTo(props.size, props.size / 2);
        ctx.moveTo(props.size / 2, 0);
        ctx.lineTo(props.size / 2, props.size);
        ctx.stroke();

        const point = mapPointValueToPointCoordinates(pos)
        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI);
        ctx.lineWidth = 3;
        ctx.fillStyle = 'rgb(23,133,223)';
        ctx.fill();
    }
    const getMousePosOnElement = (e: MouseEvent) => {
        const {clientX, clientY, target} = e;
        const {left, top} = (target as HTMLCanvasElement).getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        return {x, y};
    }

    const mapMousePositionToPointValue = mousePos => {
        const halfSize = props.size / 2;
        const xUnitValue = mousePos.x - halfSize;
        const yUnitValue = mousePos.y - halfSize;
        const xPercentage = (xUnitValue / halfSize) * 100;
        const yPercentage = (yUnitValue / halfSize) * 100;
        const xValue = (xPercentage / 100) * maxRange;
        const yValue = (yPercentage / 100) * maxRange;
        return {
            x: xValue,
            y: yValue
        }
    }
    const mapPointValueToPointCoordinates = point => {
        const halfSize = props.size / 2;
        const xPercentage = (point.x / maxRange) * 100;
        const yPercentage = (point.y / maxRange) * 100;
        const xPos = (xPercentage / 100) * halfSize;
        const yPos = (yPercentage / 100) * halfSize;

        return {
            x: parseInt(`${xPos + halfSize}`),
            y: parseInt(`${yPos + halfSize}`)
        }
    }
    const mouseMove = e => {
        if (e.buttons === 0) {
            setIsMouseDown(false);
            return;
        }
        if (!isMouseDown) {
            return;
        }
        const mousePos = getMousePosOnElement(e);
        setCoords(mapMousePositionToPointValue(mousePos))
    }
    const mouseDown = e => {
        setIsMouseDown(true)
        const mousePos = getMousePosOnElement(e);
        setCoords(mapMousePositionToPointValue(mousePos))
    }
    const mouseUp = () => {
        setIsMouseDown(false)
    }
    useEffect(() => {
        const val = props.coordinates ? {
            x: +props.coordinates.x,
            y: +props.coordinates.y
        } : {x: 0, y: 0};
        setCoordinates(val);
        init(val)
    }, [props.coordinates])
    useEffect(() => {
        init(coordinates)
    }, [coordinates])
    return (
        <div className={styles.cartesianCoordinateSystemContainer}>
            <canvas width={props.size}
                    height={props.size}
                    ref={canvasRef}
                    onMouseUp={mouseUp}
                    onMouseDown={mouseDown}
                    onMouseMove={mouseMove}/>
        </div>
    )
}
