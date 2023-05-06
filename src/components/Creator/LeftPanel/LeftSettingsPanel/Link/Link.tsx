import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BlockInterface} from "@/interfaces/Block.interface";
import {setLink} from "@/store/structureSlice";
import {Option, Select} from "@/components/construction/Select";
import {BlockLinkInterface, LINK_TYPES} from "@/interfaces/BlockLink.interface";
import {getAllStructureAnchors} from "@/helpers/block";
import Input from "@/components/construction/Input/Input";
import Icon from "@/components/construction/Icon/Icon";
import style from './Link.module.scss'

export default function Link() {
    const selectedBlock: BlockInterface = useSelector((state: any) => state.structure.selectedBlock);
    const structure: BlockInterface[] = useSelector((state: any) => state.structure.structure);
    const [linkType, setLinkType] = useState<any>('');
    const [linkValue, setLinkValue] = useState<any>('');
    const [linkTarget, setLinkTarget] = useState<any>('_self');
    const [allAnchors, setAllAnchors] = useState<string[]>([]);

    const dispatch = useDispatch();
    const _setLink = useCallback((data) => {
        dispatch(setLink(data));
    }, [dispatch]);
    const updateLinkType = value => {
        if (linkType !== value) {
            setLinkValue('')
        }
        const link: BlockLinkInterface | null = value ? {
            type: value,
            value: linkType === value ? linkValue : '',
            target: linkTarget
        } : null;
        _setLink({blockId: selectedBlock?.id, link})
        setLinkType(value);
    }
    const updateLinkValue = value => {
        setLinkValue(value);
        const link: BlockLinkInterface = {
            type: linkType,
            value,
            target: linkTarget
        };
        _setLink({blockId: selectedBlock?.id, link})
    }
    const updateLinkTarget = value => {
        setLinkTarget(value);
        const link: BlockLinkInterface = {
            type: linkType,
            value: linkValue,
            target: value
        };
        _setLink({blockId: selectedBlock?.id, link})
    }
    useEffect(() => {
        setLinkType(selectedBlock?.blockLink?.type || '');
        setLinkValue(selectedBlock?.blockLink?.value || '');
        setLinkTarget(selectedBlock?.blockLink?.target || '');
    }, [selectedBlock])
    useEffect(() => {
        setAllAnchors(
            getAllStructureAnchors([...structure])
        )
    }, [structure])
    return (
        <div>
            <Select label="Typ linku" onChange={updateLinkType}>
                <Option value='' selected={linkType === ''}>Wybierz</Option>
                <Option value={LINK_TYPES.URL} selected={linkType === LINK_TYPES.URL}>
                    <Icon className={style.optionIcon} type="material" name="link"/> Zwykły link
                </Option>
                <Option value={LINK_TYPES.EMAIL} selected={linkType === LINK_TYPES.EMAIL}>
                    <Icon className={style.optionIcon} type="material" name="alternate_email"/> E-mail
                </Option>
                <Option value={LINK_TYPES.TEL} selected={linkType === LINK_TYPES.TEL}>
                    <Icon className={style.optionIcon} type="material" name="call"/> Nr. telefonu
                </Option>
                <Option value={LINK_TYPES.SKYPE} selected={linkType === LINK_TYPES.SKYPE}>
                    <Icon className={style.optionIcon} type="fontawesome" name="fa-brands fa-skype"/> Skype
                </Option>
                <Option value={LINK_TYPES.ANCHOR} selected={linkType === LINK_TYPES.ANCHOR}>
                    <Icon className={style.optionIcon} type="material" name="tag"/> Element na stronie
                </Option>
            </Select>

            {linkType
                ? <div>
                    {linkType === LINK_TYPES.ANCHOR
                        ? <Select label="Wybierz kotwicę" onChange={updateLinkValue}>
                            <Option value="" selected={linkValue === ''}>Wybierz</Option>
                            {allAnchors.map(anchor =>
                                <Option value={`#${anchor}`} key={anchor}
                                        selected={linkValue === `#${anchor}`}>#{anchor}</Option>)}
                        </Select>

                        : <Input onChange={(ev, val) => updateLinkValue(val)} value={linkValue} label="Wpisz wartość"/>
                    }

                    <Select label="Otwórz w:" onChange={updateLinkTarget}>
                        <Option value="" selected={linkTarget === ''}>Wybierz</Option>
                        <Option value="_self" selected={linkTarget === '_self'}>Tej samej karcie</Option>
                        <Option value="_blank" selected={linkTarget === '_blank'}>Nowej karcie</Option>
                    </Select>
                </div> : <></>}

        </div>
    )
}
