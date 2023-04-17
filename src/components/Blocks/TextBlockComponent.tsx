import {BlockInterface} from "@/interfaces/Block.interface";
import React from "react";

export default class TextBlockComponent extends React.Component<any, any> {
    constructor(props: { block: BlockInterface, multiline: boolean }) {
        super(props)
        this.state = {
            block: props.block,
            ref: React.createRef(),
            html: props.block.textContent,
            multiline: props.multiline
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        const value = this.state.multiline
            ? this.state.ref.current.innerHTML
            : this.state.ref.current.innerText.replaceAll('\n', ' ');
        return nextState.html !== value;
    }

    getHtml() {
        return {__html: this.state.html};
    }

    updateContent() {
        const {block} = this.state;
        block.textContent = this.state.multiline
            ? this.state.ref.current.innerHTML
            : this.state.ref.current.innerText.replaceAll('\n', ' ');

        this.setState({
            block,
            html: block.textContent
        });
    }
    render() {
        const CustomTag = this.state.block.tagName;
        return (
            <CustomTag ref={this.state.ref}
                contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={this.updateContent.bind(this)}
                onChange={this.updateContent.bind(this)}
                onKeyUp={this.updateContent.bind(this)}
                dangerouslySetInnerHTML={this.getHtml()}
            />
        )
    }
}

