import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface TransferValues {
  recipientEmail: string;
  amount: number;
  note?: string;
}

const Transfer: React.FC = () => {
  const navigate = useNavigate();
  const initialValues: TransferValues = { recipientEmail: '', amount: 0, note: '' };

  const validationSchema = Yup.object({
    recipientEmail: Yup.string().email('Invalid email format').required('Recipient email is required'),
    amount: Yup.number().positive('Amount must be positive').required('Amount is required'),
    note: Yup.string(),
  });

  const handleSubmit = async (values: TransferValues, { setSubmitting, setErrors }: any) => {
    try {
      await axiosInstance.post('/wallet/transfer', values);
      navigate('/dashboard');
    } catch (error: any) {
      setErrors({ general: error.response.data.message || 'Transfer failed' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Transfer Funds</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            {/* {errors.general && <div className="error">{errors.general}</div>} */}
            <div>
              <label htmlFor="recipientEmail">Recipient Email</label>
              <Field type="email" name="recipientEmail" />
              <ErrorMessage name="recipientEmail" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="amount">Amount</label>
              <Field type="number" name="amount" />
              <ErrorMessage name="amount" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="note">Optional Note</label>
              <Field as="textarea" name="note" />
              <ErrorMessage name="note" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>Transfer</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Transfer;
