import { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../../constants';

const Register = () => {
    const [processing, setProcessing] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault();
        setProcessing(true)

        if (e.target.password.value === e.target.password2.value) {
            const formData = {
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value
            }

            axios.post(`${backendUrl}signup`, formData).then(res => {
                console.log(res.data);
                if (res.data.acknowledged) {
                    setProcessing(false)
                    navigate(`/verify/${e.target.email.value}`);

                }
            }).catch(err => {
                setProcessing(false)
                toast.error(err.response.data.message, {
                    position: "bottom-center"
                })
            })
        } else {
            toast.warn("password didn't match")
        }
    }

    return <form onSubmit={handleSubmit} className='w-screen h-screen flex items-center justify-center'>
        <div className='xl:w-1/3 xl:h-3/5 shadow-2xl p-10 flex flex-col justify-center gap-4 overflow-auto'>
            <h1 className="text-center text-5xl gradient-text font-semibold pb-3">Sign Up</h1>
            <InputField placeholder='Enter your name here' type='text' id='name' name='name' label='name' required={true} />
            <InputField placeholder='Enter your email here' type='email' id='email' name='email' label='Email' required={true} />
            <InputField placeholder='Enter your password here' type='password' id='password' name='password' label='Password' required={true} />
            <InputField placeholder='Confirm your password' type='password' id='password2' name='password2' label='Confirm Password' required={true} />
            {/* <input type="submit" value="submit" className='bg-green-700 inline-block py-3 text-white' /> */}
            <Button processing={processing} type='submit'>{processing ? "Signing up..." : "Sign up"}</Button>
            <p className='text-right'>{"Already have an account?"} <Link to="/login">Log in</Link></p>
        </div>
    </form>;
};

export default Register;