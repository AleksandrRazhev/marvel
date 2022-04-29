import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../Spinner/Spinner';
import { default as MyErrorMessage } from '../ErrorMessage/ErrorMessage';

import './FindForm.scss';

export default function FindForm() {

  const [search, setSearch] = useState(null);

  const { loading, error, findChar } = useMarvelService();

  const onFind = async (str) => {
    setSearch(null);
    const res = await findChar(str);
    setSearch(res);
    return;
  }

  const char = (search && search.length === 1) ?
    (
      <>
        <p className='form__message'>There is! Visit {search[0].name} page?</p>
        <Link to={`/char/${search[0].id}`} className="form__button form__button-page button">
          <div className="inner">TO PAGE</div>
        </Link>
      </>
    ) :
    null;

  const notFound = (search && search.length !== 1) ?
    <p className='form__message form__message_error'>The character was not found. Check the name and try again</p> :
    null;

  const spinner = loading ? <Spinner /> : null;
  const myErrorMessage = error ? <MyErrorMessage /> : null;

  return (
    <div className='find'>
      <p className='find__title'>Or find a character by name:</p>
      <Formik
        initialValues={{ name: '' }}
        validationSchema={Yup.object({
          name: Yup.string().min(2, 'Слишком мало символов!').required('Обязательное поле!')
        })}
        onSubmit={values => onFind(values.name)}
      >
        <Form className='form'>
          <label className='form__label'>
            <Field className='form__input' name='name' type="text" placeholder='Enter Name' />
          </label>
          <button type='submit' className="form__button button">
            <div className="inner" type='submit'>FIND</div>
          </button>

          <ErrorMessage className='form__message form__message_error' name="name" component="p" />
          {char}
          {notFound}

        </Form>
      </Formik>
      <div className='form-info'>
        {spinner}
        {myErrorMessage}
      </div>
    </div>
  )
}
