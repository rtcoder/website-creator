import styles from "../StylesPanel.module.scss"
import Flex from "@/components/Creator/LeftPanel/StylesPanel/Layout/Flex/Flex";

interface Props {
    onChange: (value: string, property: string) => void
}

export default function Layout(props: Props) {
    return (
        <div className={styles.stylesFormGroup}>
            <Flex onChange={props.onChange}/>
        </div>
    )
}
