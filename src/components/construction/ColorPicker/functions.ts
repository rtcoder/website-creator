import {Rgb, Rgba} from "@/components/construction/ColorPicker/types";

export const rgb2hex = ([r, g, b]: Rgb | Rgba) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
export const hex2rgb = (hex): Rgb => {
    hex = parseInt(((hex.indexOf("#") > -1) ? hex.substring(1) : hex), 16);
    const r = hex >> 16,
        g = (hex & 0x00FF00) >> 8,
        b = (hex & 0x0000FF);
    return [r, g, b];
}
export const hwb2rgb = (hwb): Rgb => {
    const h = hwb[0] / 360;
    let wh = hwb[1] / 100;
    let bl = hwb[2] / 100;
    const ratio = wh + bl;
    let i;
    let v;
    let f;
    let n;

    // wh + bl cant be > 1
    if (ratio > 1) {
        wh /= ratio;
        bl /= ratio;
    }

    i = Math.floor(6 * h);
    v = 1 - bl;
    f = 6 * h - i;

    if ((i & 0x01) !== 0) {
        f = 1 - f;
    }

    n = wh + f * (v - wh); // linear interpolation

    let r;
    let g;
    let b;
    switch (i) {
        default:
        case 6:
        case 0:
            r = v;
            g = n;
            b = wh;
            break;
        case 1:
            r = n;
            g = v;
            b = wh;
            break;
        case 2:
            r = wh;
            g = v;
            b = n;
            break;
        case 3:
            r = wh;
            g = n;
            b = v;
            break;
        case 4:
            r = n;
            g = wh;
            b = v;
            break;
        case 5:
            r = v;
            g = wh;
            b = n;
            break;
    }

    return [
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255)
    ]
};
export const lch2lab = (lch) => {
    const [l, c, h] = lch;
    const a = Math.cos(h * 0.01745329251) * c
    const b = Math.sin(h * 0.01745329251) * c

    return [l, a, b]
}
export const hsl2rgb = (hsl): Rgb => {
    const [h, s, l] = hsl;
    let r, g, b;

    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = function hue2rgb(p, q, t) {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)] as Rgb;
}
export const hex2hsb = (hex: string) => {
    const hsb = rgb2hsb(hex2rgb(hex));
    if (hsb.s === 0) hsb.h = 360;
    return hsb;
}
export const rgb2hsb = ([r, g, b]: Rgba | Rgb) => {
    const hsb = {
        h: 0,
        s: 0,
        b: 0
    };
    const min = Math.min(r, g, b);
    const max = Math.max(r, g, b);
    const delta = max - min;
    hsb.b = max;
    hsb.s = max !== 0 ? 255 * delta / max : 0;
    if (hsb.s !== 0) {
        if (r === max) {
            hsb.h = (g - b) / delta;
        } else if (g === max) {
            hsb.h = 2 + (b - r) / delta;
        } else {
            hsb.h = 4 + (r - g) / delta;
        }
    } else {
        hsb.h = -1;
    }
    hsb.h *= 60;
    if (hsb.h < 0) {
        hsb.h += 360;
    }
    hsb.s *= 100 / 255;
    hsb.b *= 100 / 255;
    return hsb;
}
export const clamp = (nr: number, min: number, max: number): number => {
    return Math.min(Math.max(nr, min), max);
}
export const getHueFromRgba = ([red, green, blue]: Rgba | Rgb): number => {
    const min = Math.min(red, green, blue);
    const max = Math.max(red, green, blue);

    if (min == max) {
        return 0;
    }

    let hue: number;
    if (max == red) {
        hue = (green - blue) / (max - min);

    } else if (max == green) {
        hue = 2.0 + (blue - red) / (max - min);

    } else {
        hue = 4.0 + (red - green) / (max - min);
    }

    hue = hue * 60;
    if (hue < 0) {
        hue = hue + 360;
    }

    return Math.round(hue);
}
export const lab2rgb = ([l_s, a_s, b_s]: number[]): Rgb => {
    let var_Y = (l_s + 16.) / 116.;
    let var_X = a_s / 500. + var_Y;
    let var_Z = var_Y - b_s / 200.;

    if (Math.pow(var_Y, 3) > 0.008856) {
        var_Y = Math.pow(var_Y, 3);
    } else {
        var_Y = (var_Y - 16. / 116.) / 7.787;
    }
    if (Math.pow(var_X, 3) > 0.008856) {
        var_X = Math.pow(var_X, 3);
    } else {
        var_X = (var_X - 16. / 116.) / 7.787;
    }
    if (Math.pow(var_Z, 3) > 0.008856) {
        var_Z = Math.pow(var_Z, 3);
    } else {
        var_Z = (var_Z - 16. / 116.) / 7.787;
    }

    const X = 95.047 * var_X;    //ref_X =  95.047     Observer= 2°, Illuminant= D65
    const Y = 100.000 * var_Y;   //ref_Y = 100.000
    const Z = 108.883 * var_Z;    //ref_Z = 108.883


    var_X = X / 100.;       //X from 0 to  95.047      (Observer = 2°, Illuminant = D65)
    var_Y = Y / 100.;       //Y from 0 to 100.000
    var_Z = Z / 100.;      //Z from 0 to 108.883

    let var_R = var_X * 3.2406 + var_Y * -1.5372 + var_Z * -0.4986;
    let var_G = var_X * -0.9689 + var_Y * 1.8758 + var_Z * 0.0415;
    let var_B = var_X * 0.0557 + var_Y * -0.2040 + var_Z * 1.0570;

    if (var_R > 0.0031308) {
        var_R = 1.055 * Math.pow(var_R, (1 / 2.4)) - 0.055;
    } else {
        var_R = 12.92 * var_R;
    }
    if (var_G > 0.0031308) {
        var_G = 1.055 * Math.pow(var_G, (1 / 2.4)) - 0.055;
    } else {
        var_G = 12.92 * var_G;
    }
    if (var_B > 0.0031308) {
        var_B = 1.055 * Math.pow(var_B, (1 / 2.4)) - 0.055;
    } else {
        var_B = 12.92 * var_B;
    }

    const R = var_R * 255.;
    const G = var_G * 255.;
    const B = var_B * 255.;

    return [R, G, B]
}
export const colorArrayToString = color => color ? `rgba(${color.join(', ')})` : 'transparent';
export const getPreviewStyle = (color) => ({
    backgroundColor: colorArrayToString(color),
    boxShadow: `0 0 4px 0 ${colorArrayToString(color)}`
})
const getNumberArrayFromStringColor = (color: string, type: string): number[] => {
    return color.trim()
        .replace(`${type}(`, '')
        .replace(/\)$/, '')
        .split(',')
        .map(value => value.trim())
        .map(str => str.replace(/[^\d.]+/gi, ''))
        .map(value => +value);
}
export const any2rgba = (color: string): Rgba => {
    if (color.startsWith('rgba')) {
        return getNumberArrayFromStringColor(color, 'rgba') as Rgba;
    }
    if (color.startsWith('rgb')) {
        const rgb = getNumberArrayFromStringColor(color, 'rgb');
        return [...rgb, 1] as Rgba;
    }
    if (color.startsWith('#')) {
        return [...hex2rgb(color), 1] as Rgba;
    }
    if (color.startsWith('hsl')) {
        const hsl = getNumberArrayFromStringColor(color, 'hsl');
        return [...hsl2rgb(hsl), 1] as Rgba;
    }
    if (color.startsWith('hwb')) {
        const hwb = getNumberArrayFromStringColor(color, 'hwb');
        return [...hwb2rgb(hwb), 1] as Rgba;
    }
    if (color.startsWith('lab')) {
        const lab = getNumberArrayFromStringColor(color, 'lab');
        return [...lab2rgb(lab), 1] as Rgba;
    }
    if (color.startsWith('lch')) {
        const lch = getNumberArrayFromStringColor(color, 'lch');
        return [...lab2rgb(lch2lab(lch)), 1] as Rgba;
    }

    return [0, 0, 0, 1]
}
