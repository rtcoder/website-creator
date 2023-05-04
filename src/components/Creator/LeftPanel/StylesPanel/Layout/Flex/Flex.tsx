import styles from "../../StylesPanel.module.scss"
import FlexDirection from "@/components/Creator/LeftPanel/StylesPanel/Layout/Flex/FlexDirection/FlexDirection";
import JustifyContent from "@/components/Creator/LeftPanel/StylesPanel/Layout/Flex/JustifyContent/JustifyContent";
import AlignItems from "@/components/Creator/LeftPanel/StylesPanel/Layout/Flex/AlignItems/AlignItems";
import FlexWrap from "@/components/Creator/LeftPanel/StylesPanel/Layout/Flex/FlexWrap/FlexWrap";

interface Props {
    onChange: (value: string, property: string) => void
}

export default function Flex(props: Props) {
    return (
        <div className={styles.stylesFormGroup}>
            <FlexDirection onChange={props.onChange}/>
            <JustifyContent onChange={props.onChange}/>
            <AlignItems onChange={props.onChange}/>
            <FlexWrap onChange={props.onChange}/>
        </div>
    )
}
