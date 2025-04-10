import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axiosInstance";
import mastercardIcon from "../../assets/mastercard.svg"; // placeholder
import visaIcon from "../../assets/visa.svg";
import verveIcon from "../../assets/verve.svg";
import { useNavigate } from "react-router-dom";

const cardIcons: Record<string, string> = {
  mastercard: mastercardIcon,
  visa: visaIcon,
  verve: verveIcon,
};

const detectCardType = (cardNumber: string) => {
  if (/^4[0-9]{0,}$/.test(cardNumber)) return "visa";
  if (/^5[1-5][0-9]{0,}$/.test(cardNumber)) return "mastercard";
  if (/^506(0|1)|^507(8|9)|^6500/.test(cardNumber)) return "verve";
  return "";
};
interface FundWalletModalProps {
  setShowModal: (show: boolean) => void;
}

const FundWalletModal: React.FC<FundWalletModalProps> = ({ setShowModal }) => {
    const navigate=useNavigate()
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    accountNumber: "",
    bankName: "",
  });

  const handleSubmit = async () => {
    try {
      const payload = {
        amount: Number(formData.amount),
        paymentMethod: formData.paymentMethod,
      };
      await axiosInstance.post("/wallet/fund", payload);
      setShowModal(false);
      navigate("/dashboard")
      alert("Wallet funded!");
    } catch (err) {
      alert("Funding failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl px-6 py-12 w-[95%] max-w-md relative">
        <span className="absolute top-4 left-4 text-black text-2xl font-bold">
          Payment Option
        </span>
        <button
          onClick={() => {
            setStep(1); // reset to step 1 when closing, optional
            setShowModal(false);
          }}
          className="absolute top-0 right-4 text-gray-500 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        {step === 1 && (
          <Formik
            initialValues={{ amount: "", paymentMethod: "" }}
            validationSchema={Yup.object({
              amount: Yup.number().positive().required("Amount required"),
              paymentMethod: Yup.string().required("Choose a method"),
            })}
            onSubmit={(values) => {
              setFormData((prev) => ({ ...prev, ...values }));
              setStep(2);
            }}
          >
            <Form className="space-y-4">
              <div>
                <label>Amount</label>
                <Field
                  name="amount"
                  type="number"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="amount"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Payment Method</label>
                <div role="group" className="space-y-2">
                  <label className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                    <Field
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      className="accent-yellow-500"
                    />
                    <span>💳 Add Debit/Credit Card</span>
                  </label>

                  <label className="flex items-center space-x-2 p-2 border rounded cursor-pointer hover:bg-gray-50">
                    <Field
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      className="accent-yellow-500"
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
                className="bg-yellow-400 w-full py-2 rounded"
              >
                Continue
              </button>
            </Form>
          </Formik>
        )}

        {step === 2 && formData.paymentMethod === "card" && (
          <Formik
            initialValues={{ cardNumber: "", expiry: "", cvv: "" }}
            validationSchema={Yup.object({
              cardNumber: Yup.string()
                .matches(/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/, "Must be 16 digits")
                .required(),
              expiry: Yup.string()
                .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, "Format MM/YY")
                .required(),
              cvv: Yup.string()
                .matches(/^\d{3}$/, "Must be 3 digits")
                .required(),
            })}
            onSubmit={(values) => {
              setFormData((prev) => ({ ...prev, ...values }));
              handleSubmit();
            }}
          >
            {({ values, setFieldValue }) => {
              const rawCard = values.cardNumber.replace(/\s/g, "");
              const icon = detectCardType(rawCard);
              return (
                <Form className="space-y-4 relative">
                  <div className="relative">
                    <label>Card Number</label>
                    <Field
                      name="cardNumber"
                      type="text"
                      className="w-full p-2 border rounded pr-12"
                      maxLength={19}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const input = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 16);
                        const formatted =
                          input.match(/.{1,4}/g)?.join(" ") || "";
                        setFieldValue("cardNumber", formatted);
                      }}
                    />
                    {icon && (
                      <img
                        src={cardIcons[icon]}
                        className="absolute right-3 top-8 w-6"
                        alt="card"
                      />
                    )}
                    <ErrorMessage
                      name="cardNumber"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label>Expiry Date</label>
                    <Field
                      name="expiry"
                      type="text"
                      className="w-full p-2 border rounded"
                      maxLength={5}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const raw = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4);
                        const formatted =
                          raw.length > 2
                            ? `${raw.slice(0, 2)}/${raw.slice(2)}`
                            : raw;
                        setFieldValue("expiry", formatted);
                      }}
                    />
                    <ErrorMessage
                      name="expiry"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label>CVV</label>
                    <Field
                      name="cvv"
                      type="text"
                      className="w-full p-2 border rounded"
                      maxLength={3}
                    />
                    <ErrorMessage
                      name="cvv"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-yellow-400 w-full py-2 rounded"
                  >
                    Pay Now
                  </button>
                </Form>
              );
            }}
          </Formik>
        )}

        {step === 2 && formData.paymentMethod === "bank" && (
          <Formik
            initialValues={{ accountNumber: "", bankName: "" }}
            validationSchema={Yup.object({
              accountNumber: Yup.string()
                .matches(/^\d{10}$/, "Must be 10 digits")
                .required(),
              bankName: Yup.string().required("Bank name required"),
            })}
            onSubmit={(values) => {
              setFormData((prev) => ({ ...prev, ...values }));
              handleSubmit();
            }}
          >
            <Form className="space-y-4">
              <div>
                <label>Account Number</label>
                <Field
                  name="accountNumber"
                  type="text"
                  maxLength={10}
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="accountNumber"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <div>
                <label>Bank Name</label>
                <Field
                  name="bankName"
                  type="text"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage
                  name="bankName"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-400 w-full py-2 rounded"
              >
                Pay Now
              </button>
            </Form>
          </Formik>
        )}
      </div>
    </div>
  );
};

export default FundWalletModal;
