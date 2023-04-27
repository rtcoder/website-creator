import {MousePos, Rgba} from "@/components/construction/ColorPicker/types";
import {MutableRefObject} from "react";

export const getColorFromCanvas = (canvasElementRef: MutableRefObject<any>, pos: MousePos): Rgba => {
    const canvas = canvasElementRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    let {x, y} = pos;
    if (x < 0) {
        x = 0;
    }
    if (x > canvas.width - 1) {
        x = canvas.width - 1;
    }
    if (y < 0) {
        y = 0;
    }
    if (y > canvas.height - 1) {
        y = canvas.height - 1;
    }
    const [r, g, b, alpha] = ctx.getImageData(x, y, 1, 1).data;
    const a = Math.floor((100 * alpha) / 255) / 100;
    return [r, g, b, a];
}
export const renderCursor = (canvasElementRef: MutableRefObject<any>, pos: MousePos) => {
    const canvas = canvasElementRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(195,195,195,1)';
    ctx.lineWidth = 3;
    ctx.fillStyle = 'rgba(76,76,76,0.5)';
    ctx.fill();
    ctx.stroke();
}
export const generateRangeHSV = (canvasElementRef: MutableRefObject<any>, canvasCursorElementRef: MutableRefObject<any>, cursorXPos: number) => {

    const canvas = canvasElementRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

    gradient.addColorStop(0, "rgb(255, 0, 0)");
    gradient.addColorStop(0.05, "rgb(255, 0, 0)");
    gradient.addColorStop(0.15, "rgb(255, 0, 255)");
    gradient.addColorStop(0.33, "rgb(0, 0, 255)");
    gradient.addColorStop(0.49, "rgb(0, 255, 255)");
    gradient.addColorStop(0.67, "rgb(0, 255, 0)");
    gradient.addColorStop(0.84, "rgb(255, 255, 0)");
    gradient.addColorStop(1, "rgb(255, 0, 0)");
    gradient.addColorStop(0.95, "rgb(255, 0, 0)");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderCursor(canvasCursorElementRef, {x: cursorXPos, y: 10})
};
export const generateHSV = (canvasElementRef: MutableRefObject<any>, canvasCursorElementRef: MutableRefObject<any>, hue: number, cursorPos) => {
    const canvas = canvasElementRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < canvas.height; row++) {
        let percent = (row * 100) / canvas.height;
        let grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
        grad.addColorStop(0, 'hsl(' + hue + ', 0%, ' + (100 - percent) + '%)');
        grad.addColorStop(1, 'hsl(' + hue + ', 100%, ' + (100 - percent) + '%)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, row, canvas.width, 1);
    }
    renderCursor(canvasCursorElementRef, cursorPos)
};
export const generateOpacityCanvas = (canvasElementRef: MutableRefObject<any>, canvasCursorElementRef: MutableRefObject<any>, cursorXPos: number) => {
    const canvas = canvasElementRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);

    gradient.addColorStop(0, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(0.05, "rgba(0, 0, 0, 0)");
    gradient.addColorStop(0.95, "rgb(0, 0, 0, 1)");
    gradient.addColorStop(1, "rgb(0, 0, 0, 1)");

    ctx.fillStyle = gradient;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderCursor(canvasCursorElementRef, {x: cursorXPos, y: 10})
};
