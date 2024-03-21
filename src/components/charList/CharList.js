import { Component } from 'react';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {
	state = {
		characters : []		
	}

	marvelService = new MarvelService();

	componentDidMount() {
		this.getAllCharacters();
	}

	onCharactersLoaded = (characters) => {		
		this.setState({
			characters,
			loading: false                     
		});
	}

	onError = () => {
		this.setState({
			loading: false,
			error: true
		});
	}

	getAllCharacters = () => {		
		this.marvelService.getAllCharacters()
			.then(this.onCharactersLoaded)
			.catch(this.onError);        
	}


	render() {		
		const {characters} = this.state;
		
		const elements = characters.map(item => {
			let imgStyle = {'objectFit' : 'cover'};
			if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
				imgStyle = {'objectFit' : 'contain'};
			}
			return (
				<li 
					key={item.id} 
					className="char__item char__item"
					onClick={() => this.props.onCharSelected(item.id)}>
						<img src={item.thumbnail} alt={item.name} style={imgStyle}/>
						<div className="char__name">{item.name}</div>
				 </li>
			)
			
		})

		return (
			<div className="char__list">
				<ul className="char__grid"> 					
					{elements}                    
				</ul>
				<button className="button button__main button__long">
					<div className="inner">load more</div>
				</button>
			</div>
		)
	}
}

export default CharList;