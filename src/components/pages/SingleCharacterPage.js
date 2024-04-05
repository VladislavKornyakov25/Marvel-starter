import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';
import './singleComicPage.scss';

const SingleCharacterPage = () => {
    const {characterId} = useParams();
    const [character, setCharacter] = useState(null);

    const {loading, error, getCharacter, clearError} = useMarvelService();

    useEffect(() => {        
        updateCharacter();
    }, [characterId]); 
    
    const updateCharacter = () => {         
        clearError();
        getCharacter(characterId)
            .then(onCharacterLoaded)                       
    }

    const onCharacterLoaded = (character) => {               
        setCharacter(character);       
    }    
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !character) ? <View character={character}/> : null;

    return (
        <>
            <AppBanner/>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({character}) => {
    const {name, description, thumbnail} = character;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>                
            </div>
            <Link to="/" replace className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleCharacterPage;