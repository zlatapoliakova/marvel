import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage as FormikErrorMessage} from 'formik';
import * as Yup from 'yup';

import useMarvelServices from '../../services/MarvelServices';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './searchForm.scss';

const setContent = (process, Component, data) => {
    switch(process) {
        case 'waiting':
            return;
        case 'loading':
            return;
        case 'confirmed':
            return data.length > 0 ? 
                <Component data={data} />: 
                <div className='form_error'>
                    The character was not found. Check the name and try again
                </div>; 
        case 'error':
            return <div className='form_gif-error'><ErrorMessage/></div>;
        default:
            throw new Error('Unexpected state process');
    }
}

const SearchForm = () => {
    
    const {getCharactersByName, clearError, process, setProcess} = useMarvelServices();
    const [chars, setChars] = useState([]);

    const onCharLoaded = (char) => {
        setChars(char);
    }

    const updateChar = (name) => {
        clearError();

        getCharactersByName(name)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    return (
        <div className="form">
            <Formik
                initialValues={{name: ""}}
                validationSchema={Yup.object({
                    name: Yup.string().required("This field is required")
                })}
                onSubmit={(values, {setSubmitting}) => {
                    updateChar(values.name);
                    setSubmitting(false);
                }}>
                {({isSubmitting}) => (
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
                                disabled={isSubmitting}>
                                <div className="inner">
                                    FIND
                                </div>
                            </button>
                        </div>
                        <FormikErrorMessage className="form_error" name="name" component="div"/>
                    </Form>
                )}   
            </Formik>
            {setContent(process, SuccessMessage, chars)}
        </div>
    );
}

const SuccessMessage = ({data}) => {
    return(
        <div className='form_success'>
            <div className="form_success_text">There is! Visit {data[0].name} page?</div>
            <Link to={`/characters/${data[0].id}`}>
                <button className="button button__secondary" >
                    <div className="inner">
                        To page
                    </div>
                </button> 
            </Link>
        </div>
    );
}

export default SearchForm;