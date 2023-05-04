import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import ButtonToggleGroup from "@/components/construction/ButtonToggleGroup/ButtonToggleGroup";
import ButtonToggle from "@/components/construction/ButtonToggleGroup/ButtonToggle/ButtonToggle";
import Icon from "@/components/construction/Icon/Icon";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function TextAlign(props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [textAlign, setTextAlign] = useState('');
    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['textAlign'],
        ) as any;
        setTextAlign(style.textAlign);
    }, [selectedBlock, rwd, styleState])
    const change = value => {
        props.onChange(value, 'textAlign');
    }
    return (
        <div className={styles.stylesFormRow}>
            <ButtonToggleGroup onChange={change} value={textAlign}>
                <ButtonToggle value="left">
                    <Icon type="material" name="format_align_left"/>
                </ButtonToggle>
                <ButtonToggle value="center">
                    <Icon type="material" name="format_align_center"/>
                </ButtonToggle>
                <ButtonToggle value="right">
                    <Icon type="material" name="format_align_right"/>
                </ButtonToggle>
                <ButtonToggle value="justify">
                    <Icon type="material" name="format_align_justify"/>
                </ButtonToggle>
            </ButtonToggleGroup>
        </div>
    )
}
