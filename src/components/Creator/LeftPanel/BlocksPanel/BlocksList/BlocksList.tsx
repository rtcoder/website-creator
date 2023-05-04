import BlockItem, {BlockItemProps} from "@/components/Creator/LeftPanel/BlocksPanel/BlockItem/BlockItem";
import styles from './BlocksList.module.scss'
interface BlocksListProps {
    items: BlockItemProps[];
}

export default function BlocksList(props: BlocksListProps) {
    return (
        <div className={styles.blocksList}>
            {props.items.map(({name, type, icon}) =>
                <BlockItem key={name} name={name} type={type} icon={icon}/>)}
        </div>
    )
}
