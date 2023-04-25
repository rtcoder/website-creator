import styles from './Accordion.module.scss'
import AccordionItem, {AccordionItemInterface} from "@/components/construction/Accordion/AccordionItem";

interface Props {
    items: AccordionItemInterface[];
}

export default function (props: Props) {
    return (
        <div className={styles.accordion}>
            {props.items.map(({title, content}) => <AccordionItem key={title} title={title} content={content}/>)}
        </div>
    )
}
