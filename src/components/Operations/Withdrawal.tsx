import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface FundWalletValues {
  amount: number;
  paymentMethod: string;
}

const FundWallet: React.FC = () => {
  const navigate = useNavigate();
  const initialValues: FundWalletValues = { amount: 0, paymentMethod: 'mock' };

  const validationSchema = Yup.object({
    amount: Yup.number().positive('Amount must be positive').required('Amount is required'),
    paymentMethod: Yup.string().required('Payment method is required'),
  });

  const handleSubmit = async (values: FundWalletValues, { setSubmitting, setErrors }: any) => {
    try {
      await axiosInstance.post('/wallet/withdraw', values);
      navigate('/dashboard');
    } catch (error: any) {
      setErrors({ general: error.response.data.message || 'Funding failed' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Withdraw</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, errors }) => (
          <Form>
            {/* {errors.general && <div className="error">{errors.general}</div>} */}
            <div>
              <label htmlFor="amount">Amount</label>
              <Field type="number" name="amount" />
              <ErrorMessage name="amount" component="div" className="error" />
            </div>
            <div>
              <label htmlFor="paymentMethod">Payment Method</label>
              <Field as="select" name="paymentMethod">
                <option value="mock">Mock Payment</option>
                {/* You can add more payment options as needed */}
              </Field>
              <ErrorMessage name="paymentMethod" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>Withdraw</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FundWallet;
