import styles from './Accordion.module.scss'
import AccordionItem from "@/components/construction/Accordion/AccordionItem";
import {useState} from "react";

interface Props {
    children: any;
}

export default function Accordion(props: Props) {
    const getChildrenItems = () => {
        return (Array.isArray(props.children) ? props.children : [props.children])
            .flat()
            .filter((child) => child?.type?.name === AccordionItem.name);
    }

    const [openedItem, setOpenedItem] = useState(
        getChildrenItems().find(child => child.props?.opened)?.props.title || ''
    )

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
    return (
        <div className={styles.accordion}>
            {getItems()}
        </div>
    )
}
