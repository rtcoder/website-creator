import styles from '@/styles/construction/Accordion/Accordion.module.scss'
import AccordionItem, {AccordionItemInterface} from "@/components/construction/Accordion/AccordionItem";

interface AccordionProps {
    items: AccordionItemInterface[];
}

export default function (props: AccordionProps) {
    return (
        <div className={styles.accordion}>
            {props.items.map(({title, content}) => <AccordionItem key={title} title={title} content={content}/>)}
        </div>
    )
}
