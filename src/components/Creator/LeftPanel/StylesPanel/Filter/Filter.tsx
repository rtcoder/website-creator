import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import filterStyles from './Filter.module.scss'
import {Option, Select} from "@/components/construction/Select";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import {Units} from "@/types/units";
import FilterSingle from "@/components/Creator/LeftPanel/StylesPanel/Filter/FilterSingle/FilterSingle";
import FilterDropShadow from "@/components/Creator/LeftPanel/StylesPanel/Filter/FilterDropShadow/FilterDropShadow";
import classNames from "@/helpers/classNames";
import Icon from "@/components/construction/Icon/Icon";

interface Props {
    onChange: (value: string | null, property: string) => void
}

type SelectedFilter = [id: string, value: any];
const filterDefaultUnits: [name: string, unit: Units][] = [
    ['blur', 'px'],
    ['brightness', '%'],
    ['contrast', '%'],
    ['grayscale', '%'],
    ['hue-rotate', 'deg'],
    ['invert', '%'],
    ['opacity', '%'],
    ['saturate', '%'],
    ['sepia', '%'],
];
const allFiltersNames: [id: string, name: string][] = [
    ['blur', 'Rozmycie'],
    ['brightness', 'Jasność'],
    ['contrast', 'Kontrast'],
    ['drop-shadow', 'Cień'],
    ['grayscale', 'Skala szarości'],
    ['hue-rotate', 'Obracanie odcienia'],
    ['invert', 'Odwrócenie kolorów'],
    ['opacity', 'Nieprzezroczystość'],
    ['saturate', 'Saturacja'],
    ['sepia', 'Sepia'],
];
const filtersDefaultValues: [id: string, value: any][] = [
    ['blur', 0],
    ['brightness', 100],
    ['contrast', 100],
    ['drop-shadow', ['0px', '0px', '0px', '#000']],
    ['grayscale', 0],
    ['hue-rotate', 0],
    ['invert', 0],
    ['opacity', 100],
    ['saturate', 0],
    ['sepia', 0],
];
export default function Filter(props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [filter, seFilter] = useState('');
    const [selectedFilters, setSelectedFilters] = useState<SelectedFilter[]>([]);

    const changed = value => {
        value = addFilterUnits(value);
        props.onChange(
            value.map(([id, value]: SelectedFilter) => `${id}(${value})`).join(' '),
            'filter'
        )
    }
    const addFilterUnits = value => {
        return [...value].map(([id, val]) => {
            if (id === 'drop-shadow') {
                return [id, val.map((v, index) => {
                    if (index === 3) {
                        return v;
                    }
                    return `${parseInt(v)}px`
                }).join(' ')]
            }
            const [, unit] = filterDefaultUnits.find(([f_id, _unit]) => f_id === id)!
            return [id, `${val}${unit}`]
        });
    }
    const mapFiltersToArray = (value: string): SelectedFilter[] => {
        const filtersArr = value.match(/[\w-]+\([\w.,%\s]+[\(]{1}[\w.,%\s]+[\)]{1}\)|[\w-]+\([\w.,%\s\#]+\)/gm) ?? [];
        const getFilterVal = name => filtersArr.find(filterName => filterName.startsWith(name))
            .trim().replace(`${name}(`, '').replace(/\)$/, '');
        const filters: SelectedFilter[] = [];

        filtersArr.forEach(filter => {
            const [name] = filter.split('(');

            if (name.includes('drop-shadow')) {
                const dropShadow = getFilterVal('drop-shadow');
                const [hShadow, vShadow, blur, color] = dropShadow.match(/\S+\([\d\s,\.]+\)|[\w\#]+/gm);
                filters.push([name, [parseInt(hShadow), parseInt(vShadow), parseInt(blur), color]]);
            } else {
                filters.push([name, parseInt(getFilterVal(name))]);
            }
        });

        return filters;
    }

    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['filter'],
        ) as any;
        seFilter(style.filter || '');
        setSelectedFilters(mapFiltersToArray(style.filter || ''));
    }, [selectedBlock, rwd, styleState])

    const addFilter = (filterId: string) => {
        if (!filterId) {
            return;
        }
        const [, defaultValue] = filtersDefaultValues.find(([id, _]) => id === filterId);
        const newFilter: SelectedFilter = [filterId, defaultValue];
        setSelectedFilters([...selectedFilters, newFilter]);
        changed([...selectedFilters, newFilter]);
    }
    const removeFilter = index => {
        selectedFilters.splice(index, 1);
        setSelectedFilters([...selectedFilters]);
        changed([...selectedFilters]);
    }
    const getFiltersList = () => {
        return selectedFilters.map(([id, val], index) => {
                return <div className={classNames([styles.stylesFormRow, filterStyles.singleFilter])} key={id}>
                    {id === 'drop-shadow'
                        ? <FilterDropShadow value={val} onChange={e => changedFilter(id, e)}/>
                        : <FilterSingle filterId={id} value={+val} onChange={e => changedFilter(id, e)}/>
                    }
                    <Icon type="material" name="close" onClick={e => removeFilter(index)} className={filterStyles.icon}/>
                </div>
            }
        )
    }
    const isFilterChosen = (id: string): boolean => {
        return selectedFilters.some(([filterId, _]) => id === filterId)
    }

    const changedFilter = (id: string, val: any) => {
        const index = selectedFilters.findIndex(([filterId, _]) => id === filterId)
        selectedFilters[index] = [id, val];
        setSelectedFilters([...selectedFilters]);
        changed([...selectedFilters]);
    }

    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                <Select onChange={addFilter} label="Dodaj filtr">
                    <Option value="" selected={true}>Wybierz</Option>
                    {allFiltersNames.map(([id, name]) =>
                        <Option key={id} value={id} disabled={isFilterChosen(id)}>{name}</Option>
                    )}
                </Select>
            </div>

            {getFiltersList()}

        </div>
    )
}
