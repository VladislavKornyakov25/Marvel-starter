import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'

import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {
	
	const [characters, setCharacters] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [newItemLoading, setNewItemLoading] = useState(false);
	const [offset, setOffset] = useState(210);
	const [charEnded, setCharEnded] = useState(false);
	
	const marvelService = new MarvelService();

	useEffect(() => {
		onRequest();
	}, []);		

	const onRequest = (offset) => {
		onCharactersLoading();
		marvelService.getAllCharacters(offset)
			.then(onCharactersLoaded)
			.catch(onError)
	}

	const onCharactersLoading = () => {
		setNewItemLoading(true);		
	}

	const onCharactersLoaded = (newCharacters) => {	
		let ended = false;

		if (newCharacters.length < 9) {
			ended = true;
		}

		setCharacters(characters =>[...characters, ...newCharacters]);
		setLoading(loading => false);
		setNewItemLoading(newItemLoading => false);
		setOffset(offset => offset + 9);
		setCharEnded(charEnded => ended);
	}

	const onError = () => {
		setError(true);
		setLoading(loading => false);	
	}

	const itemRefs = useRef([]);
	
	const focusOnItem = (id) => {
		itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
	}

	function renderItems(arr) {
		const items = arr.map((item, i) => {
			let imgStyle = {'objectFit' : 'cover'};
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = {'objectFit' : 'contain'};
			}
			
			return (
				<li 
					key={item.id} 
					tabIndex={0}	
					ref={el => itemRefs.current[i] = el}			
					className="char__item"
					onClick={() => {
						props.onCharSelected(item.id);	
						focusOnItem(i);

					}}
					onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }
                    }}> 
						<img src={item.thumbnail} alt={item.name} style={imgStyle}/>
						<div className="char__name">{item.name}</div>
				 </li>
			)
			
		});
		return (
			<ul className="char__grid">
				{items}
			</ul>
		) 
	}

	const elements = renderItems(characters);

	const errorMessage = error ? <ErrorMessage/> : null;
	const spinner = loading ? <Spinner/> : null;
	const content = !(loading || error) ? elements : null;

	return (
		<div className="char__list">
			{errorMessage}
			{spinner} 					
			{content}
			
			<button 
				className="button button__main button__long"
				disabled={newItemLoading}
				style={{'display': charEnded ? 'none' : 'block'}}
				onClick={() => onRequest(offset)}>
				<div className="inner">load more</div>
			</button>
		</div>
	)
	
}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;