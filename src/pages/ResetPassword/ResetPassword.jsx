// import React from 'react';

import axios from "axios";
import Button from "../../components/Button/Button";
import Form from "../../components/Form/Form";
import InputField from "../../components/InputField/InputField";
import { backendUrl } from "../../constants";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = e => {
        setLoading(true)
        e.preventDefault()

        if (e.target.pass1.value === e.target.pass2.value) {
            axios.put(backendUrl + 'reset-password', { password: e.target.pass1.value }, {
                headers: {
                    token
                }
            }).then(res => {
                if (res.data.modifiedCount) {
                    setLoading(false)
                    toast.success("Password reset successfully done");
                    navigate("/login")
                }
            })
        }

    }

    return (
        <Form handleSubmit={handleSubmit} heading="Reset Your Password">
            <>
                <InputField label="Create Password" name='pass1' placeholder="Enter Your New Password Here" id="pass1" type="password" icon />
            </>
            <>
                <InputField label="Confirm Password" name='pass2' placeholder="Confirm Your Password Here" id="pass2" type="password" icon={false} />
            </>

            <Button processing={loading} type="submit">Submit{loading && 'ting...'}</Button>
        </Form>
    );
};

export default ResetPassword;