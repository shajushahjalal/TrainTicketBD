import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { FaUser, FaLock } from 'react-icons/fa'
import { login } from '../states/authenticationSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import RouteConstant from '../route/RouteConstant';
import * as Yup from 'yup'


export default function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    console.log(values)
    const response = {
      userCredential : {user:{email : values.email}},
      access_token : "AAAAAAAAAAAAA",
    }
    dispatch((login(response)));
  }

  const initialValue = {
    phone : "",
    password : "",
  }
  

const validationSchema = Yup.object({
  phone: Yup.string().required("Phone is required"),
  password: Yup.string().min(1).required("Password is required"),
})



  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex w-1/2 items-center justify-center text-white p-10 back bg-cover" style={{ backgroundImage: `url(${img})` }} >
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6 text-white">Welcome Back!</h1>
          <p className="text-lg text-white">Login to access your dashboard.</p>
        </div>
      </div>

      {/* Right Form Section */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-8 ">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center dark:text-white">Login</h2>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            { () => {
              return (
                <Form className="space-y-6">
                  <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-white mb-1">Email</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 bg:white">
                    <FaUser className="text-gray-400 mr-2" />
                    <Field
                      type="email"
                      name="email"
                      placeholder="example@email.com"
                      className="w-full outline-none bg-transparent"
                      required={true}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 dark:text-white">Password</label>
                  <div className="flex items-center border border-gray-300 rounded-md px-3 py-2">
                    <FaLock className="text-gray-400 mr-2" />
                    <Field
                      type="password"
                      name="password"
                      placeholder="••••••••"
                      className="w-full outline-none bg-transparent"
                      required={true}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn border rounded-md bg-primary dark:text-gray-400"
                >
                  Sign In
                </button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  )
}