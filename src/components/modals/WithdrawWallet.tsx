import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

interface WithdrawWalletValues {
  amount: number;
  paymentMethod: string;
}
interface WithdrawWalletProps {
  setShowModal: (show: boolean) => void;
}

const WithdrawWallet: React.FC<WithdrawWalletProps> = ({ setShowModal }) => {

  const navigate = useNavigate();
  const initialValues: WithdrawWalletValues = { amount: 0, paymentMethod: 'bank' };
  
    const [, setStep] = useState(1);

  const validationSchema = Yup.object({
    amount: Yup.number()
      .positive('Amount must be positive')
      .required('Amount is required'),
    paymentMethod: Yup.string().required('Withdrawal method is required'),
  });

  const handleSubmit = async (values: WithdrawWalletValues, { setSubmitting, setErrors }: any) => {
    try {
      await axiosInstance.post('/wallet/withdraw', values);
      setShowModal(false);
      navigate('/dashboard');
    } catch (error: any) {
      setErrors({ general: error.response?.data?.message || 'Withdrawal failed' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl px-6 py-12 w-[95%] max-w-md relative">
        <span className="absolute top-4 left-4 text-black text-2xl font-bold">Withdraw</span>
        <button
          onClick={() => {
            setStep(1); // reset to step 1 when closing, optional
            setShowModal(false);
          }}
          className="absolute top-0 right-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting, errors }) => (
          <Form className="space-y-4">

            <div>
              <label htmlFor="amount" className="block font-medium mb-1">Amount</label>
              <Field
                type="number"
                name="amount"
                className="w-full p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Withdrawal Method</label>
              <div role="group" className="space-y-2">
                <label className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                  <Field
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    className="accent-yellow-500"
                    checked
                  />
                  <span>🏦 Bank Transfer</span>
                </label>
              </div>
              <ErrorMessage
                name="paymentMethod"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-[#F9D900] hover:bg-yellow-500 font-semibold rounded"
            >
              {isSubmitting ? 'Processing...' : 'Withdraw'}
            </button>
          </Form>
        )}
      </Formik>
      </div>
    </div>
  );
};

export default WithdrawWallet;
