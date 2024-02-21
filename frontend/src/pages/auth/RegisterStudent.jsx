import { Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Input, Label, PasswordInput } from "../../components/ui/Input";
import { Button, GoogleAuthButton } from "../../components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function RegisterStudent() {
  const registerSchema = Yup.object().shape({
    fullName: Yup.string().required("Full Name is required"),
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 6 characters"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string().required("Phone is required").min(10, "Invalid Phone"),
  });
  return (
    <div className="md:max-w-2xl mx-auto rounded-lg border border-solid border-gray-500 p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">CREATE ACCOUNT</h1>
        <Link to={"/auth/student/login"}>
          <span className="text-blue-800 underline">Login</span>
        </Link>
      </div>
      <div className="border border-solid border-slate-100 mt-5"></div>
      <Formik
        initialValues={{
          fullName: "",
          email: "",
          password: "",
          confirmPassword: "",
          phone: "",
        }}
        validationSchema={registerSchema}
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
            <div className="mt-5 flex justify-between">
              <div className="w-[48%]">
                <Label htmlFor="fullName" name="fullName">
                  Full Name
                </Label>
                <Input
                  type="text"
                  name="fullName"
                  id="fullName"
                  placeholder={"John Doe"}
                  value={values.fullName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.fullName && touched.fullName && (
                  <div className="text-red-500 mt-2">{errors.fullName}</div>
                )}
              </div>
              <div className="w-[48%]">
                <Label htmlFor="email" name="email">
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder={"johndoe@gmail.com"}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <div className="text-red-500 mt-2">{errors.email}</div>
                )}
              </div>
            </div>
            <div className="mt-5 flex justify-between">
              <div className="w-[48%]">
                <Label htmlFor="password" name="password">
                  Password
                </Label>
                <PasswordInput
                  name="password"
                  id="password"
                  placeholder={"********"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <div className="text-red-500 mt-2">{errors.password}</div>
                )}
              </div>
              <div className="w-[48%]">
                <Label htmlFor="confirmPassword" name="confirmPassword">
                  Confirm Password
                </Label>
                <PasswordInput
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder={"********"}
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="text-red-500 mt-2">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-5">
              <Label htmlFor="phone" name="phone">
                Mobile Number
              </Label>
              <Input
                type="text"
                name="phone"
                id="phone"
                placeholder={"1234567890"}
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.phone && touched.phone && (
                <div className="text-red-500 mt-2">{errors.phone}</div>
              )}
            </div>
            <div className="mt-5">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-800 hover:bg-blue-900 text-white"
              >
                Register
                <ArrowRight size={20} />
              </Button>
            </div>
            <div className="mt-5">
              <GoogleAuthButton className="w-full">
                Register with Google
              </GoogleAuthButton>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
