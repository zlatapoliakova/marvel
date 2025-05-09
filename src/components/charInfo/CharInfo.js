import { useEffect, useState } from 'react';

import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

const CharInfo = ({charId}) => {
    const [char, setChar] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelServices = new MarvelServices();

    useEffect(() => {
        updateChar();
    }, [charId])

    const updateChar = () => {
        if(!charId) {
            return;
        }

        charLoading();

        marvelServices
            .getCharacter(charId)
            .then(setCharLoaded)
            .catch(errorMessage)
    }

    const setCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
    }

    const charLoading = () => {
        setLoading(true);
    }

    const errorMessage = () => {
        setError(true);
        setLoading(false);
    }

    const errorMsg = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const skeleton = char || loading || error ? null : <Skeleton/>;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMsg}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
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