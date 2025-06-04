import { useEffect, useState } from 'react';

import useMarvelServices from '../../services/MarvelServices';
import {setContent} from '../../utils/SetContent';

import './charInfo.scss';

const CharInfo = ({charId}) => {
    const [char, setChar] = useState(null);

    const {clearError, getCharacter, process, setProcess} = useMarvelServices();

    useEffect(() => {
        updateChar();
    }, [charId])

    const updateChar = () => {
        if(!charId) {
            return;
        }

        clearError();
        getCharacter(charId)
            .then(setCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const setCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <div className="char__info">
            {setContent(process, View, char)}
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;
    let styleImg = {objectFit: 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        styleImg = {objectFit: 'unset'}
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleImg}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.lenght > 0 ? null : 'There is no comics with this characher.'}
                {
                    comics.map((item, i) => {
                        // eslint-disable-next-line
                        if(i > 9) return;
                        return (
                            <li className="char__comics-item"
                            key={i}>
                                {item.name}
                            </li>
                        );
                    })
                }
            </ul>
        </>
    )
}

export default CharInfo;