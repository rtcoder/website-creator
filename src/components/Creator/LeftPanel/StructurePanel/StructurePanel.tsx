import {useSelector} from "react-redux";
import StructureBlock from "@/components/Creator/LeftPanel/StructurePanel/StructureBlock/StructureBlock";
import styles from "./StructurePanel.module.scss"

export default function StructurePanel() {
    const structure = useSelector((state: any) => state.structure.structure);
    return (
        <div className={styles.structurePanel}>
            {structure.map(block => <StructureBlock key={block.id} block={block}/>)}
        </div>
    )
}
