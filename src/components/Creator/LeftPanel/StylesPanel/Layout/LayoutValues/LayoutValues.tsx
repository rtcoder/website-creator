import {useSelector} from "react-redux";
import styles from "../../StylesPanel.module.scss"
import layoutCss from "../Layout.module.scss"
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {CSSProperties, useEffect, useState} from "react";
import classNames from "@/helpers/classNames";
import {getAlphabetArray} from "@/helpers/string-helpers";
import flexDirection from "@/components/Creator/LeftPanel/StylesPanel/Layout/Flex/FlexDirection/FlexDirection";

type CssProperty = keyof CSSProperties;

interface Props {
    onChange: (value: string, property: string) => void;
    availableValues: string[];
    propName: CssProperty;
    label: string;
    subItemsCount: number;
}

export default function LayoutValues(props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const values = props.availableValues;
    const [value, setVal] = useState('');
    const [singleItemStyle, setSingleItemStyle] = useState({});

    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            [props.propName, 'justifyContent', 'flexDirection', 'alignItems', 'flexWrap'],
        ) as any;
        setSingleItemStyle(style)
        setVal(style[props.propName]);
    }, [selectedBlock, rwd, styleState])
    const getClassNames = val => classNames({
        [layoutCss.item]: true,
        [layoutCss.active]: value === val
    });
    const getItemStyle = (val): CSSProperties => ({
        ...singleItemStyle,
        [props.propName]: val
    });
    return (
        <div className={styles.stylesFormGroup}>
            <div className={layoutCss.title}>{props.label}</div>
            <div className={classNames([styles.stylesFormRow, layoutCss.elements])}>

                {values.map(v =>
                    <div key={v} className={getClassNames(v)}
                         onClick={e => props.onChange(v, props.propName)}
                         style={getItemStyle(v)}>

                        {getAlphabetArray(props.subItemsCount).map(v => <div key={v}>{v}</div>)}
                    </div>
                )}
            </div>
        </div>
    )
}
