import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {Option, Select} from "@/components/construction/Select";
import {useEffect, useRef, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";

interface Props {
    onChange: (value: string | null, property: string) => void
}

export default function (props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [objectPosition,setObjectPosition] = useState('');
    const [objectFit,setObjectFit] = useState('');
    const objPosXRef=useRef(null);
    const objPosYRef=useRef(null);
    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['objectFit', 'objectPosition'],
        ) as any;
        setObjectPosition(style.objectPosition);
        setObjectFit(style.objectFit);
    }, [selectedBlock, rwd, styleState])
    const changeObjectFit = (value: any | null) => {
        props.onChange(value, 'objectFit');
    }
    const changeObjectPosition = (value: any | null) => {
        props.onChange(value, 'objectPosition');
    }
    const changeObjectPositionX = (value: any | null) => {
        changeObjectPosition(`${value} ${objPosYRef.current.value}`)
    }
    const changeObjectPositionY = (value: any | null) => {
        changeObjectPosition(`${objPosXRef.current.value} ${value}`)
    }
    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <Select label="Rozmiar" onChange={changeObjectFit}>
                        <Option value="fill" selected={objectFit === 'fill'}>Automatyczny</Option>
                        <Option value="contain" selected={objectFit === 'contain'}>Dopasuj</Option>
                        <Option value="cover" selected={objectFit === 'cover'}>Wypełnij</Option>
                        <Option value="scale-down" selected={objectFit === 'scale-down'}>Skaluj w dół</Option>
                    </Select>
                </div>
            </div>
            <div className={styles.stylesFormRow}>
                <div className={styles.stylesFormField}>
                    <Select label="Wyrównanie w osi X" onChange={changeObjectPositionX} ref={objPosXRef}>
                        <Option value="left" selected={objectFit === 'left'}>Do lewej</Option>
                        <Option value="center" selected={objectFit === 'center'}>Do środka</Option>
                        <Option value="right" selected={objectFit === 'right'}>Do prawej</Option>
                    </Select>
                </div>
                <div className={styles.stylesFormField}>
                    <Select label="Wyrównanie w osi Y" onChange={changeObjectPositionY} ref={objPosYRef}>
                        <Option value="top" selected={objectFit === 'top'}>Do góry</Option>
                        <Option value="center" selected={objectFit === 'center'}>Do środka</Option>
                        <Option value="bottom" selected={objectFit === 'bottom'}>Do dołu</Option>
                    </Select>
                </div>
            </div>
        </div>
    )
}
