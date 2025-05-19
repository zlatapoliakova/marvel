import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import useMarvelServices from '../services/MarvelServices';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Spinner from '../components/spinner/Spinner';

import './singleComicPage.scss';

const SingleComicPage = () => {
    const {comicId} = useParams();

    const {loading, error, getComic} = useMarvelServices();

    const [comic, setComic] = useState(null);
    
    useEffect(() => {
        updateComic();
    }, [comicId])

    const updateComic = () => {
        getComic(comicId)
            .then(loadComic);
    }

    const loadComic = (comic) => {
        setComic(comic);
    }

    const errorMsg = error ?  <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content  = !(error || loading || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMsg}
            {spinner}
            {content}
        </>
    );
}

const View = ({comic}) => {

    const {title, description, pageCount, languages, prices, thumbnail} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">Language: {languages}</p>
                <div className="single-comic__price">{prices}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    );
}

export default SingleComicPage;