import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import InputWithUnits from "@/components/construction/InputWithUnits/InputWithUnits";
import ColorPicker from "@/components/construction/ColorPicker/ColorPicker";
import {useState} from "react";

type ValueType = [x: number, y: number, blur: number, color: string];

interface Props {
    value: ValueType;
    onChange: (value: ValueType) => void;

}

export default function (props: Props) {
const [value,setValue] =useState(props.value);
    const onChange = (v, index) => {
        const val = value;
        val[index] = v;
        setValue(val)
        props.onChange(val);
    }

    return (
        <div className={styles.stylesFormColumn}>
            <div className={styles.stylesFormField}>
                <InputWithUnits units={['px']} value={value[0]} max={20} min={-20} type="number"
                                label="Przesunięcie w osi X" onChange={e => onChange(e, 0)}/>
                <InputWithUnits units={['px']} value={value[1]} max={20} min={-20} type="number"
                                label="Przesunięcie w osi Y" onChange={e => onChange(e, 1)}/>
            </div>
            <div className={styles.stylesFormField}>
                <InputWithUnits units={['px']} value={value[2]} max={20} min={0} type="number" label="Rozmycie"
                                onChange={e => onChange(e, 2)}/>
                <ColorPicker value={value[3]} onChange={e => onChange(e, 3)}/>
            </div>
        </div>
    )

}
