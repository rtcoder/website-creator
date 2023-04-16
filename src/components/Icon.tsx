import styles from '@/styles/Components/Icon.module.scss';
import classNames from "@/helpers/classNames";

export type IconType =
    'devicon'
    | 'icofont'
    | 'fontawesome'
    | 'material-outlined'
    | 'material-rounded'
    | 'material-sharp'
    | 'ionicons'
    | 'octicons';

interface IconProps {
    type: IconType;
    name: string;
}

export default function Icon(props: IconProps) {
    const getIcon = () => {
        if (!props.name || !props.type) {
            return '';
        }
        let content;
        switch (props.type) {
            case 'devicon':
            case 'icofont':
            case 'fontawesome':
                return (<i className={props.name}></i>);
            case 'material-outlined':
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
                return fetch(`/assets/ionicons/svg/${props.name}.svg`).then(res => res.text());
            case 'octicons':
                return fetch(`/assets/octicons/svg/${props.name}.svg`).then(res => res.text());
        }
    }
    const icon = getIcon();
    return (
        <div className={styles.icon}>{icon}</div>
    )
}
