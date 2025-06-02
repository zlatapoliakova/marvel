import { useParams } from "react-router-dom";
import SingleInfoPage from "../components/singleInfoPage/SingleInfoPage";
import useMarvelServices from "../services/MarvelServices";

import './singleComicPage.scss';

const SingleCharPage = () => {

    const {charId} = useParams();

    const {getCharacter} = useMarvelServices();

    return(
        <SingleInfoPage 
            id={charId}
            getData={getCharacter}
            initialValue={null}
            viewLink={false} />
    );
}

export default SingleCharPage;