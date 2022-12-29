import React from 'react';
import { RotateLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <RotateLoader color="#6589e7" />
        </div>
    );
};

export default Loading;