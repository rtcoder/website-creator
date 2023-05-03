import {Units} from "@/types/units";
import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import Slider from "@/components/construction/Slider/Slider";
import {useEffect, useState} from "react";

interface Props {
    value: number;
    filterId: string;
    onChange: (value: number) => void;
}

type FilterDefaults = [id: string, name: string, unit: Units, min: number, max: number];
export default function (props: Props) {
    const [filterDefaults, setFilterDefaults] = useState<{ min: number, max: number }>(null);
    const [label, setLabel] = useState<string>(null);
    const [unit, setUnit] = useState<Units>(null);
    const displayValFn = val => `${val}${unit}`;

    const filters: FilterDefaults[] = [
        ['blur', 'Rozmycie', 'px', 0, 100],
        ['brightness', 'Jasność', '%', 0, 200],
        ['contrast', 'Kontrast', '%', 0, 200],
        ['grayscale', 'Skala szarości', '%', 0, 100],
        ['hue-rotate', 'Obracanie odcienia', 'deg', 0, 360],
        ['invert', 'Odwrócenie kolorów', '%', 0, 100],
        ['opacity', 'Nieprzezroczystość', '%', 0, 100],
        ['saturate', 'Saturacja', '%', 0, 100],
        ['sepia', 'Sepia', '%', 0, 100],
    ];

    const getSingleFilterDefaults = (filterId: string): FilterDefaults => {
        return filters.find(([id, ..._]) => id === filterId)
    }

    useEffect(() => {
        const [, _name, _unit, min, max] = getSingleFilterDefaults(props.filterId);
        setLabel(_name);
        setUnit(_unit);
        setFilterDefaults({min, max});
    }, [props.filterId])

    return (
        <div className={styles.stylesFormField}>
            {filterDefaults ? <Slider label={label}
                                      displayValueFn={displayValFn}
                                      min={filterDefaults?.min}
                                      max={filterDefaults?.max}
                                      onChange={props.onChange}
                                      value={props.value}/> : ''}
        </div>
    )

}
