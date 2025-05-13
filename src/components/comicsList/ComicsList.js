import { useEffect, useState } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './comicsList.scss';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [ended, setEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelServices();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

        getAllComics(offset).then(updateComics);
    }

    const updateComics = (newComics) => {
        let ended = false;

        if(newComics.length < 8) {
            ended = true;
        }

        setComics(comics => [...comics, ...newComics]);
        setOffset(offset => offset + 8);
        setNewItemsLoading(false);
        setEnded(ended);
    }

    const renderItem = (arr) => {
        const items = arr.map(item => {
            return (
                <li className="comics__item" key={item.id}>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices}</div>
                    </a>
                </li>
            );
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }

    const items = renderItem(comics);
    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingComics = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
            {loadingComics}
            {items}
            <button className="button button__main button__long"
                    onClick={() => onRequest(offset)}
                    disabled={newItemLoading}
                    style={{display: ended ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;