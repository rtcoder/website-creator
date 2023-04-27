import styles from './Select.module.scss'
import {forwardRef, useEffect, useRef, useState} from "react";
import Option from "@/components/construction/Select/Option/Option";
import {OptionProps, SelectProps} from "@/components/construction/Select/types";
import {makeId} from "@/helpers/string-helpers";
import classNames from "@/helpers/classNames";

export const Select = forwardRef(function (props: SelectProps, ref) {
    const selectRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [listStyle, setListStyle] = useState({
        width: '',
        top: '',
        left: ''
    });

    const [selected, setSelected] = useState(
        props.children.flat().find(child => child.props.selected)
    );
    const clickOption = option => {
        option.props.onClick?.(option.props.value);
        setSelected(option);
        props.onChange?.(option.props.value)
        hide();
    }
    const getChildrenOptions = () => {
        return props.children
            .flat()
            .filter((child) => child?.type.name === 'Option');
    }
    const getOptions = () => {
        return getChildrenOptions()
            .map((opt, index) => {
                const {onClick, value, ...restProps} = opt.props as OptionProps
                return (
                    <Option key={makeId(3)}
                            onClick={e => clickOption(opt)}
                            {...restProps}
                            value={value}
                            selected={selected?.props.value === value}/>
                )
            })
    }
    const getPureOptions = () => {
        return getChildrenOptions()
            .map((opt, index) =>
                <option key={makeId(3)}
                        value={opt.props.value}>{opt.props.children}</option>
            )
    }
    const show = () => {
        const {top, left, height, width} = (selectRef.current as HTMLElement).getBoundingClientRect();
        const listHeight = 250;
        const topPos = top + height + listHeight > window.innerHeight
            ? top - listHeight
            : top + height;

        setListStyle({
            width: `${width}px`,
            left: `${left}px`,
            top: `${topPos}px`
        });
        setIsOpen(true);
    }
    const hide = () => {
        setIsOpen(false);
    }
    const layerClick = e => {
        if (e.target.classList.contains(styles.overlayContainer)) {
            hide();
        }
    }
    useEffect(() => {
        setSelected(
            props.children.flat().find(child => child.props.selected)
        )
    }, [props.children])
    return (
        <div className={classNames({
            [styles.selectContainer]: true,
            [styles.open]: isOpen,
            [styles.hasSelected]: !!selected,
            [props.className || '']: true
        })} ref={selectRef}>
            <select ref={ref} value={selected?.props.value}>
                {getPureOptions()}
            </select>
            <div className={styles.selectedValue} onClick={show}>
                <div className={styles.selectLabel}>{props.label}</div>
                {selected?.props.children}
            </div>
            <div className={styles.overlayContainer} onClick={layerClick}>
                <div className={styles.selectList} style={listStyle}>
                    {getOptions()}
                </div>
            </div>
        </div>
    )
})
