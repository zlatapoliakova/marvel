import { useHttp } from "../hooks/http.hook";

const useMarvelServices = () => {
    const {loading, error, request, clearError} = useHttp();

    const _apiBase = 'https://marvel-server-zeta.vercel.app/';
    const _apiKey = 'apikey=d4eecb0c66dedbfae4eab45d312fc1df';
    const _offsetBase = 0;

    const getAllCharacters = async (offset = _offsetBase) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _offsetBase) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name, 
            description: char.description ? `${char.description.slice(0, 210)}...` : 'Unfortunally, description is undefined =(',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }  
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description,
            pageCount: comics.pageCount,
            prices: comics.prices[0].price,
            languages: comics.textObjects,
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension
        }
    }

    return {loading, error, clearError, getAllCharacters, getCharacter, getAllComics}
}

export default useMarvelServices;