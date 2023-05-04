import styles from './Button.module.scss'
import {MouseEventHandler} from "react";
import classNames from "@/helpers/classNames";

interface Props {
    type?: 'submit' | 'reset' | 'button';
    active?: boolean;
    color?: 'primary' | 'accent' | 'warning' | 'danger';
    disabled?: boolean;
    className?: string;
    children: any;
    onClick?: MouseEventHandler;
}

export default function Button(props: Props) {
    const classes = classNames({
        [styles.button]: true,
        [styles.active]: !!props.active,
        [props.className || '']: true,
        [props.color ? `color-${props.color}` : '']: true,
    })
    return (
        <button type={props.type || 'button'}
                className={classes}
                onClick={props.onClick}
                disabled={props.disabled}>{props.children}</button>
    )
}
