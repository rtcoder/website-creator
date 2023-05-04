import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import InputWithUnits from "@/components/construction/InputWithUnits/InputWithUnits";
import {Units} from "@/types/units";
import {useState} from "react";
import {Option, Select} from "@/components/construction/Select";

type ValueType = [name: string, duration: string, delay: string, direction: string, iteration: string];

interface Props {
    label: string;
    name: string;
    duration: string;
    delay: string;
    direction: string;
    iteration: string;
    onChange: (value: ValueType) => void
}

export default function SingleAnimation(props: Props) {
    const [duration, setDuration] = useState<string>(props.duration)
    const [delay, setDelay] = useState<string>(props.delay)
    const [direction, setDirection] = useState<string>(props.direction)
    const [iteration, setIteration] = useState<string>(props.iteration)
    const timeUnits: Units[] = ['s', 'ms'];

    const changeDuration = (val: string) => {
        setDuration(val);
        props.onChange([props.name, val, delay, direction, iteration])
    }
    const changeDelay = (val: string) => {
        setDelay(val);
        props.onChange([props.name, duration, val, direction, iteration])
    }
    const changeDirection = (val: string) => {
        setDirection(val);
        props.onChange([props.name, duration, delay, val, iteration])
    }
    const changeIteration = (val: string) => {
        setIteration(val);
        props.onChange([props.name, duration, delay, direction, val])
    }
    return (
        <div className={styles.stylesFormColumn}>
            {props.label}
            {props.name !== 'none'
                ? <>
                    <div className={styles.stylesFormRow}>
                        <div className={styles.stylesFormField}>
                            <InputWithUnits units={timeUnits} label="Czas trwania" value={duration}
                                            onChange={changeDuration}
                                            min={0}/>
                        </div>
                        <div className={styles.stylesFormField}>
                            <InputWithUnits units={timeUnits} label="Opóźnienie startu" value={delay}
                                            onChange={changeDelay}
                                            min={0}/>
                        </div>
                    </div>
                    <div className={styles.stylesFormRow}>
                        <div className={styles.stylesFormField}>
                            <Select label="Liczba iteracji" onChange={changeIteration}>
                                <Option value="infinite" selected={iteration === 'infinite'}>Nieskończona</Option>
                                <Option value="1" selected={iteration === '1'}>1</Option>
                                <Option value="2" selected={iteration === '2'}>2</Option>
                                <Option value="3" selected={iteration === '3'}>3</Option>
                                <Option value="4" selected={iteration === '4'}>4</Option>
                                <Option value="5" selected={iteration === '5'}>5</Option>
                            </Select>
                        </div>
                        <div className={styles.stylesFormField}>
                            <label htmlFor="animation-direction"></label>
                            <Select label="Kierunek animacji" onChange={changeDirection}>
                                <Option value="normal" selected={direction === 'normal'}>Do przodu</Option>
                                <Option value="reverse" selected={direction === 'reverse'}>Do tyłu</Option>
                                <Option value="alternate" selected={direction === 'alternate'}>Do przodu i do
                                    tyłu</Option>
                                <Option value="alternate-reverse" selected={direction === 'alternate-reverse'}>Do tyłu i
                                    do przodu</Option>
                            </Select>
                        </div>
                    </div>
                </> : ''}
        </div>
    )
}
