import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import useMarvelServices from '../../services/MarvelServices';

import './searchForm.scss';

const SearchForm = () => {
    
    const {getAllCharacters} = useMarvelServices();
    const [chars, setChars] = useState([]);
    const [findedChar, setFindedChar] = useState([]);

    useEffect(() => {
        getAllCharacters(0, false)
            .then(items => setChars(items));
    }, [])

    return (
        <Formik
            initialValues={{name: ""}}
            validationSchema={Yup.object({
                name: Yup.string().required("This field is required")
            })}
            onSubmit={(values, {setErrors}) => {
                const lowText = values.name.toLowerCase();
                const found = chars.filter(char => lowText === char.name.toLowerCase());

                if (found.length === 0) {
                    setFindedChar([]);
                    setErrors({name: "The character was not found. Check the name and try again"});
                } else if (found.length > 0){
                    setFindedChar(found);
                }

            }}>
            {({errors}) => (
                <Form className='form'>
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
                            type="submit">
                            <div className="inner">
                                FIND
                            </div>
                        </button>
                    </div>
                    <ErrorMessage className="form_error" name="name" component="div"/>
                    {
                        findedChar && findedChar.length !== 0 && !errors.name ? 
                        <div className='form_success'>
                            <div className="form_success_text">There is! Visit {findedChar[0].name} page?</div>
                            <Link to={`/characters/${findedChar[0].id}`}>
                                <button className="button button__secondary" >
                                    <div className="inner">
                                        FIND
                                    </div>
                                </button> 
                            </Link>
                        </div>
                        : null
                    }
                </Form>
            )}
        </Formik>
    );
}

export default SearchForm;