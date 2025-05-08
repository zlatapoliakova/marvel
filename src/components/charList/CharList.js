import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelServices from '../../services/MarvelServices';

import './charList.scss';

class CharList extends Component {

    marvelServices = new MarvelServices();

    charRef = React.createRef();

    state = {
        chars: [],
        loading: true,
        error: false, 
        newItemLoading: false, 
        offset: 0,
        endedChar: false,
        // charId: ''
    }

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharItemLoading();
        this.marvelServices.getAllCharacters(offset)
            .then(this.setCharState)
            .catch(this.errorMessage);
    }

    onCharItemLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    setCharState = (newChars) => {
        let ended = false
        if (newChars.length < 9) {
            ended = true;
        }

        this.setState(({chars, offset}) => ({
            chars: [...chars, ...newChars],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            endedChar: ended
        }));
    }

    errorMessage = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    itemRef = [];

    setRef = (ref) => {
        this.itemRef.push(ref);
    }

    onFocusItem = (id) => {
        this.itemRef.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRef[id].classList.add('char__item_selected');
        this.itemRef[id].focus();
    }

    // onClickSelectedCharacter = (charId) => {
    //     this.props.onSelectedCharacter(charId);

    //     this.setState({
    //         charId: charId
    //     })
    // }

    renderItem = (arr) => {
        const items = arr.map((item, i) => {
            // let clazz = 'char__item';
            let imgStyle = {objectFit: 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {objectFit: 'unset'};
            }

                    
            // if (this.state.charId === item.id) {
            //     clazz += ' char__item_selected';
            // }

            return (
                <li className='char__item'
                    ref={this.setRef}
                    key={item.id}
                    onClick={() => {
                        this.props.onSelectedCharacter(item.id);
                        this.onFocusItem(i);
                    }}
                    onKeyPress={(e) => {
                        if(e.key === ' ' || e.key === 'Enter') {
                            this.props.onSelectedCharacter(item.id);
                            this.onFocusItem(i);
                        }
                    }}
                    >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}   
            </ul>
        )
    }

    render() {
        const {chars, loading, error, newItemLoading, offset, endedChar} = this.state;

        const items = this.renderItem(chars);

        const errorMessage = error ?  <ErrorMessage/> : null;
        const loadSpinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {loadSpinner}
                {content}
                <button 
                    className="button button__main button__long"
                    onClick={() => this.onRequest(offset)}
                    disabled={newItemLoading}
                    style={{display: endedChar ? 'none' : 'block'}}>
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    charId: PropTypes.number,
    onSelectedCharacter: PropTypes.func.isRequired // может показать предупреждение если проп не передан
}

export default CharList;