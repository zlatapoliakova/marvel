import { Helmet } from 'react-helmet';

import './singleCharPage.scss';

const SingleCharPage = ({data}) => {

    const {name, description, thumbnail} = data;

    return(
        <div className="single-info">
            <Helmet>
                <meta
                    name="description"
                    content={`Page with inforamtion about ${name}`}
                    />
                <title>{name}</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-info__img"/>
            <div className="single-info__info">
                <h2 className="single-info__name">{name}</h2>
                <p className="single-info__descr">{description}</p>
            </div>
        </div>
    );
}

export default SingleCharPage;