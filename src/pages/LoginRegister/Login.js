import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom"
import { AuthContext } from '../../ContextProvider/AuthProvider';
import GoogleLogin from './GoogleLogin';
import swal from 'sweetalert';
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const { userLogin } = useContext(AuthContext)
    const { register, formState: { errors }, handleSubmit } = useForm()
    const [loginError, setLoginError] = useState('')

    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const handleLogin = (data) => {
        const email = data.email;
        const password = data.password;
        userLogin(email, password)
            .then(result => {
                const user = result.user
                console.log(user)
                swal({
                    title: "Login Successfully!",
                    text: "Your account logged in successfully!",
                    icon: "success",
                });
                navigate(from, { replace: true })
            })
            .catch(err => {
                console.error(err)
                setLoginError(err)
                swal({
                    title: "Login Unsuccessful!",
                    text: "Your account isn't logged in successfully!",
                    icon: "error",
                });
            })
    }

    return (
        <div className="w-[96%] md:w-[50%] lg:w-[30%] mx-auto my-20 border border-gray-400 py-8 px-5 rounded-lg">
            <h2 className='text-3xl font-semibold text-center mb-4'>Please Login</h2>
            <form
                onSubmit={handleSubmit(handleLogin)}
            >
                <input className='w-full py-4 px-2 rounded-xl border border-gray-400 my-3'
                    type="email"
                    {...register("email", { required: "Email Address is Required" })}
                    aria-invalid={errors.email ? true : false}
                    placeholder='Enter Email'
                    required />
                <input className='w-full py-4 px-2 rounded-xl border border-gray-400 my-3'
                    type="password"
                    {...register("password", {
                        required: "Password is Required"
                    })}
                    aria-invalid={errors.password ? true : false}
                    placeholder='Enter Password'
                    required />
                <input
                    className='cursor-pointer w-full py-4 px-2 rounded-xl bg-[#6589e7] text-white text-xl font-semibold my-3'
                    type="submit"
                    value="Login" />
            </form>
            <p className='text-sm text-center font-semibold mt-3 mb-5'>
                New To Task Manager?
                <Link to="/register" className='text-[#6589e7] ml-1'>Create New Account</Link>
            </p>
            <fieldset className="border-t border-gray-400">
                <legend className="mx-auto px-4 text-2xl">Or</legend>
            </fieldset>
            <GoogleLogin />
            {errors.password &&
                <p role="alert"
                    className='text-red-500 text-center my-3 font-semibold'>
                    {errors.password?.message}
                </p>}
            {errors.email &&
                <p role="alert"
                    className='text-red-500 text-center my-3 font-semibold'>
                    {errors.email?.message}
                </p>}
            {
                loginError &&
                <p className='text-red-500 text-center my-3 font-semibold'>
                    {loginError}
                </p>
            }
        </div>
    );
};

export default Login;