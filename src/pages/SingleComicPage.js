import { useParams } from 'react-router-dom';

import useMarvelServices from '../services/MarvelServices';

import './singleComicPage.scss';
import SingleInfoPage from '../components/singleInfoPage/SingleInfoPage';

const SingleComicPage = () => {
    const {comicId} = useParams();

    const {getComic} = useMarvelServices();

    return (
        <SingleInfoPage 
            id={comicId} 
            getData={getComic} 
            initialValue={null}
            viewData="comic"
            viewLink={true} />
    );
}

export default SingleComicPage;