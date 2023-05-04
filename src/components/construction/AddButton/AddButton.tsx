import {MouseEventHandler} from "react";
import Button from "@/components/construction/Button/Button";
import styles from './AddButton.module.scss'
interface Props {
    children: any;
    onClick?: MouseEventHandler;
}

export default function AddButton(props: Props) {
    return (
        <Button className={styles.addButton} onClick={props.onClick}>{props.children}</Button>
    )
}
