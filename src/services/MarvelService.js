import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
    const {loading, request, error, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=53ce06b11c9f1f53d6d3422ecf314d54';
    const _baseOffset = 1;
    
   

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`); 
        return res.data.results.map(_transformCharacter);        
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`); 
        return _transformCharacter(res.data.results[0]);
    }

    const getCharacterByName = async (name) => {
        if (name) {
            const res = await request(`${_apiBase}characters?name=${name}&${_apiKey}`); 
            return _transformCharacter(res.data.results[0]);
        }
        return null;
    }

    const getAllComics = async (offset = 0) => {        
        const res = await request(`${_apiBase}comics?limit=8&&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComic);
    }

    const getComic = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		return _transformComic(res.data.results[0]);
	};

    const _transformCharacter = (char) => { 
        if (char) {
            return {
                id: char.id,
                name: char.name,
                description: char.description ? `${char.description.slice(0,255)}...` : 'There is no character discription',
                thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
                homepage:char.urls[0].url,
                wiki: char.urls[1].url,
                comics: char.comics.items
            }
        } else {
            return null;
        }
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description || "There is no description",
            pageCount: comic.pageCount	? `${comic.pageCount} p.` : "No information about the number of pages",
            language: comic.textObjects[0]?.language || "en-us",
            thumbnail: comic.thumbnail.path + '.' + comic.thumbnail.extension,
            price: comic.prices[0].price ? `${comic.prices[0].price}$`: 'not available'         
        }
    }

    return {
        loading, 
        error,
        process,
        setProcess, 
        clearError,
        getAllCharacters, 
        getCharacter, 
        getCharacterByName, 
        getAllComics, 
        getComic        
    }
}

export default useMarvelService;