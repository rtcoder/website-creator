import styles from '@/styles/construction/Accordion/AccordionItem.module.scss'
import {useState} from "react";
import classNames from "@/helpers/classNames";
import Icon from "@/components/Icon";

export interface AccordionItemInterface {
    title: string;
    content: any;
}

export default function (props: AccordionItemInterface) {
    const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => setIsOpen(!isOpen);
    return (
        <div className={classNames({[styles.accordionItem]: true, [styles.open]: isOpen})}>
            <div className={styles.accordionItemHeader} onClick={toggleOpen}>
                <div>{props.title}</div>
                <div className={styles.accordionItemHeaderArrow}>
                    <Icon type="material-outlined" name="expand_more"/>
                </div>

            </div>

            <div className={styles.accordionItemContent}>
                {props.content}
            </div>
        </div>
    )
}
