import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './charInfo.scss';

const CharInfo = (props) => {
    const [char, setChar] = useState(null);
   
	const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {        
        updateChar();
        // eslint-disable-next-line
    }, [props.charId]); 
    
    const updateChar = () => { 
        const {charId} = props;        
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));                       
    }

    const onCharLoaded = (char) => {               
        setChar(char); 

    }

    
    return (
        <div className="char__info">
            {/* {skeleton}
            {errorMessage}
            {spinner}
            {content} */}
            {
                setContent(process, View, char)
            } 
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = data;   
    
    let imgStyle = {'objectFit' : 'cover'};
    
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt="abyss" style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">Homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length === 0 ? 'There is no comics for this character' : null}
                {
                    comics.slice(0,10).map((item, i) => {                       
                        return (
                            <li key={i} className="char__comics-item">
                                <Link to={`/comics/${item.resourceURI.slice(-5)}`}>
                                    {item.name}
                                </Link>
                                
                            </li>
                        )                                               
                    })
                }                
                
            </ul>
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;