import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';
import Class from './Class'

const UserForm = ({ errors, touched, values, handleSubmit, status }) => {
  const [users, setUsers] = useState([]);
  const [recipes, setRecipes] =useState([]);
  useEffect(() => {
    if (status) {
      setUsers([...users, status]);
    }
  }, [status]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/restricted/data')
    .then(res =>{
        setRecipes(res.data)
    })
  }, []);

  return (
      <>
     
    <div className="user-form">
      <h1>User Form</h1>
      <Form>
        <Field type="text" name="username" placeholder="Username" data-testid="username"/>
        {touched.username && errors.username && (
          <p className="error">{errors.username}</p>
        )}

        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}

        <button type="submit">Submit!</button>
      </Form>
      
    </div>
    <Class recipes={recipes} />
    </>
  );
};


const FormikUserForm = withFormik({
  mapPropsToValues({ username, password}) {
    return {
      password: password || '',
      username: username || ''
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required('Please enter a username'),
    password: Yup.string().required('Please enter a password')
  }),

  handleSubmit(values, { setStatus }) {
    axios
      .post('http://localhost:5000/api/register', values)
      .then(res => {
        setStatus(res.data.token);
      })
      .catch(err => console.log(err.response));
  }
})(UserForm);

export default FormikUserForm;
