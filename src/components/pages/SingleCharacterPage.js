import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AppBanner from '../appBanner/AppBanner';

import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import './singleComicPage.scss';

const SingleCharacterPage = () => {
    const {characterId} = useParams();
    const [character, setCharacter] = useState(null);

    const {getCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {        
        updateCharacter();
        // eslint-disable-next-line 
    }, [characterId]); 
    
    const updateCharacter = () => {         
        clearError();
        getCharacter(characterId)
            .then(onCharacterLoaded)
            .then(() => setProcess('confirmed'));                       
    }

    const onCharacterLoaded = (character) => {               
        setCharacter(character);       
    } 

    return (
        <>
            <AppBanner/>
           {setContent(process, View, character)}
        </>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail} = data;
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