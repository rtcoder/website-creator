import styles from "@/components/Creator/LeftPanel/StylesPanel/StylesPanel.module.scss";
import {Option, Select} from "@/components/construction/Select";
import {useEffect, useState} from "react";
import {getInheritedStyleWith} from "@/helpers/block-styles";
import {useSelector} from "react-redux";
import Icon from "@/components/construction/Icon/Icon";
import SingleAnimation from "@/components/Creator/LeftPanel/StylesPanel/Animations/SingleAnimation/SingleAnimation";

type ChangeValue = {
    animations: string[];
    durations: string[];
    delays: string[];
    directions: string[];
    iterations: string[];
}

interface Props {
    onChange: (value: string | null, property: string) => void
}

const allAnimationsNames: [id: string, name: string][] = [
    ['none', 'Brak'],
    ['beat', 'Pulsowanie'],
    ['beat-fade', 'Pulsowanie z wygaszaniem'],
    ['bounce', 'Podskok'],
    ['fade', 'Wygaszanie'],
    ['flip', 'Odwracanie'],
    ['shake', 'Potrząsanie'],
    ['spin', 'Obrót'],
];
export default function Animations(props: Props) {
    const selectedBlock = useSelector((state: any) => state.structure.selectedBlock);
    const rwd = useSelector((state: any) => state.structure.rwdMode);
    const styleState = useSelector((state: any) => state.structure.styleState);
    const [animations, setAnimations] = useState<string[]>([]);
    const [durations, setDurations] = useState<string[]>([]);
    const [delays, setDelays] = useState<string[]>([]);
    const [directions, setDirections] = useState<string[]>([]);
    const [iterations, setIterations] = useState<string[]>([]);

    const changed = (value: ChangeValue) => {
        setIterations([...value.iterations]);
        setDirections([...value.directions]);
        setDelays([...value.delays]);
        setDurations([...value.durations]);
        setAnimations([...value.animations]);
        console.log({value})
        if (value.animations.includes('none')) {
            props.onChange('', 'animationIterationCount');
            props.onChange('', 'animationDirection');
            props.onChange('', 'animationDelay');
            props.onChange('', 'animationDuration');
            props.onChange('none', 'animationName');
            return;
        }
        props.onChange(value.iterations.join(', '), 'animationIterationCount');
        props.onChange(value.directions.join(', '), 'animationDirection');
        props.onChange(value.delays.join(', '), 'animationDelay');
        props.onChange(value.durations.join(', '), 'animationDuration');
        props.onChange(value.animations.join(', '), 'animationName');
    }
    const splitValue = value => (value || '').split(',').map(val => val.trim()).filter(val => val.length > 0);
    useEffect(() => {
        const style = getInheritedStyleWith(
            selectedBlock.styles,
            rwd, styleState,
            ['animationName', 'animationDuration', 'animationDelay', 'animationDirection', 'animationIterationCount'],
        ) as any;
        setIterations(splitValue(style.animationIterationCount));
        setDirections(splitValue(style.animationDirection));
        setDelays(splitValue(style.animationDelay));
        setDurations(splitValue(style.animationDuration));
        setAnimations(splitValue(style.animationName));
    }, [selectedBlock, rwd, styleState])

    const addAnimation = (animationId: string) => {
        if (!animationId) {
            return;
        }
        if (animationId === 'none') {
            setIterations([]);
            setDirections([]);
            setDelays([]);
            setDurations([]);
            setAnimations(['none']);
            changed({animations: ['none'], durations: [], delays: [], directions: [], iterations: []})
            return;
        }
        iterations.push('infinite');
        directions.push('normal');
        delays.push('0s');
        durations.push('1s');
        if (animations.includes('none')) {
            animations.length = 0;
        }
        animations.push(animationId);
        changed({
            animations,
            durations,
            delays,
            directions,
            iterations,
        });
    }
    const removeFilter = index => {
        iterations.splice(index, 1);
        directions.splice(index, 1);
        delays.splice(index, 1);
        durations.splice(index, 1);
        animations.splice(index, 1);
        changed({
            animations,
            durations,
            delays,
            directions,
            iterations,
        });
    }
    const getAnimationName = animationId => allAnimationsNames.find(([id, name]) => id === animationId)?.[1] || '';
    const getAnimationsList = () => {
        return animations.map((id, index) => {
                return (<div className={styles.stylesFormRow} key={id}>
                    <SingleAnimation name={id}
                                     duration={durations[index]}
                                     delay={delays[index]}
                                     direction={directions[index]}
                                     iteration={iterations[index]}
                                     label={getAnimationName(id)}
                                     onChange={e => changedAnimation(index, e)}/>
                    <Icon type="material" name="close" onClick={e => removeFilter(index)}/>
                </div>)
            }
        )
    }

    const changedAnimation = (index: number, [name, duration, delay, direction, iteration]) => {
        iterations[index] = iteration;
        directions[index] = direction;
        delays[index] = delay;
        durations[index] = duration;
        changed({
            animations,
            durations,
            delays,
            directions,
            iterations,
        });
    }

    return (
        <div className={styles.stylesFormGroup}>
            <div className={styles.stylesFormRow}>
                <Select onChange={addAnimation} label="Dodaj animacje">
                    <Option value="" selected={true}>Wybierz</Option>
                    {allAnimationsNames.map(([id, name]) =>
                        <Option key={id} value={id} disabled={animations.includes(id)}>{name}</Option>
                    )}
                </Select>
            </div>

            {getAnimationsList()}

        </div>
    )
}
