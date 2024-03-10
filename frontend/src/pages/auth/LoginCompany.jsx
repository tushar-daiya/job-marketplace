import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Input, Label, PasswordInput } from "../../components/ui/Input";
import { Button, GoogleAuthButton } from "../../components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function LoginCompany() {
  const loginSchema = Yup.object().shape({
    companyEmail: Yup.string()
      .email("Invalid Email")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 6 characters"),
  });
  return (
    <div className="md:max-w-xl mx-auto rounded-lg border border-solid border-gray-500 p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">SIGN IN</h1>
        <Link to={"/auth/company/register"}>
          <span className="text-blue-800 underline">Create an account</span>
        </Link>
      </div>
      <div className="border border-solid border-slate-100 mt-5"></div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          console.log(values);
          setSubmitting(false);
          resetForm();
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="mt-5">
              <Label htmlFor="companyEmail" name="companyEmail">
                Company Email
              </Label>
              <Input
                type="companyEmail"
                name="companyEmail"
                id="companyEmail"
                value={values.companyEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.companyEmail && touched.companyEmail && (
                <div className="text-red-500 mt-2">{errors.companyEmail}</div>
              )}
            </div>
            <div className="mt-5">
              <Label htmlFor="password" name="password">
                Password
              </Label>
              <PasswordInput
                name="password"
                id="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <div className="text-red-500 mt-2">{errors.password}</div>
              )}
            </div>
            <div className="mt-5">
              <Link to={"/auth/company/forgot-password"}>
                <span className="text-gray-500 underline">
                  Forgot Password?
                </span>
              </Link>
            </div>
            <div className="mt-5">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-800 hover:bg-blue-900 text-white"
              >
                Sign In
                <ArrowRight size={20} />
              </Button>
            </div>
            <div className="mt-5">
              <GoogleAuthButton className="w-full">
                Sign In with Google
              </GoogleAuthButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
