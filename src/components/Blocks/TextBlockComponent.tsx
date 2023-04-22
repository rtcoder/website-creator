import {BlockInterface} from "@/interfaces/Block.interface";
import React from "react";
import {connect} from "react-redux";
import {setTextContent} from "@/store/structureSlice";

interface TextComponentPropsInterface {
    block: BlockInterface,
    multiline?: boolean,
    editable?: boolean
    setTextContent: (data: { content: string; blockId: string }) => void
}

class TextBlockComponent extends React.Component<any, any> {
    constructor(private props: TextComponentPropsInterface) {
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
        const val = this.state.multiline
            ? this.state.ref.current.innerHTML
            : this.state.ref.current.innerText.replaceAll('\n', ' ');
        this.props.setTextContent({blockId: block.id, content: val})
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


export default connect(null, {setTextContent})(TextBlockComponent)
