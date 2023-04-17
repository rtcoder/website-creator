import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class SpotifyBlock extends BlockModel {
    modifyValueFn = 'modifySpotifySourceValue';

    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): SpotifyBlock {
        return new SpotifyBlock({...data, type: BLOCK_TYPES.SPOTIFY});
    }

    getSelectorAttributes() {
        return {
            ...this.getStartingAttributes(),
            src: this.attributes.src ?? '',
        }
    }

    getStartingAttributes() {
        return {
            src: '',
            frameborder: '0',
            allowfullscreen: '',
            width: '100%',
            height: '100%',
            allow: 'autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture',
            loading: 'lazy'
        }
    }

    getStartingStyle() {
        return {
            all: {
                basic: {
                    display: 'grid',
                    width: '100%'
                }
            }
        };
    }
}

function modifySpotifySourceValue(inputValue) {
    if (inputValue.includes('<iframe')) {
        const strPart = inputValue.split(' ').find(part => part.startsWith('src'));
        if (strPart) {
            return strPart.replace('src="', '').replace('"', '');
        }
    } else if (!inputValue.includes('embed/')) {
        return inputValue.replace('spotify.com', 'spotify.com/embed');
    }

    return inputValue;
}
