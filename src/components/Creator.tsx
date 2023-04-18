import TopPanel from "@/components/TopPanel";
import {RWD_MODES} from "@/enums/rwd";
import {STYLE_STATE_NAMES} from "@/enums/styleState";
import CreatorArea from "@/components/CreatorArea";
import {eventEmitter} from "@/services/EventEmitter";
import {Events} from "@/interfaces/EventEmitter.interface";
import React from "react";
import LeftPanel from "@/components/LeftPanel";
import styles from "@/styles/Components/Creator.module.scss";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {mapBlock} from "@/helpers/block";
import {Structure} from "@/models/Structure";

export default class Creator extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.state = {
            rwdMode: RWD_MODES.DESKTOP,
            styleState: STYLE_STATE_NAMES.BASIC,
            structure: new Structure(),
            selectedBlock: null
        }
    }

    componentDidMount() {
        eventEmitter.subscribe(Events.RWD_CHANGED, rwd => {
            this.setState({rwdMode: rwd});
        });
        eventEmitter.subscribe(Events.DROP_NEW_ELEMENT, data => {
            const {element, targetId} = data;
            const {structure} = this.state;
            const newBlock = mapBlock(element);
            structure.addBlock(newBlock, targetId);
            this.setState({structure});

            eventEmitter.dispatch(Events.SELECT_ELEMENT, newBlock);
            console.log(structure)
        });
        eventEmitter.subscribe(Events.DROP_ELEMENT, data => {
            const {element, targetId} = data;
            const {structure} = this.state;
            structure.moveBlock(element.id!, targetId);
            this.setState({structure})
        });
        eventEmitter.subscribe(Events.SELECT_ELEMENT, block => {
            if (this.state.selectedBlock?.id === block.id) {
                this.setState({selectedBlock: null})
            } else {
                this.setState({selectedBlock: block})
            }
        });
        eventEmitter.subscribe(Events.FORCE_SELECT_ELEMENT, block => {
            this.setState({selectedBlock: block})
        });
    }

    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <div className={styles.creator}>
                    <TopPanel rwd={this.state.rwdMode}/>
                    <LeftPanel styleState={this.state.styleState}/>
                    <CreatorArea structure={this.state.structure}
                                 selectedBlock={this.state.selectedBlock}
                                 rwdMode={this.state.rwdMode}
                                 styleState={this.state.styleState}/>
                </div>
            </DndProvider>
        )
    }
}
