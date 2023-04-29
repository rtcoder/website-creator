import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import InputWithUnits from "@/components/construction/InputWithUnits/InputWithUnits";
import {Units} from "@/types/units";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function (props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [fontSize, setFontSize] = useState('');
    const [lineHeight, setLineHeight] = useState('');
    const units: Units[] = ['px', 'pt', 'em', 'rem'];

    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['fontSize', 'lineHeight'],
        ) as any;
        setFontSize(style.fontSize);
        setLineHeight(style.lineHeight);
    }, [selectedBlock, rwd, styleState])

    return (
        <div className={styles.stylesFormRow}>
            <div className={styles.stylesFormField}>
                <InputWithUnits units={units} label="Wielkość czcionki" value={fontSize}
                                onChange={e => props.onChange(e, 'fontSize')}/>
            </div>
            <div className={styles.stylesFormField}>
                <InputWithUnits units={units} label="Wysokość linii" value={lineHeight}
                                onChange={e => props.onChange(e, 'lineHeight')}/>
            </div>
        </div>
    )
}
