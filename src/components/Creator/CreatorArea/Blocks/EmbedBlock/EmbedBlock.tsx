import {BlockInterface} from "@/interfaces/Block.interface";
import React from "react";
import styles from "./EmbedBlock.module.scss"
import classNames from "@/helpers/classNames";

export default abstract class EmbedBlock extends React.Component<any, any> {
    constructor(props: { block: BlockInterface }) {
        super(props)
        this.state = {
            inputRef: React.createRef(),
        }
    }

    abstract sourceModifier(source: string): void;

    updateSource(ev) {
        if (ev.key !== 'Enter' && ev.type === 'keyup') {
            return false;
        }

        const inputValue = this.state.inputRef.current.value || ev.clipboardData.getData('Text');
        this.sourceModifier(inputValue);
    }

    render() {
        const classes = classNames({
            [styles.frameContainer]: true,
            [styles.withMedia]: !!this.props.block.attributes.src
        });
        return (
            <div className={classes}>
                <input ref={this.state.inputRef}
                       type="text"
                       placeholder="Podaj adres i naciśnij Enter"
                       onKeyUp={this.updateSource.bind(this)}
                       onPaste={this.updateSource.bind(this)}
                />
                <iframe {...this.props.block.attributes}></iframe>
                <div className={styles.absoluteMask}/>
            </div>
        )
    }
}

