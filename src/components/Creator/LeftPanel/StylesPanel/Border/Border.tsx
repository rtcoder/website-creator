import {useSelector} from "react-redux";
import styles from "../StylesPanel.module.scss"
import borderStyles from "./Border.module.scss"
import InputWithUnits from "@/components/construction/InputWithUnits/InputWithUnits";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {Units} from "@/types/units";
import {useEffect, useState} from "react";
import classNames from "@/helpers/classNames";
import BorderStyle from "@/components/Creator/LeftPanel/StylesPanel/Border/BorderStyle/BorderStyle";
import ColorPicker from "@/components/construction/ColorPicker/ColorPicker";

interface Props {
    onChange: (value: string, property: string) => void
}

export default function (props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [selectedSide, setSelectedSide] = useState('Top');

    const [border, setBorder] = useState({
        borderTopWidth: '',
        borderTopStyle: '',
        borderTopColor: '',
        borderLeftWidth: '',
        borderLeftStyle: '',
        borderLeftColor: '',
        borderBottomWidth: '',
        borderBottomStyle: '',
        borderBottomColor: '',
        borderRightWidth: '',
        borderRightStyle: '',
        borderRightColor: '',
    })

    const sideNames = {
        'Top': 'Góra',
        'Bottom': 'Dół',
        'Left': 'Lewo',
        'Right': 'Prawo',
        'All': 'Ramka',
    }

    const borderUnits: Units[] = ['px', 'pt', '%', 'em', 'rem'];

    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['borderTopWidth', 'borderTopStyle', 'borderTopColor',
                'borderLeftWidth', 'borderLeftStyle', 'borderLeftColor',
                'borderBottomWidth', 'borderBottomStyle', 'borderBottomColor',
                'borderRightWidth', 'borderRightStyle', 'borderRightColor']
        ) as any;
        setBorder({
            borderTopWidth: style.borderTopWidth,
            borderTopStyle: style.borderTopStyle,
            borderTopColor: style.borderTopColor,
            borderLeftWidth: style.borderLeftWidth,
            borderLeftStyle: style.borderLeftStyle,
            borderLeftColor: style.borderLeftColor,
            borderBottomWidth: style.borderBottomWidth,
            borderBottomStyle: style.borderBottomStyle,
            borderBottomColor: style.borderBottomColor,
            borderRightWidth: style.borderRightWidth,
            borderRightStyle: style.borderRightStyle,
            borderRightColor: style.borderRightColor,
        })
    }, [selectedBlock, rwd, styleState])
    const getSelectorSideClasses = side => classNames({
        [borderStyles[side.toLowerCase()]]: true,
        [borderStyles.selected]: selectedSide === side || selectedSide === 'All'
    })
    const getPropName = (side, type) => side === 'All' ? `borderLeft${type}` : `border${side}${type}`;
    const getProp = (side, type) => border[getPropName(side, type)];

    const change = (side, type, value) => {
        if (side === 'All') {
            ['Top', 'Bottom', 'Left', 'Right'].forEach(_side => {
                border[getPropName(_side, type)] = value;
                props.onChange(value, getPropName(_side, type))
            })
            setBorder(border);
            return;
        }
        border[getPropName(side, type)] = value;
        props.onChange(value, getPropName(side, type))
        setBorder(border);
    }
    return (
        <div className={styles.stylesFormGroup}>
            <div className={borderStyles.borderSelector}>
                <div className={borderStyles.selector}>
                    {Object.keys(sideNames).map(side =>
                        <div key={side} className={getSelectorSideClasses(side)}
                             onClick={_ => setSelectedSide(side)}></div>
                    )}
                </div>
            </div>

            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <InputWithUnits units={borderUnits} label={sideNames[selectedSide]}
                                    value={getProp(selectedSide, 'Width')}
                                    onChange={e => change(selectedSide, 'Width', e)}/>
                </div>
                <div className={styles.stylesFormField}>
                    <BorderStyle value={getProp(selectedSide, 'Style')}
                                 onChange={e => change(selectedSide, 'Style', e)}/>
                </div>
                <div className={styles.stylesFormField}
                     style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', width:'30px'}}>
                    <ColorPicker value={getProp(selectedSide, 'Color')}
                                 onChange={e => change(selectedSide, 'Color', e)}/>
                </div>
            </div>
        </div>
    )
}
