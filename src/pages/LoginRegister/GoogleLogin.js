import React, { useContext } from 'react';
import { AuthContext } from '../../ContextProvider/AuthProvider';
import swal from 'sweetalert';

const GoogleLogin = () => {
    const { googleLogin } = useContext(AuthContext)

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user
                console.log(user)
                swal({
                    title: "Login Successfully!",
                    text: "Your account logged in successfully!",
                    icon: "success",
                });
            })
            .catch(err => {
                console.error(err)
                swal({
                    title: "Login Unsuccessful!",
                    text: "Your account isn't logged in successfully!",
                    icon: "error",
                });
            })
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