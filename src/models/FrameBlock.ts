import {BlockHTML} from "@/models/BlockHTML";

export class FrameBlock extends BlockHTML {

    modifyValueFn = 'null';

    getContentHtml() {
        return `<div class="frame-container ${this.attributes.src ? 'with-media' : ''}">
                    <input type="text" id="src-input" placeholder="Podaj adres i naciśnij Enter"
                            onkeyup="updateSource(event, '${this.id}', ${this.modifyValueFn})"
                             onpaste="updateSource(event, '${this.id}', ${this.modifyValueFn})">
                    ${this.generateSelector()}
                    <div class="absolute-mask"></div>
                </div>`
    }

    getStartingTagName() {
        return 'iframe';
    }
}

function updateSource(ev, dataId, modifyValue) {
    selectItemById(dataId);

    if (ev.key !== 'Enter' && ev.type === 'keyup') {
        return false;
    }
    const inputValue = ev.target.value || ev.clipboardData.getData('Text');
    const container = ev.target.closest('.frame-container');
    const iframe = container.querySelector('iframe');
    if (!inputValue.length) {
        container.classList.remove('with-media');
        iframe.setAttribute('src', '');

        emitEvent(EVENT_TYPES.UPDATE_ATTRIBUTES, {
            dataId,
            attributes: {src: undefined}
        });

        return;
    }

    const finalValue = modifyValue ? modifyValue(inputValue) : inputValue;

    container.classList.add('with-media');
    iframe.setAttribute('src', finalValue);

    emitEvent(EVENT_TYPES.UPDATE_ATTRIBUTES, {
        dataId,
        attributes: {src: finalValue}
    });

}
