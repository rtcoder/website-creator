import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import Spacing from "@/components/Creator/LeftPanel/StylesPanel/Text/Spacing/Spacing";
import TextAlign from "@/components/Creator/LeftPanel/StylesPanel/Text/TextAlign/TextAlign";
import TextStyle from "@/components/Creator/LeftPanel/StylesPanel/Text/TextStyle/TextStyle";
import TextTransform from "@/components/Creator/LeftPanel/StylesPanel/Text/TextTransform/TextTransform";
import Font from "@/components/Creator/LeftPanel/StylesPanel/Text/Font/Font";
import ColorPicker from "@/components/construction/ColorPicker/ColorPicker";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function (props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [color, setColor] = useState('');
    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['color'],
        ) as any;
        setColor(style.color || '');
    }, [selectedBlock, rwd, styleState])
    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                Kolor
                <div className={styles.stylesFormField}>
                    <ColorPicker value={color} onChange={e => props.onChange(e, 'color')}/>
                </div>
            </div>
            <TextAlign onChange={props.onChange}/>
            <TextStyle onChange={props.onChange}/>
            <Font onChange={props.onChange}/>

            <Spacing onChange={props.onChange}/>

            <TextTransform onChange={props.onChange}/>
        </div>
    )
}
