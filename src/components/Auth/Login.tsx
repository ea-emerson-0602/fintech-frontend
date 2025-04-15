import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "./AuthLayout";
import axios from "axios";

interface LoginValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const initialValues: LoginValues = { email: "", password: "" };
  const [showPassword, setShowPassword] = useState(false);
  const [, setStatus] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (
    values: any,
    { setSubmitting, setErrors }: any
  ) => {
    try {
      const response = await axiosInstance.post("/auth/login", values);
      const { user_details } = response.data;

      setUser({ email: user_details.email }); // No need to store token
      navigate("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setStatus(error.response.data?.message || "Login failed");
      } else {
        setStatus("Login failed");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="Login">
      <div className="lg:min-h-screen h-screen flex items-center justify-center px-4">
        <div className="bg-white lg:p-8 rounded-2xl w-full max-w-md">
          <h2 className="text-2xl font-bold lg:mb-6">Sign in to Beam.</h2>
          <p className="text-sm my-4 lg:my-6">
            Please sign in with your assigned login details
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, values }) => (
              <Form className="">
                {(errors as any).general && (
                  <div className="text-red-500 text-sm mt-1">
                    {(errors as any).general}
                  </div>
                )}
                -
                <div className="lg:mb-8 mb-4">
                  <label
                    htmlFor="email"
                    className="block text-sm  font-medium text-gray-500"
                  >
                    Email Address
                  </label>
                  <Field
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-3 py-2 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm  "
                  />
                </div>
                <div className="lg:mb-8 mb-4">
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
                      className="w-full px-3 py-2 border text-black rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white"
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
                <div className="flex mt-3 text-xs mb-6 text-gray-700  justify-between w-full">
                  <div className="flex justify-between w-full">
                    <p className="">
                      Don&apos;t have an account?{" "}
                      <Link
                        to="/register"
                        className="text-blue-600 hover:underline"
                      >
                        Register
                      </Link>
                    </p>
                    <label htmlFor="terms" className=" ">
                      <span>Forgot Password?</span>
                    </label>
                  </div>
                </div>
                <ErrorMessage
                  name="terms"
                  component="div"
                  className="text-red-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2 text-white rounded-full transition ${
                    values
                      ? "bg-black hover:bg-gray-700"
                      : "bg-gray-500 cursor-not-allowed"
                  }`}
                >
                  {isSubmitting ? "Logging in..." : "Log in"}
                </button>
              </Form>
            )}
          </Formik>{" "}
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
