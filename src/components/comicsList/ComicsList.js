import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import useMarvelServices from '../../services/MarvelServices';
import { setContentList } from '../../utils/SetContent';

import './comicsList.scss';

const ComicsList = () => {

    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [ended, setEnded] = useState(false);

    const {getAllComics, process, setProcess} = useMarvelServices();

    useEffect(() => {
        onRequest(offset, true);
        // eslint-disable-next-line
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemsLoading(false) : setNewItemsLoading(true);

        getAllComics(offset)    
            .then(updateComics)
            .then(() => setProcess('confirmed'));
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
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.prices}</div>
                    </Link>
                </li>
            );
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        );
    }

    return (
        <div className="comics__list">
            {setContentList(process, () => renderItem(comics), newItemLoading)}
            <button className="button button__main button__long"
                    onClick={() => onRequest(offset)}
                    disabled={newItemLoading}
                    style={{display: ended ? 'none' : 'block'}}>
                <div className="inner">load more</div>
            </button>
        </div>
    );
}

export default ComicsList;