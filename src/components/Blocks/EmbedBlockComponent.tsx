import {BlockInterface} from "@/interfaces/Block.interface";
import React from "react";
import styles from "@/styles/Components/Blocks/EmbedBlock.module.scss"
import classNames from "@/helpers/classNames";

export default class EmbedBlockComponent extends React.Component<any, any> {
    constructor(props: { block: BlockInterface }) {
        super(props)
        this.state = {
            block: props.block,
            inputRef: React.createRef(),
        }
    }

    updateSource(ev) {
        if (ev.key !== 'Enter' && ev.type === 'keyup') {
            return false;
        }

        const inputValue = this.state.inputRef.current.value || ev.clipboardData.getData('Text');
        const {block} = this.state;
        if (!inputValue.length) {

            (block as BlockInterface).setAttributes({src: undefined});

            return;
        }

        const finalValue = this.sourceModifier(inputValue);

        (block as BlockInterface).setAttributes({src: finalValue});

        this.setState({block});
    }

    sourceModifier(source) {
        console.warn('sourceModifier not implemented')
        return source;
    }

    getIframeAttributes() {
        const {attributes} = this.state.block;
        attributes.frameBorder = attributes.frameborder;
        attributes.allowFullScreen = attributes.allowfullscreen;
        attributes.referrerPolicy = attributes.referrerpolicy;
        delete attributes.frameborder;
        delete attributes.allowfullscreen;
        delete attributes.referrerpolicy;
        return attributes;
    }

    render() {
        const classes = classNames({
            [styles.frameContainer]: true,
            [styles.withMedia]: this.state.block.attributes.src
        });
        return (
            <div className={classes}>
                <input ref={this.state.inputRef}
                       type="text"
                       placeholder="Podaj adres i naciśnij Enter"
                       onKeyUp={this.updateSource.bind(this)}
                       onPaste={this.updateSource.bind(this)}
                />
                <iframe {...this.getIframeAttributes()}></iframe>
                <div className={styles.absoluteMask}/>
            </div>
        )
    }
}

