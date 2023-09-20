import { useState } from 'react';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { backendUrl } from '../../constants';
import Form from '../../components/Form/Form';

const Register = () => {
    const [processing, setProcessing] = useState(false);

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
                if (res.data.insertedCount) {
                    setProcessing(false);
                    toast.success("Registration Successful. Check your mail to verify your account", {
                        duration: 5000
                    })

                }
            }).catch(err => {
                setProcessing(false)
                toast.error(err.response.data.message, {
                    position: "bottom-center"
                })
            })
        } else {
            toast.warn("password didn't match");
            setProcessing(false)
        }
    }

    return <Form handleSubmit={handleSubmit} heading="Sign Up">
        <InputField placeholder='Enter your name here' type='text' id='name' name='name' label='name' required={true} />
        <InputField placeholder='Enter your email here' type='email' id='email' name='email' label='Email' required={true} />
        <InputField placeholder='Enter your password here' type='password' id='password' name='password' label='Password' required={true} />
        <InputField placeholder='Confirm your password' type='password' id='password2' name='password2' label='Confirm Password' required={true} />
        {/* <input type="submit" value="submit" className='bg-green-700 inline-block py-3 text-white' /> */}
        <Button processing={processing} type='submit'>{processing ? "Signing up..." : "Sign up"}</Button>
        <p className='text-right'>{"Already have an account?"} <Link to="/login">Log in</Link></p>
    </Form>
};

export default Register;