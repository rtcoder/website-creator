import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {Option, Select} from "@/components/construction/Select";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import Spacing from "@/components/Creator/LeftPanel/StylesPanel/Text/Spacing/Spacing";
import TextAlign from "@/components/Creator/LeftPanel/StylesPanel/Text/TextAlign/TextAlign";
import TextStyle from "@/components/Creator/LeftPanel/StylesPanel/Text/TextStyle/TextStyle";
import TextTransform from "@/components/Creator/LeftPanel/StylesPanel/Text/TextTransform/TextTransform";
import FontSize from "@/components/Creator/LeftPanel/StylesPanel/Text/FontSize/FontSize";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function (props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [color, setColor] = useState('');
    const [fontWeight, setFontWeight] = useState('');
    const [fontFamily, setFontFamily] = useState('');
    const [whiteSpace, setWhiteSpace] = useState('');
    const [textDecorationLine, setTextDecorationLine] = useState('');
    const [textDecorationStyle, setTextDecorationStyle] = useState('');
    const [textDecorationColor, setTextDecorationColor] = useState('');
    const [textDecorationThickness, setTextDecorationThickness] = useState('');
    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            [ 'color', 'fontWeight','fontFamily',   'whiteSpace',
                'textDecorationLine', 'textDecorationStyle', 'textDecorationColor', 'textDecorationThickness',],
        ) as any;
        setColor(style.color);
        setFontWeight(style.fontWeight);
        setFontFamily(style.fontFamily);
        setWhiteSpace(style.whiteSpace);
        setTextDecorationLine(style.textDecorationLine);
        setTextDecorationStyle(style.textDecorationStyle);
        setTextDecorationColor(style.textDecorationColor);
        setTextDecorationThickness(style.textDecorationThickness);
    }, [selectedBlock, rwd, styleState])
    return (
        <div className={styles.stylesFormGroup}>
            <TextAlign onChange={props.onChange}/>
            <TextStyle onChange={props.onChange}/>
            <FontSize onChange={props.onChange}/>
            <Spacing onChange={props.onChange}/>

            <TextTransform onChange={props.onChange}/>
        </div>
    )
}
