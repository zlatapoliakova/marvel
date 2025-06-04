import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import useMarvelServices from '../../services/MarvelServices';
import { setContentList } from '../../utils/SetContent';

import './charList.scss';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [endedChar, setEndedChar] = useState(false);

    const {getAllCharacters, process, setProcess} = useMarvelServices();

    useEffect(() => {
        onRequest(offset, true);
    }, []) // work like componentDidMouth()

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllCharacters(offset)
            .then(setCharState)
            .then(() => setProcess('confirmed'));
    }

    const setCharState = (newChars) => {
        let ended = false
        if (newChars.length < 9) {
            ended = true;
        }

        setChars(chars => [...chars, ...newChars]);
        setNewItemLoading(false);
        setOffset(offset => offset + 9);
        setEndedChar(ended)
    }

    const itemRef = useRef([]);

    const onFocusItem = (id) => {
        itemRef.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRef.current[id].classList.add('char__item_selected');
        itemRef.current[id].focus();
    }

    const renderItem = (arr) => {
        const items = arr.map((item, i) => {
            let imgStyle = {objectFit: 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit: 'unset'};
            }

            return (
                <CSSTransition classNames="char__item" key={item.id} timeout={500}>
                    <li className='char__item'
                        ref={el => itemRef.current[i] = el}
                        key={item.id}
                        onClick={() => {
                            props.onSelectedCharacter(item.id);
                            onFocusItem(i);
                        }}
                        onKeyPress={(e) => {
                            if(e.key === ' ' || e.key === 'Enter') {
                                props.onSelectedCharacter(item.id);
                                onFocusItem(i);
                            }
                        }}
                        >
                        <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                  {items}   
                </TransitionGroup>
            </ul>
        )
    }

    return (
        <div className="char__list">
            {setContentList(process, () => renderItem(chars), newItemLoading)}
            <button 
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{display: endedChar ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    charId: PropTypes.number,
    onSelectedCharacter: PropTypes.func.isRequired // может показать предупреждение если проп не передан
}

export default CharList;