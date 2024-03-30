import { useState, useEffect  } from 'react';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { Link } from 'react-router-dom';

import './comicsList.scss';

const ComicsList = () => {
    const [comics, setComics] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();
        
    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {	
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
		getAllComics(offset)
			.then(onComicsLoaded);		
	}

    const onComicsLoaded = (newComics) => {
        let ended = false;

		if (newComics.length < 9) {
			ended = true;
		}
        setComics(comics => [...comics, ...newComics]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            return (
                <li key={i}  className="comics__item">
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </Link>
                </li>
            )
        });
        return (
            <ul className="comics__grid">
                {items}   
            </ul>
        )
    }
    const elements = renderItems(comics);

    const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading && !newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {errorMessage}
			{spinner} 
            {elements}            
            <button 
                disabled={newItemLoading}
                className="button button__main button__long"
                onClick={() => onRequest(offset)}
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;