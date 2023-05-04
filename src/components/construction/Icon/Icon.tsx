import styles from './Icon.module.scss';
import classNames from "@/helpers/classNames";
import {MouseEventHandler} from "react";
import {ReactSVG} from "react-svg";


export type IconType =
    'devicon'
    | 'icofont'
    | 'fontawesome'
    | 'material'
    | 'material-outlined'
    | 'material-rounded'
    | 'material-sharp'
    | 'ionicons'
    | 'octicons';

interface Props {
    type: IconType;
    name: string;
    className?: string;
    title?: string;
    onClick?: MouseEventHandler;
}

export default function Icon(props: Props) {
    if (!props.name || !props.type) {
        return <></>;
    }
    const getIcon = () => {
        switch (props.type) {
            case 'devicon':
            case 'icofont':
            case 'fontawesome':
                return (<i className={props.name}></i>);
            case 'material-outlined':
            case 'material':
                return (<span
                    className={classNames(['material-symbols-outlined', styles.materialSymbolsOutlined])}>
                    {props.name}
                </span>);
            case 'material-rounded':
                return (<span
                    className={classNames(['material-symbols-rounded', styles.materialSymbolsRounded])}>
                    {props.name}
                </span>);
            case 'material-sharp':
                return (<span
                    className={classNames(['material-symbols-sharp', styles.materialSymbolsSharp])}>
                    {props.name}
                </span>);
            case 'ionicons':
            case 'octicons':
                return (<ReactSVG src={`/assets/${props.type}/svg/${props.name}.svg`}/>);
        }
    }
    const className = props.className || '';
    return (
        <div className={classNames([styles.icon, className])}
             title={props.title}
             onClick={props.onClick}>{getIcon()}</div>
    )
}
