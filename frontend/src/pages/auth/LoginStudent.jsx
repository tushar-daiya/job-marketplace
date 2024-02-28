import { Formik } from "formik";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Input, Label, PasswordInput } from "../../components/ui/Input";
import { Button, GoogleAuthButton } from "../../components/ui/Button";
import { ArrowRight } from "lucide-react";
import { useLoginMutation } from "../../store/features/api/studentApiSlice";
import { toast } from "sonner";
import Spinner from "../../components/ui/Spinner";
export default function LoginStudent() {
  const navigate = useNavigate();
  console.log(document.cookie.split(";"));
  const [loginUser, { data, error, isLoading, isSuccess, isError }] =
    useLoginMutation();
  useEffect(() => {
    if (isSuccess) {
      toast.success("Login Successful");
      // navigate("/student/dashboard");
    }
    if (isError) {
      toast.error(error.message);
    }
  }, [isLoading, isSuccess, isError]);
  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid Email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 6 characters"),
  });
  return (
    <div className="md:max-w-xl mx-auto rounded-lg border border-solid border-gray-500 p-8">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-xl">SIGN IN</h1>
        <Link to={"/auth/student/register"}>
          <span className="text-blue-800 underline">Create an account</span>
        </Link>
      </div>
      <div className="border border-solid border-slate-100 mt-5"></div>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          await loginUser(values);
          setSubmitting(false);
          resetForm();
          // navigate("/student/dashboard");
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
              <Label htmlFor="email" name="email">
                Email
              </Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <div className="text-red-500 mt-2">{errors.email}</div>
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
              <Link to={"/student/forgot-password"}>
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
                {isSubmitting ? (
                  <Spinner />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={20} />
                  </>
                )}
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
