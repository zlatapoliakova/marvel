import { Component } from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelServices from '../../services/MarvelServices';

import mjolnir from '../../resources/img/mjolnir.png';

import './randomChar.scss';

class RandomChar extends Component {

    state = {
        char: {}, 
        loading: true, 
        erorr: false
    }

    marvelServices = new MarvelServices();

    componentDidMount() {
        this.updateChar();
        // this.setInterv = setInterval(this.updateChar, 3000);
    }

    componentWillUnmount() {
        // clearInterval(this.setInterv);
    }

    setCharState = (char) => {
        this.setState({
            char, 
            loading: false
        })
    }

    setCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (20 - 1) + 1);
        this.setCharLoading();
        this.marvelServices
                .getCharacter(id)
                .then(res => this.setCharState(res))
                .catch(this.erorrMessage);
    }

    erorrMessage = () => {
        this.setState({
            loading: false, 
            error: true
        })
    }
    
    render() {
        const {char, loading, error} = this.state;
        const errorMessage  = error ? <ErrorMessage/> : null;
        const loadingSprint = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;

        return (
            <div className="randomchar">
                {errorMessage}
                {loadingSprint}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
                        <div className="inner" onClick={this.updateChar}>try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    let imgStyle = {objectFit: 'cover'};
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {objectFit: 'unset'};
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
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