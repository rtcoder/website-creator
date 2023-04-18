import {BLOCK_TYPES} from "@/helpers/blocks";
import {BlockInterface} from "@/interfaces/Block.interface";
import {BlockModel} from "@/models/Block";

export class SpotifyBlock extends BlockModel {
    private constructor(data: Partial<BlockInterface>) {
        super(data);
    }

    static create(data?: Partial<BlockInterface>): SpotifyBlock {
        return new SpotifyBlock({...data, type: BLOCK_TYPES.SPOTIFY});
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

