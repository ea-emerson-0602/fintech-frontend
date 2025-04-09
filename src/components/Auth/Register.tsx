import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';

interface RegisterValues {
  fullName: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const initialValues: RegisterValues = { fullName: '', email: '', password: '' };

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = async (values: RegisterValues, { setSubmitting, setErrors }: any) => {
    try {
      await axiosInstance.post('/auth/register', values);
      navigate('/login');
    } catch (error: any) {
      // Handle error e.g. error.response.data.errors if provided by backend
      setErrors({ general: error.response.data.message || 'Registration failed' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            {errors && <div className="error">{errors.email}</div>}
            <div>
              <label htmlFor="fullName">Full Name</label>
              <Field type="text" name="fullName" placeholder="John Doe" />
              <ErrorMessage name="fullName" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" name="email" placeholder="john@example.com" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>Register</button>
          </Form>
        )}
      </Formik>
      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default Register;
