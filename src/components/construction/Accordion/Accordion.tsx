import styles from './Accordion.module.scss'
import AccordionItem, {AccordionItemInterface} from "@/components/construction/Accordion/AccordionItem";
import {useEffect, useState} from "react";

interface Props {
    children: any;
}

export default function (props: Props) {
    const [openedItem, setOpenedItem] = useState(
        props.children.flat().find(child => child.props?.opened)?.props.title||''
    )

    const getChildrenItems = () => {
        return props.children
            .flat()
            .filter((child) => child?.type?.name === 'AccordionItem');
    }
    const handleOpen = (item) => {
        item.props.onOpen?.();
        setOpenedItem(item?.props.title);
    }
    const getItems = () => {
        return getChildrenItems()
            .map((item, index) => {
                const {children, title} = item.props
                return <AccordionItem key={title}
                                      title={title}
                                      opened={openedItem === title}
                                      onOpen={() => handleOpen(item)}>
                    {children}
                </AccordionItem>
            })
    }
    useEffect(()=>{
        setOpenedItem(
            props.children.flat().find(child => child.props?.opened)?.props.title||''
        )
    },[props.children])
    return (
        <div className={styles.accordion}>
            {getItems()}
        </div>
    )
}
