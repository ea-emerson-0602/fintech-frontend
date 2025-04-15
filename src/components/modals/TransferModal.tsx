import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axiosInstance";
import { useNavigate } from "react-router-dom";

interface TransferValues {
  amount: number;
  recipientEmail: string; // Change email to recipientEmail
  description?: string;
}

interface TransferProps {
  setShowModal: (show: boolean) => void;
}

const TransferModal: React.FC<TransferProps> = ({ setShowModal }) => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const initialValues: TransferValues = {
    amount: 0,
    recipientEmail: "", // Change email to recipientEmail
    description: "",
  };

  const [, setStep] = useState(1);

  const validationSchema = Yup.object({
    amount: Yup.number()
      .positive("Amount must be positive")
      .required("Amount is required"),
    recipientEmail: Yup.string() // Change email to recipientEmail
      .email("Invalid email address")
      .required("Recipient email is required"),
  });

  const handleSubmit = async (
    values: TransferValues,
    { setSubmitting, setErrors }: any
  ) => {
    try {
      await axiosInstance.post("/wallet/transfer", values);
      setShowSuccess(true); // Show success notification

      // Close modal after 2 seconds
      setTimeout(() => {
        setShowModal(false);
        setShowSuccess(false);
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      setErrors({
        general: error.response?.data?.message || "Transfer failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl px-6 py-12 w-[95%] max-w-md relative">
        <span className="absolute top-4 left-4 text-black text-2xl font-bold">
          Transfer
        </span>
        <button
          onClick={() => {
            setStep(1);
            setShowModal(false);
          }}
          className="absolute top-0 right-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        {/* Success Notification Popup */}
        {showSuccess && (
          <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center rounded-xl z-10">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
              Transfer successful!
            </div>
            <svg
              className="w-12 h-12 text-green-500 animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        )}

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors }) => (
            <Form className="space-y-4">
              <div>
                <label htmlFor="amount" className="block font-medium mb-1">
                  Amount
                </label>
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
                <label
                  htmlFor="recipientEmail"
                  className="block font-medium mb-1"
                >
                  Recipient Email
                </label>
                <Field
                  type="email"
                  name="recipientEmail" // Change email to recipientEmail
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter recipient email"
                />
                <ErrorMessage
                  name="recipientEmail" // Change email to recipientEmail
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div>
                <label htmlFor="description" className="block font-medium mb-1">
                  Description (Optional)
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter a description (optional)"
                  rows={3}
                />
              </div>

              {(errors as any).general && (
                <div className="text-red-500 text-sm mt-1">
                  {(errors as any).general}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 bg-[#F9D900] hover:bg-yellow-500 font-semibold rounded disabled:opacity-50"
              >
                {isSubmitting ? "Processing..." : "Transfer"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default TransferModal;
