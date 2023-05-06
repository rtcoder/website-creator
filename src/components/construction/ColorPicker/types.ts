export type Rgb = [red: number, green: number, blue: number];
export type Rgba = [...Rgb, number];
export type MousePos = { x: number, y: number };
export type ColorPickerProps = {
    value: string;
    defaultValue?: string;
    onChange: (value: string) => void;
}
export type CanvasOpacityProps = {
    color: Rgba;
    onChange: (opacity: number) => void;
}
export type CanvasHueSelectProps = {
    color: Rgba | Rgb;
    onChange: (hue: number) => void;
}
export type MainCanvasProps = {
    color: Rgba | Rgb;
    hue: number;
    onChange: (value: Rgb) => void;
}

export type ColorPickerHistoryProps = {
    color: Rgba;
    onClickColor: (value: Rgba) => void;
}

export type ColorPickerRgbaValuesProps = {
    color: Rgba;
}

