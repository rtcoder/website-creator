import TopPanel from "@/components/TopPanel";
import {RWD_MODES} from "@/enums/rwd";
import {STYLE_STATE_NAMES} from "@/enums/styleState";
import CreatorArea from "@/components/CreatorArea";
import {eventEmitter, Events} from "@/helpers/EventEmitter";
import React from "react";
import LeftPanel from "@/components/LeftPanel";
import styles from "@/styles/Components/Creator.module.scss";

export default class Creator extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            rwdMode: RWD_MODES.DESKTOP,
            styleState: STYLE_STATE_NAMES.BASIC
        }
    }
    componentDidMount() {
        eventEmitter.subscribe(Events.RWD_CHANGED, rwd => {
            this.setState({rwdMode: rwd});
        });
    }

    render() {
        return (
            <div className={styles.creator}>
                <TopPanel rwd={this.state.rwdMode}/>
                <LeftPanel styleState={this.state.styleState}/>
                <CreatorArea rwd={this.state.rwdMode} styleState={this.state.styleState}/>
            </div>
        )
    }
}
