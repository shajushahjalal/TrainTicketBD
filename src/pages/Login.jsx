import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { FaUser, FaLock, FaTimes } from 'react-icons/fa'
import { login } from '../states/authenticationSlice';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup'
import { Dialog } from '@headlessui/react';
import img from '../assets/image/login_bg.png'
import { userLogin } from '../service/ApiService';
import axios from '../axios/index';


export default function Login({openModal, closeModal}) {

  const dispatch = useDispatch();
  const [btnDisable, setBtnDisable] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async(values) => {
    setBtnDisable(true);
    setErrorMessage("");
    try{
      const response = await userLogin(values);
      if(response?.status == 200){
        const token = response?.data?.data?.token;
        dispatch((login(token)));
        closeModal();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }else{
        setErrorMessage(response?.error?.messages[0] ?? "Error Try again later");
      }
    }catch(error){
      //
    }
    setBtnDisable(false);
  }

  const initialValue = {
    mobile_number : "",
    password : "",
  }
  
  const validationSchema = Yup.object({
    mobile_number: Yup.string().min(11).required("Phone is required"),
    password: Yup.string().min(6).required("Password is required"),
  })



  return (
    <>
      <Dialog open={openModal} onClose={closeModal} className="relative z-10">
        <div
          className="fixed inset-0 dark:bg-gray-900/50 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div              
              className="relative transform overflow-hidden rounded-lg dark:bg-gray-800 bg-[#F1F1F4] text-left shadow-xl outline -outline-offset-1 outline-white/10 transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-2xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <button 
                className='absolute top-3 right-3'
                onClick={()=> closeModal(false)}
              >
                <FaTimes className='text-red-500' />
              </button>
              <div className="flex">
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
                                type="text"
                                name="mobile_number"
                                placeholder="01*******67"
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
                            {errorMessage?.length > 0 &&
                              <p className='text-red-500 pt-1 font-bold'>{errorMessage}</p>
                            }
                          </div>

                            <div>                              
                              <button
                                disabled={btnDisable}
                                type="submit"
                                className={`w-full btn border rounded-md bg-green-800 text-white ${btnDisable ? 'cursor-not-allowed opacity-80' : ''}`}
                              >
                                Login
                              </button>
                            </div>
                          </Form>
                        )
                      }}
                    </Formik>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
    
  )
}