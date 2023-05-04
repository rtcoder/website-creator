import React from "react";
import styles from "./MediaBlock.module.scss";
import {upload} from "@/helpers/upload";
import {eventEmitter} from "@/services/EventEmitter";
import {Events} from "@/interfaces/EventEmitter.interface";

export default abstract class MediaUploadBlock extends React.Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {
            inputRef: React.createRef(),
            mediaRef: React.createRef(),
            isUploading: false,
            uploadProgress: 0
        }
    }

    abstract getMediaComponent(): JSX.Element | string ;

    abstract getAcceptType(): string ;

    abstract getUploadIcon(): JSX.Element | string;

    abstract onLocalLoadMedia(reader: FileReader): void;

    abstract onLoadMediaRequest(request): void;

    componentDidMount() {
        eventEmitter.subscribe(Events.CLICK_UPLOAD_INPUT, blockId => {
            if (this.props.block.id === blockId) {
                this.state.inputRef.current.click();
            }
        })
    }

    private getUploadProgress() {
        return `${this.state.uploadProgress}%`;
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
            onLoad: _ => this.onLoadMediaRequest(request)
        });

        if (request.OPENED === request.readyState) {
            this.setState({isUploading: true});
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            this.onLocalLoadMedia(reader);
        };
    }

    render() {
        return (
            <div className={styles.mediaContainer}>
                {this.props.block.attributes.src ? this.getMediaComponent() : ''}

                {this.state.isUploading
                    ? <div className={styles.loading}>
                        <div className={styles.bar} style={{width: this.getUploadProgress()}}/>
                    </div>
                    : ''}

                {!this.props.block.attributes.src
                    ? <label htmlFor={`file-${this.props.block.id}`}>
                        <input ref={this.state.inputRef}
                               type="file"
                               id={`file-${this.props.block.id}`}
                               onChange={this.onChange.bind(this)}
                               accept={this.getAcceptType()}/>
                        {this.getUploadIcon()}
                    </label>
                    : ''}
            </div>
        )
    }
}

