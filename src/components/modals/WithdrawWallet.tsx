import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { Building, CheckCircle, Loader2 } from "lucide-react";

interface WithdrawWalletValues {
  amount: number;
  paymentMethod: string;
}

interface WithdrawWalletProps {
  setShowModal: (show: boolean) => void;
}

const WithdrawWallet: React.FC<WithdrawWalletProps> = ({ setShowModal }) => {
  const navigate = useNavigate();
  const initialValues: WithdrawWalletValues = {
    amount: 0,
    paymentMethod: "bank",
  };
  const [, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validationSchema = Yup.object({
    amount: Yup.number()
      .positive("Amount must be positive")
      .required("Amount is required"),
    paymentMethod: Yup.string().required("Withdrawal method is required"),
  });

  const handleSubmit = async (
    values: WithdrawWalletValues,
    { setErrors }: any
  ) => {
    setIsLoading(true);
    try {
      await axiosInstance.post("/wallet/withdraw", values);
      setShowSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      setErrors({
        general: error.response?.data?.message || "Withdrawal failed",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl px-6 py-12 w-[95%] max-w-md relative">
        <span className="absolute top-4 left-4 text-black text-2xl font-bold">
          Withdraw
        </span>
        <button
          onClick={() => {
            setStep(1);
            setShowModal(false);
          }}
          className="absolute top-0 right-4 text-gray-500 hover:text-black text-2xl font-bold"
          disabled={isLoading}
        >
          &times;
        </button>

        {/* Success Alert Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center rounded-xl z-10">
            <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
            <h3 className="text-xl font-bold text-green-600">
              Withdrawal Successful!
            </h3>
            <p className="text-gray-600 mt-2">Your funds are being processed</p>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="amount" className="block font-medium mb-1">
                  Amount
                </label>
                <Field
                  type="number"
                  name="amount"
                  className="w-full p-2 border border-gray-300 rounded"
                  disabled={isLoading}
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">
                  Withdrawal Method
                </label>
                <div role="group" className="space-y-2">
                  <label className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                    <Field
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      className="accent-yellow-500"
                      disabled={isLoading}
                    />
                    <span className="flex gap-x-3">
                      <Building size={16} /> Bank Transfer
                    </span>
                  </label>
                </div>
                <ErrorMessage
                  name="paymentMethod"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
              {(errors as any).general && (
                <div className="text-red-500 text-sm mt-1">
                  {(errors as any).general}
                </div>
              )}
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-[#F9D900] hover:bg-yellow-500 font-semibold rounded disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Withdraw"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default WithdrawWallet;
