import { useContext, useState } from 'react';
import Button from '../../components/Button/Button';
import InputField from '../../components/InputField/InputField';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { backendUrl } from '../../constants';
import { UserContext } from '../../context/UserContextProvider';

const Login = () => {
    const [processing, setProcessing] = useState(false);
    // const [text, setText] = useState("Login")
    const { setToken } = useContext(UserContext)
    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault();
        setProcessing(true);

        axios.get(`${backendUrl}login/${e.target.email.value}/${e.target.password.value}`).then(res => {
            if (res.data.token) {
                setProcessing(false);
                toast.success("Logged in successfully");
                setToken(res.data.token);
                localStorage.setItem("token", res.data.token);
                navigate("/")
            }

            if (res.data.error) {
                setProcessing(false)
                toast.error(res.data.error)
            }
        })
    }
    return (
        <form onSubmit={handleSubmit} className='w-screen h-screen flex items-center justify-center'>
            <div className='xl:w-1/3 xl:h-1/2 shadow-2xl p-10 flex flex-col justify-center gap-4'>
                <InputField placeholder='Enter your email here' type='email' id='email' name='email' label='Email' required={true} />
                <InputField placeholder='Enter your password here' type='password' id='password' name='password' label='Password' required={true} />
                {/* <input type="submit" value="submit" className='bg-green-700 inline-block py-3 text-white' /> */}
                <Button processing={processing} type='submit'>{processing ? "Logging in..." : "Log in"}</Button>
            </div>
        </form>
    );
};

export default Login;