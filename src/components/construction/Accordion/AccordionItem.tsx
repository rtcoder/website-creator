import styles from './AccordionItem.module.scss'
import {useEffect, useRef, useState} from "react";
import classNames from "@/helpers/classNames";
import Icon from "@/components/construction/Icon/Icon";

export interface AccordionItemInterface {
    title: string;
    children: any;
    opened?: boolean;
    onOpen?: () => void;
}

export default function AccordionItem(props: AccordionItemInterface) {
    const contentRef = useRef(null);
    const panelRef = useRef(null);
    const [isOpen, setIsOpen] = useState(props.opened || false);
    const toggleOpen = () => {
        !isOpen ? openPanel() : closePanel()
    };
    const [timeout, _setTimeout] = useState<any>(null);
    const openPanel = () => {
        if (isOpen) {
            return;
        }
        props.onOpen?.();
        const openedHeaderHeight = 60;
        const contentHeight = (contentRef.current as HTMLElement).getBoundingClientRect().height;
        panelRef.current.style.height = `${openedHeaderHeight + contentHeight}px`;
        setIsOpen(true)
        _setTimeout(setTimeout(() => {
            panelRef.current.style.height = `auto`;
            clearTimeout(timeout)
            _setTimeout(null)
        }, 600))
    }
    const closePanel = () => {
        if (!isOpen) {
            return;
        }
        const openedHeaderHeight = 60;
        const contentHeight = (contentRef.current as HTMLElement).getBoundingClientRect().height;
        panelRef.current.style.height = `${openedHeaderHeight + contentHeight}px`;
        _setTimeout(setTimeout(() => {
            panelRef.current.style.removeProperty('height');
            clearTimeout(timeout)
            _setTimeout(null)
            setIsOpen(false);
        }, 1))
    }
    useEffect(() => {
        props.opened ? openPanel() : closePanel()
    }, [props.opened])
    return (
        <div className={classNames({[styles.accordionItem]: true, [styles.open]: isOpen})} ref={panelRef}>
            <div className={styles.accordionItemHeader} onClick={toggleOpen}>
                <div>{props.title}</div>
                <div className={styles.accordionItemHeaderArrow}>
                    <Icon type="material-outlined" name="expand_more"/>
                </div>

            </div>

            <div className={styles.accordionItemContent} ref={contentRef}>
                {props.children}
            </div>
        </div>
    )
}
