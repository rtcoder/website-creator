import styles from './ButtonToggleGroup.module.scss'
import {useEffect, useState} from "react";
import classNames from "@/helpers/classNames";
import ButtonToggle from "@/components/construction/ButtonToggleGroup/ButtonToggle/ButtonToggle";

type ValueType = string | number;
type Value = ValueType[] | ValueType;
type ValuesArr = ValueType[];

interface Props {
    className?: string;
    children: any;
    value: Value;
    multi?: boolean;
    required?: boolean;
    onChange?: (value: Value | null) => void;
}

export default function ButtonToggleGroup(props: Props) {
    const classes = classNames({
        [styles.buttonToggleGroup]: true,
        [props.className || '']: true,
    });
    const isMultiple = () => !!props.multi;
    const getChildrenButtons = () => {
        return props.children
            .flat()
            .filter((child) => child?.type.name === ButtonToggle.name);
    }
    const getPropsValue = (): Value[] | undefined => {
        if (props.value === undefined) {
            return undefined;
        }
        if (!isMultiple()) {
            return [props.value] as Value[]
        }
        return Array.isArray(props.value)
            ? props.value
            : [props.value]
    }
    const getSelectedValuesFromChildren = (): ValuesArr => {
        const children = getChildrenButtons();
        const values = getPropsValue();

        const filterFn = values !== undefined && values !== null
            ? child => values!.includes(child.props.value)
            : child => child.props.active;

        const selectedChildren = children
            .filter(filterFn)
            .map(child => child.props.value);

        return isMultiple()
            ? selectedChildren
            : selectedChildren.length ? [selectedChildren[0]] : [];
    }
    const [selected, setSelected] = useState<ValuesArr>(
        getSelectedValuesFromChildren()
    );
    const handleClick = el => {
        const value = el.props.value;
        if (selectedHasValue(value)) {
            selected.splice(
                findValueIndexInSelected(value),
                1
            );
        } else {
            if (isMultiple()) {
                selected.push(value);
            } else {
                selected.length = 0;
                selected.push(value);
            }
        }
        if (props.required && !selected.length) {
            selected.push(value);
        }
        el.props.onClick?.();
        setSelected([...selected]);
        if (isMultiple()) {
            props.onChange?.(selected);
        } else {
            selected.length ? props.onChange?.(selected[0]) : props.onChange?.(null)
        }
    }
    const selectedHasValue = (value): boolean => {
        return selected.some(val => val === value)
    }
    const findValueIndexInSelected = (value): number => {
        return selected.findIndex(val => val === value)
    }
    const getOptions = () => {
        return getChildrenButtons()
            .map((el, index) => {
                const {className, children, ...rest} = el.props
                return (
                    <ButtonToggle key={el.props.value + index}
                                  onClick={() => handleClick(el)}
                                  {...rest}
                                  className={classNames([styles.buttonToggle, className])}
                                  active={selectedHasValue(el.props.value)}>{children}</ButtonToggle>
                )
            })
    }
    useEffect(() => {
        setSelected(
            getSelectedValuesFromChildren()
        )
    }, [props.value])
    return (
        <div className={classes}>
            {getOptions()}
        </div>
    )
}
