import { useState } from "react";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import CustomForm from "../customForm/CustomForm";

import decoration from '../../resources/img/vision.png';

const MainPage =() => {

    const [selectedChar, setChar] = useState(null)
  
    const onCharSelected = (id) => {
        setChar(id);
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>
            </ErrorBoundary>                    
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected}/>
                </ErrorBoundary> 
                <div> 
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar}/>                        
                    </ErrorBoundary>   
                    <ErrorBoundary>
                        <CustomForm/>
                    </ErrorBoundary>
                </div>                       
                           
            </div> 
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage;