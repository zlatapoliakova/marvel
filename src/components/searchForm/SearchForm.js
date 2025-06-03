import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';

import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './searchForm.scss';

const SearchForm = () => {
    
    const {loading, error, getCharactersByName, clearError} = useMarvelServices();
    const [chars, setChars] = useState(null);

    const onCharLoaded = (char) => {
        setChars(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharactersByName(name)
            .then(onCharLoaded);
    }

    const errorMsg = error ? <div className='form_gif-error'><ErrorMessage/></div> : null;
    const result = !chars ? null : chars.length > 0 ?  
                    <div className='form_success'>
                        <div className="form_success_text">There is! Visit {chars[0].name} page?</div>
                        <Link to={`/characters/${chars[0].id}`}>
                            <button className="button button__secondary" >
                                <div className="inner">
                                    To page
                                </div>
                            </button> 
                        </Link>
                    </div> :
                    <div className='form_error'>
                        The character was not found. Check the name and try again
                    </div>;

    return (
        <div className="form">
            <Formik
                initialValues={{name: ""}}
                validationSchema={Yup.object({
                    name: Yup.string().required("This field is required")
                })}
                onSubmit={({name}) => {
                    updateChar(name);
                }}>
                <Form>
                    <label htmlFor="name" className='form_title'>Or find a character by name:</label>
                    <div className="form_content">
                        <Field 
                            id="name" 
                            name="name" 
                            type="text"
                            placeholder="Enter name"
                            className="form_field" />
                        <button 
                            className="button button__main"
                            type="submit"
                            disabled={loading}>
                            <div className="inner">
                                FIND
                            </div>
                        </button>
                    </div>
                    <FormikErrorMessage className="form_error" name="name" component="div"/>
                </Form>   
            </Formik>
            {errorMsg}
            {result} 
        </div>
    );
}

export default SearchForm;