import {OptionProps} from "@/components/construction/Select/types";
import styles from './Option.module.scss';
import classNames from "@/helpers/classNames";

export default function Option(props: OptionProps) {
    const classes = classNames({
            [styles.optionItem]: true,
            [styles.selected]: !!props.selected,
            [styles.disabled]: !!props.disabled,
        }
    )
    return (
        <div className={classes}
             onClick={e => props.onClick?.(props.value)}>{props.children}</div>
    )
}
