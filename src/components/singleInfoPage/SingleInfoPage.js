import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import Spinner from '../../components/spinner/Spinner';

const SingleInfoPage = ({Component, getData}) => {

    const {id} = useParams();
    const {loading, error, getCharacter, getComic, clearError} = useMarvelServices();

    const [data, setData] = useState(null);
    
    useEffect(() => {
        updateData();
    }, [id])

    const updateData = () => {
        clearError();

        switch(getData) {
            case "comic":
                getComic(id).then(onDataLoaded)
                break;
            case "character":
                getCharacter(id).then(onDataLoaded);
        }
    }

    const onDataLoaded = (data) => {
        setData(data);
    }

    const errorMsg = error ?  <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content  = !(error || loading || !data) ? <Component data={data} /> : null;

    return (
        <>
            {errorMsg}
            {spinner}
            {content}
        </>
    );
}

export default SingleInfoPage;