import styles from "./RgbaValues.module.scss"
import {ColorPickerRgbaValuesProps} from "@/components/construction/ColorPicker/types";


export default function RgbaValues(props: ColorPickerRgbaValuesProps) {

    return (
        <div className={styles.rgbaContainer}>
            <div className={styles.rgbaColor}>
                <div className={styles.value}>{props.color?.[0]}</div>
                <div className={styles.name}>R</div>
            </div>
            <div className={styles.rgbaColor}>
                <div className={styles.value}>{props.color?.[1]}</div>
                <div className={styles.name}>G</div>
            </div>
            <div className={styles.rgbaColor}>
                <div className={styles.value}>{props.color?.[2]}</div>
                <div className={styles.name}>B</div>
            </div>
            <div className={styles.rgbaColor}>
                <div className={styles.value}>{props.color?.[3]}</div>
                <div className={styles.name}>A</div>
            </div>
        </div>
    )
}
