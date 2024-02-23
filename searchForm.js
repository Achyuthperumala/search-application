import React from 'react';
import {Formik,Form,Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


const validationSchema = Yup.object().shape({
  query: Yup.string().required('Search query is required'),
});

const SearchForm = () => {
  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/todos?q=${values.query}`);
      console.log(response.data); // Display fetched data
      actions.setSubmitting(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      actions.setSubmitting(false);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{ query: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}> {({ isSubmitting }) => (<Form>
            <Field type="text" name="query" placeholder="Search..." />
            <ErrorMessage name="query" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Search
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SearchForm;
