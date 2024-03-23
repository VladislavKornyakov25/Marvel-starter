import React, { Component } from 'react';

import PropTypes from 'prop-types'
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
	state = {
		characters : [],
		loading: true,
		error: false,
		newItemLoading: false,
		offset: 1541,
		charEnded: false		
	}
	myRef = React.createRef();

	marvelService = new MarvelService();

	componentDidMount() {
		this.onRequest();
	}

	onRequest = (offset) => {
		this.onCharactersLoading();
		this.marvelService.getAllCharacters(offset)
			.then(this.onCharactersLoaded)
			.catch(this.onError)
	}
	onCharactersLoading = () => {
		this.setState({
			newItemLoading: true
		});
	}

	onCharactersLoaded = (newCharacters) => {	
		let ended = false;
		if (newCharacters.length < 9) {
			ended = true;
		}		
		
		this.setState(({offset, characters}) => ({
			characters: [...characters, ...newCharacters],
			loading: false,
			newItemLoading: false,
			offset: offset + 9,
			charEnded: ended
		}));
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		});
	}

	itemRefs = [];

    setRef = (ref) => {
        this.itemRefs.push(ref);
    }

	focusOnItem = (id) => {
		this.itemRefs.forEach(item => item.classList.remove('char__item_selected'));
        this.itemRefs[id].classList.add('char__item_selected');
        this.itemRefs[id].focus();
	}

	render() {		
		const {characters, loading, error, offset, newItemLoading, charEnded} = this.state;
		
		const elements = characters.map((item, i) => {
			let imgStyle = {'objectFit' : 'cover'};
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = {'objectFit' : 'contain'};
			}
			
			return (
				<li 
					key={item.id} 
					tabIndex={0}	
					ref={this.setRef}			
					className="char__item"
					onClick={() => {
						this.props.onCharSelected(item.id);	
						this.focusOnItem(i);

					}}
					onKeyDown={(e) => {
                        if (e.key === ' ' || e.key === "Enter") {
                            this.props.onCharSelected(item.id);
                            this.focusOnItem(i);
                        }
                    }}> 
						<img src={item.thumbnail} alt={item.name} style={imgStyle}/>
						<div className="char__name">{item.name}</div>
				 </li>
			)
			
		});

		const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? elements : null;

		return (
			<div className="char__list">
				<ul className="char__grid">
					{errorMessage}
					{spinner} 					
					{content}                    
				</ul>
				<button 
					className="button button__main button__long"
					disabled={newItemLoading}
					style={{'display': charEnded ? 'none' : 'block'}}
					onClick={() => this.onRequest(offset)}>
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}
CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
}

export default CharList;