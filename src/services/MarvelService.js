

class MarevelService {
    _apiBAse = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=53ce06b11c9f1f53d6d3422ecf314d54';
    getResource = async (url) => {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBAse}characters?limit=9&offset=210&${this._apiKey}`);
    }

    getCharacter = (id) => {
        return this.getResource(`${this._apiBAse}characters/${id}?&${this._apiKey}`);
    }
}

export default MarevelService;