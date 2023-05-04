export type Rgb = [red: number, green: number, blue: number];
export type Rgba =  [...Rgb, number];
export type MousePos = { x: number, y: number };
export type ColorPickerProps = {
    value: string;
    defaultValue?: string;
    onChange: (value: string) => void;
}

export type ColorPickerHistoryProps = {
    color: Rgba;
    onClickColor: (value: Rgba) => void;
}

export type ColorPickerRgbaValuesProps = {
    color: Rgba;
}

export type CanvasProps = {
    onChange: (value: string) => void;
}


export type MainCanvasProps = CanvasProps & {
    hue:number;
    opacity:number;
}
