import { useHttp } from "../hooks/http.hook";

const useMarvelServices = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const _offsetBase = 0;
    const _limitBase = true;

    const getAllCharacters = async (offset = _offsetBase, limit = _limitBase) => {
        const res = await request(`${_apiBase}characters?${limit ? `limit=9` : ''}&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharactersByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    };

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    };

    const getAllComics = async (offset = _offsetBase) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    };

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name, 
            description: char.description,
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        };  
    };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description || 'There is no description',
            pageCount: comics.pageCount ? `${comics.pageCount} pages` : 'No information about the number of pages',
            prices: comics.prices[0].price ?  `${comics.prices[0].price}$` : 'Not avialable',
            languages: comics.textObjects[0]?.language || 'en-us',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension
        };
    };

    return {
        clearError, 
        getAllCharacters, 
        getCharacter, 
        getAllComics, 
        getComic, 
        getCharactersByName,
        process, 
        setProcess
    };
};

export default useMarvelServices;