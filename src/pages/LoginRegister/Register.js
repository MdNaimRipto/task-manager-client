import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom"
import GoogleLogin from './GoogleLogin';

const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm()
    const [registerError, setRegisterError] = useState('')

    const handleRegister = (data) => {

    }
    return (
        <div className="w-[96%] md:w-[50%] lg:w-[35%] mx-auto my-20 border border-gray-400 py-8 px-5 rounded-lg">
            <h2 className='text-3xl font-semibold text-center mb-4'>Please Register</h2>
            <form
                onSubmit={handleSubmit(handleRegister)}
            >
                <input className='w-full py-4 px-2 rounded-xl border border-gray-400 my-3'
                    type="name"
                    {...register("name", { required: "Name is Required" })}
                    aria-invalid={errors.name ? true : false}
                    placeholder='Enter Name'
                    required />
                {
                    errors.name &&
                    <p role="alert"
                        className='text-red-500 font-semibold'>
                        {errors.name?.message}
                    </p>
                }
                <input className='w-full py-4 px-2 rounded-xl border border-gray-400 my-3'
                    type="email"
                    {...register("email", { required: "Email Address is Required" })}
                    aria-invalid={errors.email ? true : false}
                    placeholder='Enter Email'
                    required />
                {
                    errors.email &&
                    <p role="alert"
                        className='text-red-500 font-semibold'>
                        {errors.email?.message}
                    </p>
                }
                <input className='w-full py-4 px-2 rounded-xl border border-gray-400 my-3'
                    type="password"
                    {...register("password",
                        {
                            required: "Password Required",
                            minLength: {
                                value: 6,
                                message: "Password Must Be At Least 6 Characters or Higher"
                            },
                            pattern: {
                                value: /(?=.*[A-Z])(?=.*[0-9])/,
                                message: "Password Must an Uppercase and a Number"
                            }
                        })}
                    aria-invalid={errors.password ? true : false}
                    placeholder='Enter Password'
                    required />
                {
                    errors.password &&
                    <p role="alert"
                        className='text-red-500 font-semibold'>
                        {errors.password?.message}
                    </p>
                }
                {
                    registerError &&
                    <p className='text-red-500 text-center my-3 font-semibold'>
                        {registerError}
                    </p>
                }
                <input
                    className='cursor-pointer w-full py-4 px-2 rounded-xl bg-[#6589e7] text-white text-xl font-semibold my-3'
                    type="submit"
                    value="Register" />
            </form>
            <p className='text-sm text-center font-semibold mt-3 mb-5'>
                Already Have an Account?
                <Link to="/login" className='text-[#6589e7] ml-1'>Login Now</Link>
            </p>
            <fieldset className="border-t border-gray-400">
                <legend className="mx-auto px-4 text-2xl">Or</legend>
            </fieldset>
            <GoogleLogin />
        </div>
    );
};

export default Register;