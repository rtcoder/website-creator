import BlockItem, {BlockItemProps} from "@/components/Creator/LeftPanel/Blocks/BlockItem";
import styles from '@/styles/Components/LeftPanel/Blocks/BlocksList.module.scss'
interface BlocksListProps {
    items: BlockItemProps[];
}

export default function (props: BlocksListProps) {
    return (
        <div className={styles.blocksList}>
            {props.items.map(({name, type, icon}) =>
                <BlockItem key={name} name={name} type={type} icon={icon}/>)}
        </div>
    )
}
