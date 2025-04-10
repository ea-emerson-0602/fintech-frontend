import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import google from "../../assets/icons8-google.svg";
import apple from "../../assets/icons8-apple.svg";
import AuthLayout from "./AuthLayout";

interface RegisterValues {
  fullName: string;
  email: string;
  password: string;
  terms: boolean;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const initialValues: RegisterValues = {
    fullName: "",
    email: "",
    password: "",
    terms: false,
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    terms: Yup.boolean().oneOf(
      [true],
      "You must accept the terms and conditions"
    ),
  });

  const handleSubmit = async (
    values: RegisterValues,
    { setSubmitting, setErrors }: any
  ) => {
    try {
      await axiosInstance.post("/auth/register", {
        name: values.fullName,
        email: values.email,
        password: values.password,
      });
      navigate("/login");
    } catch (error: any) {
      setErrors({
        general: error.response?.data?.message || "Registration failed",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Register">
      <div className="lg:min-h-screen h-screen flex items-center justify-center px-4">
        <div className="bg-white lg:p-8 rounded-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold lg:mb-6">Create an account</h2>
          <p className="text-sm my-4 lg:my-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, values }) => (
              <Form className="space-y-4">
                {(errors as any).general && (
                  <div className="text-red-500 text-sm mt-1">
                    {(errors as any).general}
                  </div>
                )}
                <div className="lg:mb-8 mb-4">
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Full Name
                  </label>
                  <Field
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                    className="w-full mt-1 px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full mt-1 px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-500"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Field
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full mt-1 px-3 py-2 text-black border rounded-lg focus:outline-none focus:ring-2 focus:ring-black pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="flex items-start">
                  <Field type="checkbox" name="terms" className="mr-2" />
                  <label htmlFor="terms" className="text-xs text-gray-700">
                    I agree to BeamMarkets{" "}
                    <span className="text-blue-600 underline">
                      Terms of Service{" "}
                    </span>{" "}
                    and{" "}
                    <span className="text-blue-600 underline">
                      Privacy Policy
                    </span>
                  </label>
                </div>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-500 text-sm"
                />

                <button
                  type="submit"
                  disabled={isSubmitting || !values.terms}
                  className={`w-full py-2 text-white rounded-full transition ${
                    values.terms
                      ? "bg-black hover:bg-gray-700"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>

          <div className="relative text-center text-sm text-gray-500 my-4">
            <span className="absolute w-full h-px bg-gray-200 top-1/2 left-0" />
            <span className="relative bg-white px-4">OR SIGNIN WITH</span>
          </div>

          <div className="flex w-full items-center justify-center gap-x-4 ">
            <button
              onClick={() => setShowModal(true)}
              className="px-4 w-24 rounded-full py-2 border flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <img src={google} alt="Sign in with Google" className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowModal(true)}
              className="w-24 py-2 px-4 rounded-full border flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <img src={apple} alt="Sign in with Apple" className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-xl shadow-md text-center max-w-sm w-full">
              <p className="text-lg font-semibold mb-4">
                Signup method unavailable
              </p>
              <p className="text-gray-600 mb-6">
                This signup option is currently not available. Please register
                with your email instead.
              </p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                onClick={() => setShowModal(false)}
              >
                Okay
              </button>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
};

export default Register;
