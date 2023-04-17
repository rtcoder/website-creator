import {BlockInterface} from "@/interfaces/Block.interface";
import React from "react";

interface TextComponentPropsInterface {
    block: BlockInterface,
    multiline?: boolean,
    editable?: boolean
}

export default class TextBlockComponent extends React.Component<any, any> {
    constructor(props: TextComponentPropsInterface) {
        super(props)
        this.state = {
            block: props.block,
            ref: React.createRef(),
            html: props.block.textContent,
            multiline: props.multiline || false,
            editable: props.editable || false,
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
                       contentEditable={this.state.editable}
                       suppressContentEditableWarning={true}
                       onInput={this.updateContent.bind(this)}
                       onChange={this.updateContent.bind(this)}
                       onKeyUp={this.updateContent.bind(this)}
                       dangerouslySetInnerHTML={this.getHtml()}
            />
        )
    }
}

