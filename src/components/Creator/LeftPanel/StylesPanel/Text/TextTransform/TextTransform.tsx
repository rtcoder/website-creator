import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import {Option, Select} from "@/components/construction/Select";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function TextTransform(props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [textTransform, setTextTransform] = useState('');
    const [fontVariant, setFontVariant] = useState('');

    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['textTransform', 'fontVariant'],
        ) as any;
        setTextTransform(style.textTransform);
        setFontVariant(style.fontVariant);
    }, [selectedBlock, rwd, styleState]);
    const changedTransform = val => {
        setTextTransform(val)
        props.onChange(val, 'textTransform')
    }
    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <Select label="Transformacja tekstu" onChange={changedTransform}>
                        <Option value={''} selected={textTransform === ''}>Wybierz</Option>
                        <Option value="uppercase" selected={textTransform === 'uppercase'}>Duże litery</Option>
                        <Option value="lowercase" selected={textTransform === 'lowercase'}>Małe litery</Option>
                        <Option value="capitalize" selected={textTransform === 'capitalize'}>Duże pierwsze
                            litery</Option>
                    </Select>
                </div>
                <div className={styles.stylesFormField}>
                    <Select label="Wariant czcionki" onChange={e => props.onChange(e, 'fontVariant')}>
                        <Option value="normal" selected={fontVariant === 'normal'}>Normalny</Option>
                        <Option value="small-caps" selected={fontVariant === 'small-caps'}>Małe kapitaliki</Option>
                    </Select>
                </div>
            </div>
        </div>
    )
}
