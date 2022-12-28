import React, { useContext } from 'react';
import { AuthContext } from '../../ContextProvider/AuthProvider';

const GoogleLogin = () => {
    const { googleLogin } = useContext(AuthContext)

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user
                console.log(user)
            })
            .catch(err => console.error(err))
    }
    return (
        <button
            onClick={handleGoogleLogin}
            className='w-full py-4 px-2 rounded-xl border border-[#6589e7] text-[#6589e7] text-xl font-semibold my-3'>
            Google
        </button>
    );
};

export default GoogleLogin;