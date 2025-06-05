import { useState, useEffect } from 'react';

import useMarvelServices from '../../services/MarvelServices';
import { setContent } from '../../utils/SetContent';

import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';

const RandomChar = () => {

    const [char, setChar] = useState({});

    const {clearError, getCharacter, process, setProcess} = useMarvelServices();

    useEffect(() => {
        clearError();
        updateChar();
        const setInterv = setInterval(updateChar, 6000);

        return () => {clearInterval(setInterv)};
        // eslint-disable-next-line
    }, []);

    const updateChar = () => {
        const id = Math.floor(Math.random() * (20 - 1) + 1);
        getCharacter(id)
            .then(res => setCharState(res))
            .then(() => setProcess('confirmed'));
    }

    const setCharState = (char) => {
        setChar(char);
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button className="button button__main">
                    <div className="inner" onClick={updateChar}>try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    );
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data;
    let imgStyle = {objectFit: 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit: 'unset'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description ? description.slice(0, 210) : 'Unfortunally, description is undefined =('}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default RandomChar;