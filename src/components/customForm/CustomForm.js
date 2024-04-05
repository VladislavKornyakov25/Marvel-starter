import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';

import './CustomForm.scss';

const MyTextInput = ({label, ...props}) => {
    const [field, meta] = useField(props);   
    
    return (
        <>           
            <input {...props} {...field} placeholder='Enter name'/>
            <button 
                className="button button__main find-button" 
                type="submit">
                <div className="inner">FIND</div>
            </button>
            {
                meta.touched && meta.error ? 
                (
                    <div className='error'>{meta.error}</div>
                ) 
                : null
            }
            
        </>
    )
}


const CustomForm = () => {
    const {loading, error, clearError, getCharacterByName} =  useMarvelService();
    const [character, setCharacter] = useState();
    const [response, setResponse] = useState(null);   
    
    useEffect(() => {    
        console.log('useEffect');    
        onRequest(character);
    }, []); 

    const onRequest = (character) => {
        clearError();	
        if (character) {
            getCharacterByName(character)
			    .then(onCharacterLoaded)		
        }			
			
	}
    
    const onCharacterLoaded = (character) => {               
        setCharacter(character);   
        if (character) {
            setResponse(`There is! Visit ${character.name} page?`);            
        } else {
            setResponse('error');
        }
          
    }
 

    return (
        <Formik
            initialValues={{
                name: ''                
            }}
            validationSchema = {Yup.object({
                name: Yup.string()
                        .min(2, 'At least 2 symbols!!!')
                        .required('Required field!')                
            })}
            onSubmit={values => onRequest(values.name)}>

            <Form className="form">
                <h2>Or find character by name:</h2>
                
                <MyTextInput                   
                    id="name"
                    name="name"
                    type="text"   
                />               
                
                
                {
                    response !== 'error' && response !== null
                    ?                     
                        <div> 
                            <div className="resultSpan">{response}</div> 
                            <button className="button button__secondary">
                                <Link to={`/${character.id}`} style={{'display': 'block'}}>
                                    <div className="inner">TO PAGE</div>
                                </Link>                               
                            </button>
                        </div>
                    : response !== null 
                        ? 'The character was not found.'
                        : null
                }
                
            </Form>
        </Formik>
    )
}

export default CustomForm;