import {BlockInterface} from "@/interfaces/Block.interface";
import React from "react";
import styles from "@/styles/Components/Blocks/MediaBlock.module.scss";
import Icon from "@/components/Icon";
import {upload} from "@/helpers/upload";

export default class MediaUploadBlockComponent extends React.Component<any, any> {
    constructor(props: { block: BlockInterface }) {
        super(props)
        this.state = {
            block: props.block,
            inputRef: React.createRef(),
            mediaRef: React.createRef(),
            isUploading: false,
            uploadProgress: 0
        }
    }

    getMediaComponent(): JSX.Element | string {
        return '';
    }

    private getUploadProgress() {
        return `${this.state.uploadProgress}%`;
    }

    onLoadMedia(request) {
        const result = request.response;
        const {block} = this.state;

        block.setAttributes({src: result.url});
        this.setState({
            block,
            isUploading: false,
            uploadProgress: 0
        });
    }

    private onChange(ev) {
        const [file] = ev.target.files;
        if (!file) {
            return;
        }

        const request = upload(file, {
            onProgress: evt => {
                const {loaded, total} = evt;

                const value = ((loaded * 100) / total).toFixed(0);
                this.setState({uploadProgress: value});
            },
            onLoad: _ => this.onLoadMedia(request)
        });

        if (request.OPENED === request.readyState) {
            this.setState({isUploading: true});
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const {block} = this.state;
            if (block.attributes.src && block.attributes.src.startsWith('http')) {
                return;
            }

            block.setAttributes({src: reader.result});
            this.setState({block});

        };
    }

    getUploadIcon() {
        return <Icon type="fontawesome" name="fa-sharp fa-regular fa-upload"/>
    }

    getAcceptType(): string {
        return '*';
    }

    render() {
        return (
            <div className={styles.mediaContainer}>
                {this.state.block.attributes.src ? this.getMediaComponent() : ''}

                {this.state.isUploading
                    ? <div className={styles.loading}>
                        <div className={styles.bar} style={{width: this.getUploadProgress()}}/>
                    </div>
                    : ''}

                {!this.state.block.attributes.src
                    ? <label htmlFor={`file-${this.state.block.id}`}>
                        <input ref={this.state.inputRef}
                               type="file"
                               id={`file-${this.state.block.id}`}
                               onChange={this.onChange.bind(this)}
                               accept={this.getAcceptType()}/>
                        {this.getUploadIcon()}
                    </label>
                    : ''}
            </div>
        )
    }
}

