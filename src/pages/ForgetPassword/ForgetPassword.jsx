// import React from 'react';
import InputField from '../../components/InputField/InputField';
import Form from '../../components/Form/Form';
import Button from '../../components/Button/Button';
import axios from 'axios';
import { backendUrl } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContextProvider';

const ForgetPassword = () => {
    const navigate = useNavigate();
    const { setToken } = useContext(UserContext)
    const handleSubmit = e => {
        e.preventDefault();
        console.log(e.target.email.value);
        // const random = Math.floor(Math.random() * 9000 + 1000);

        axios.get(backendUrl + 'otp/' + e.target.email.value).then(res => {
            if (res.data) {
                console.log(res.data);
                localStorage.setItem("token", res.data.token);
                setToken(res.data.token)
                navigate("/enter-otp")
            }
        });

    }
    return (
        <Form heading="Forget Password" handleSubmit={handleSubmit}>
            <InputField placeholder='Enter your email here' type='email' id='email' name='email' label='email address' required={true} />
            <Button type='submit'>Submit</Button>
        </Form>
    );
};

export default ForgetPassword;