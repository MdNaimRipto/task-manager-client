import React from 'react';
import errorImage from "../../Assets/error_page.jpg"
import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <div className='flex justify-center items-center h-screen flex-col'>
            <img src={errorImage} alt="" className='w-[50%] mb-3' />
            <Link
                to="/addTask"
                className='py-4 px-2 rounded-xl bg-[#6589e7] text-white
            text-xl font-semibold my-3 cursor-pointer'
            >Back To Home</Link>
        </div>
    );
};

export default ErrorPage;