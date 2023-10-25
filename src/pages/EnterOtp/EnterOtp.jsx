import Form from '../../components/Form/Form';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import axios from 'axios';
import { backendUrl } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContextProvider';

const EnterOtp = () => {
    const inputFieldClass = "inline-block text-xl aspect-square text-center border border-slate-400";
    const navigate = useNavigate();
    const { token } = useContext(UserContext)

    const handleChange = e => {
        // console.log(e.target.id);
        if (e.target.value.length === 1 && parseInt(e.target.id) < 4) {
            const id = parseInt(e.target.id) + 1
            document.getElementById(id).focus()
        }

        if (e.target.value.length === 0 && parseInt(e.target.id) > 1) {
            const id = parseInt(e.target.id) - 1
            document.getElementById(id).focus()
        }
    }


    const handleSubmit = e => {
        e.preventDefault();

        const otp = e.target.otp1.value + e.target.otp2.value + e.target.otp3.value + e.target.otp4.value
        // console.log(otp);
        // const conf
        const config = {
            headers: {
                token
            }
        }

        // console.log(token);

        axios.post(backendUrl + 'verify-otp', { value: parseInt(otp) }, config)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    console.log(res.data);

                    if (res.data) {

                        navigate('/reset-password')
                    }
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <Form heading="Enter Otp" handleSubmit={handleSubmit} >
            <div className="grid grid-cols-4 gap-24 justify-between">
                <InputField maxLength={1} type='number' onChange={handleChange} name="otp1" id='1' className={inputFieldClass} required={true} />
                <InputField maxLength={1} type='number' onChange={handleChange} name="otp2" id='2' className={inputFieldClass} required={true} />
                <InputField maxLength={1} type='number' onChange={handleChange} name="otp3" id='3' className={inputFieldClass} required={true} />
                <InputField maxLength={1} type='number' onChange={handleChange} name="otp4" id='4' className={inputFieldClass} required={true} />
            </div>

            <Button type='submit'>Submit</Button>
        </Form>
    );
};

export default EnterOtp;