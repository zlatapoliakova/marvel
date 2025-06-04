import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelServices from '../../services/MarvelServices';
import { setContent } from '../../utils/SetContent';

const SingleInfoPage = ({Component, getData}) => {

    const {id} = useParams();
    const {getCharacter, getComic, clearError, process, setProcess} = useMarvelServices();

    const [data, setData] = useState(null);
    
    useEffect(() => {
        updateData();
    }, [id])

    const updateData = () => {
        clearError();

        switch(getData) {
            case "comic":
                getComic(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            case "character":
                getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                break;
            default:
                throw new Error('Page did not find');
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    return (
        <>
            {setContent(process, Component, data)}
        </>
    );
}

export default SingleInfoPage;