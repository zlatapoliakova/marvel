import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../../components/errorMessage/ErrorMessage';
import Spinner from '../../components/spinner/Spinner';

import './singleInfoPage.scss';

const SingleInfoPage = ({id, getData, initialValue, viewData, viewLink}) => {
    const {loading, error} = useMarvelServices();

    const [info, setInfo] = useState(initialValue);
    
    useEffect(() => {
        updateInfo();
    }, [id])

    const updateInfo = () => {
        getData(id)
            .then(loadData);
    }

    const loadData = (info) => {
        setInfo(info);
    }

    const errorMsg = error ?  <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content  = !(error || loading || !info) ? <View info={info} data={viewData} link={viewLink}/> : null;

    return (
        <>
            {errorMsg}
            {spinner}
            {content}
        </>
    );
}

const View = ({info, data, link}) => {

    const {title, name, description, pageCount, languages, prices, thumbnail} = info;
    const checkData = data === 'comic' ? title : name;

    return (
        <div className="single-info">
            <img src={thumbnail} alt={checkData} className="single-info__img"/>
            <div className="single-info__info">
                <h2 className="single-info__name">{checkData}</h2>
                <p className="single-info__descr">{description}</p>
                {
                    data === 'comic' ? 
                    <>
                        <p className="single-info__descr">{pageCount}</p>
                        <p className="single-info__descr">Language: {languages}</p>
                        <div className="single-info__price">{prices}</div>
                    </> : null
                }
            </div>
            {
                link ? 
                    <Link to="/comics" className="single-info__back">Back to all</Link>
                : null
            }
        </div>
    );
}

export default SingleInfoPage;