import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import InputWithUnits from "@/components/construction/InputWithUnits/InputWithUnits";
import {Units} from "@/types/units";
import {Option, Select} from "@/components/construction/Select";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function (props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [fontSize, setFontSize] = useState('');
    const [lineHeight, setLineHeight] = useState('');
    const [fontFamily, setFontFamily] = useState('');
    const [fontWeight, setFontWeight] = useState('');
    const units: Units[] = ['px', 'pt', 'em', 'rem'];

    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['fontSize', 'lineHeight', 'fontFamily', 'fontWeight'],
        ) as any;
        setFontSize(style.fontSize);
        setLineHeight(style.lineHeight);
        setFontFamily(style.fontFamily);
        setFontWeight(style.fontWeight);
    }, [selectedBlock, rwd, styleState])

    return (
        <>
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
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <Select label="Czcionka" onChange={e => props.onChange(e, 'fontFamily')}>
                        <Option value="">Wybierz</Option>
                        <Option value="Arial" selected={fontFamily === 'Arial'}>Arial</Option>
                        <Option value="Tahoma" selected={fontFamily === 'Tahoma'}>Tahoma</Option>
                        <Option value="Verdana" selected={fontFamily === 'Verdana'}>Verdana</Option>
                        <Option value="Times New Roman" selected={fontFamily === 'Times New Roman'}>Times New
                            Roman</Option>
                        <Option value="Roboto" selected={fontFamily === 'Roboto'}>Roboto</Option>
                        <Option value="Lato" selected={fontFamily === 'Lato'}>Lato</Option>
                        <Option value="Ubuntu" selected={fontFamily === 'Ubuntu'}>Ubuntu</Option>
                        <Option value="monospace" selected={fontFamily === 'monospace'}>Monospace</Option>
                        <Option value="Noto Sans" selected={fontFamily === 'Noto Sans'}>Noto Sans</Option>
                    </Select>
                </div>
            </div>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <Select label="Grubość czcionki" onChange={e => props.onChange(e, 'fontWeight')}>
                        <Option value="" selected={!fontWeight}>Wybierz</Option>
                        <Option value="100" selected={fontWeight === '100'}>100</Option>
                        <Option value="200" selected={fontWeight === '200'}>200</Option>
                        <Option value="300" selected={fontWeight === '300'}>300</Option>
                        <Option value="400" selected={fontWeight === '400'}>400</Option>
                        <Option value="500" selected={fontWeight === '500'}>500</Option>
                        <Option value="600" selected={fontWeight === '600'}>600</Option>
                        <Option value="700" selected={fontWeight === '700'}>700</Option>
                        <Option value="800" selected={fontWeight === '800'}>800</Option>
                        <Option value="900" selected={fontWeight === '900'}>900</Option>
                    </Select>
                </div>
            </div>
        </>
    )
}
