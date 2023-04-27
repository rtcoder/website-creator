
export const getMousePosOnElement = (e: MouseEvent) => {
    const {clientX, clientY, target} = e;
    const {left, top} = (target as HTMLCanvasElement).getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    return {x, y};
}
