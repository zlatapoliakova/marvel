import { Component } from 'react';

import MarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import Skeleton from '../skeleton/Skeleton'

import './charInfo.scss';

class CharInfo extends Component {
    state = {
        char: null,
        loading: false,
        error: false
    }

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.updateChar();
    }

    componentDidUpdate(prevProp) {
        if(this.props.charId !== prevProp.charId) {
            this.updateChar();
        }
    }

    updateChar = () => {
        const  {charId} = this.props;
        if(!charId) {
            return;
        }

        this.charLoading();

        this.marvelServices
            .getCharacter(charId)
            .then(this.setCharLoaded)
            .catch(this.errorMessage)
    }

    setCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }

    charLoading = () => {
        this.setState({
            loading: true
        })
    }

    errorMessage = () => {
        this.setState({
            loading: false, 
            error: true
        })
    }

    render() {
        const {char, loading, error} = this.state; 

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const skeleton = char || loading || error ? null : <Skeleton/>;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
    }
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