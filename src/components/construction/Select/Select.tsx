import styles from './Select.module.scss'
import {ForwardedRef, forwardRef, useEffect, useRef, useState} from "react";
import Option from "@/components/construction/Select/Option/Option";
import {OptionProps, SelectProps} from "@/components/construction/Select/types";
import classNames from "@/helpers/classNames";

const Select = forwardRef(function (props: SelectProps, ref: ForwardedRef<HTMLSelectElement>) {
    const selectRef = useRef(null);
    const listRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);
    const [listStyle, setListStyle] = useState({
        width: '',
        top: '',
        left: ''
    });

    const [selected, setSelected] = useState(
        props.children.flat().find(child => child.props.selected) || props.children[0]
    );
    const clickOption = (option, index) => {
        if (ref) {
            ((ref as any).current as HTMLSelectElement).selectedIndex = index;
        }
        option.props.onClick?.(option.props.value);
        setSelected(option);
        props.onChange?.(option.props.value)
        hide();
    }
    const getChildrenOptions = () => {
        return props.children
            .flat()
            .filter((child) => child?.type.name === Option.name);
    }
    const getOptions = () => {
        return getChildrenOptions()
            .map((opt, index) => {
                const {onClick, value, ...restProps} = opt.props as OptionProps
                return (
                    <Option key={index + value}
                            onClick={e => clickOption(opt, index)}
                            {...restProps}
                            value={value}
                            selected={selected?.props.value === value}/>
                )
            })
    }
    const getPureOptions = () => {
        return getChildrenOptions()
            .map((opt, index) =>
                <option key={opt.props.value + index}
                        value={opt.props.value}/>
            )
    }
    const show = () => {
        if (getOptions().length <= 1) {
            // return
        }
        const element = selectRef.current as HTMLElement;
        const list = listRef.current as HTMLElement;
        const {top, left, height, width} = element.getBoundingClientRect();
        const listHeight = list.getBoundingClientRect().height;
        const marginTop = +document.defaultView.getComputedStyle(element).marginTop.replace(/[^\d.]+/gi, '')
        const topPos = top + height + listHeight > window.innerHeight
            ? top - listHeight + marginTop - (!props.label ? 25 : 0)
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
        const selectedChild = props.children.flat().find(child => child.props.selected);
        if (selectedChild) {
            setSelected(selectedChild)
        }
    }, [props.children])
    return (
        <div className={classNames({
            [styles.selectContainer]: true,
            [styles.open]: isOpen,
            [styles.hasSelected]: !!selected,
            [styles.hasOnlyOneOption]: getOptions().length <= 1,
            [props.className || '']: true
        })} ref={selectRef}>
            <select ref={ref} value={selected?.props.value} onChange={e => null}>
                {getPureOptions()}
            </select>
            <div className={styles.selectedValue} onClick={show}>
                {props.label ? <div className={styles.selectLabel}>{props.label}</div> : ''}
                <div className={styles.valueText}>
                    {selected?.props.children}
                </div>
            </div>
            <div className={styles.overlayContainer} onClick={layerClick}>
                <div className={styles.selectList} style={listStyle} ref={listRef}>
                    {getOptions()}
                </div>
            </div>
        </div>
    )
})
Select.displayName = 'Select';
export default Select
