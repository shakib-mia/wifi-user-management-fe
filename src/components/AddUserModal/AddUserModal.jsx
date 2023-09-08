import PropTypes from 'prop-types'
import InputField from '../InputField/InputField';
import { useContext, useState } from 'react';
import Button from '../Button/Button';
import axios from 'axios';
import { backendUrl, config } from '../../constants';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContextProvider';

const AddUserModal = ({ showAddUserModal }) => {
    const [processing, setProcessing] = useState(false);
    const { setUpdate } = useContext(UserContext)
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = {
            mac: e.target.mac.value,
            username: e.target.username.value,
            "last-paid": e.target["last-paid"].value || "0-0-0000",
        };

        setProcessing(true)



        axios.post(backendUrl + 'users/', formData, config).then(res => {
            if (res.data.acknowledged) {
                setUpdate(`${e.target.username.value} added successfully`);
                showAddUserModal(false);
                toast.success(`${e.target.username.value} added successfully`);
                // console.log(document.getElementById('userslist').clientHeight);
                document.getElementById("userslist").scrollTop = '100%'
            }
        })

    }
    return (
        <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur flex items-center justify-center'>
            <form className="relative xl:w-1/2 bg-[#333333] p-10 rounded-2xl" onSubmit={handleSubmit}>
                <button type='button' className='absolute -right-10 -top-10 text-4xl' onClick={() => showAddUserModal(false)}>&times;</button>
                <div className='text-5xl text-center gradient-text block font-bold'>Add User</div>

                <InputField type='text' required={true} label='User Name' id='username' name='username' placeholder='Enter Your User Name' />
                <InputField type='text' required={true} containerClassName='mt-2' label='MAC Address' id='mac' name='mac' placeholder='Enter Your MAC Address' />
                <InputField containerClassName='mt-2' label='Last Paid' id='last-paid' type='date' name='last-paid' placeholder='Enter Your Last Paid' />

                <div className='mt-5 text-center'>
                    <Button processing={processing} type='submit'>
                        Add{processing && 'ing'} user{processing && '...'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default AddUserModal;

AddUserModal.propTypes = {
    showAddUserModal: PropTypes.func.isRequired
}