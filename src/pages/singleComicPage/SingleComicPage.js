import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import './singleComicPage.scss';

const SingleComicPage = ({data}) => {

    const {title, description, pageCount, languages, prices, thumbnail} = data;

    return (
        <div className="single-info">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                    />
                <title>{title}</title>
            </Helmet>
            <img src={thumbnail} alt={title} className="single-info__img"/>
            <div className="single-info__info">
                <h2 className="single-info__name">{title}</h2>
                <p className="single-info__descr">{description}</p>
                <p className="single-info__descr">{pageCount}</p>
                <p className="single-info__descr">Language: {languages}</p>
                <div className="single-info__price">{prices}</div>
            </div>
            <Link to="/comics" className="single-info__back">Back to all</Link>
        </div>
    );
}

export default SingleComicPage;