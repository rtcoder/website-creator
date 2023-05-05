import React, {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {BlockInterface} from "@/interfaces/Block.interface";
import {setTextContent} from "@/store/structureSlice";
import {Option, Select} from "@/components/construction/Select";
import styles from "./SpecialCharacters.module.scss"
import {fetchJson} from "@/helpers/fetch";

type CharactersList = string[];
type AllCharactersList = { [key: string]: CharactersList };
const categories = ['block', 'dingbats', 'emoji', 'geometric', 'punctuation', 'letterlike', 'math-operators', 'box', 'miscs', 'arrows', 'currency',];
export default function SpecialCharacters() {
    const selectedBlock: BlockInterface = useSelector((state: any) => state.structure.selectedBlock);
    const [charactersList, setCharactersList] = useState<AllCharactersList>({
        block: [],
        dingbats: [],
        emoji: [],
        geometric: [],
        punctuation: [],
        letterlike: [],
        'math-operators': [],
        box: [],
        miscs: [],
        arrows: [],
        currency: [],
    })
    const [charactersCategory, setCharactersCategory] = useState('')
    const dispatch = useDispatch();
    const _setTextContent = useCallback((data) => {
        dispatch(setTextContent(data));
    }, [dispatch]);
    const addCharacter = character => {
        const content = `${selectedBlock.textContent}${character}`
        _setTextContent({content, blockId: selectedBlock?.id})
    }
    const getCharacters = () => {
        const characters = charactersList;
        categories.forEach((type) => {
            fetchJson<CharactersList>(`/json/special-characters/${type}.json`)
                .then((list: CharactersList) => {
                    characters[type] = list;
                    if (!Object.keys(characters).find(cat => !characters[cat].length)) {
                        setCharactersList({...characters})
                    }
                });
        })
    }
    useEffect(() => {
        getCharacters();
    }, [])
    const getList = () => {
        const list = charactersCategory ? (charactersList[charactersCategory]) : categories.map(cat => charactersList[cat]).flat();
        return list.map((char, index) =>
            <div onClick={e => addCharacter(char)} className={styles.singleCharacter} key={char + index}>{char}</div>)
    }
    return (
        <div>
            <Select onChange={setCharactersCategory}>
                <Option value="">Wszystkie</Option>
                <Option value="block">Bloki</Option>
                <Option value="dingbats">Dingbaty</Option>
                <Option value="emoji">Emoji</Option>
                <Option value="geometric">Geometryczne</Option>
                <Option value="punctuation">Interpunkcja</Option>
                <Option value="letterlike">Literowe</Option>
                <Option value="math-operators">Operatory matematyczne</Option>
                <Option value="box">Ramki</Option>
                <Option value="miscs">Różne</Option>
                <Option value="arrows">Strzałki</Option>
                <Option value="currency">Waluty</Option>
            </Select>

            <div className={styles.list}>
                {getList()}
            </div>
        </div>
    )
}
