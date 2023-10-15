import { useContext, useState } from 'react';
import PropTypes from 'prop-types'
import InputField from '../InputField/InputField';
import axios from 'axios';
import { backendUrl } from '../../constants';
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContextProvider';
import Button from '../Button/Button';

const Details = ({ user, setIndex }) => {
    const { setUpdate, update, token } = useContext(UserContext)
    const [editing, setEditing] = useState(false)
    const [formData, setFormData] = useState({
        username: user?.username,
        mac: user?.mac,
        "last-paid": user && user['last-paid']
    })

    const config = {
        headers: {
            token
        }
    }

    // console.log(config);
    const handleSubmit = e => {
        e.preventDefault();
        setEditing(true)

        formData["last-paid"] = e.target['last-paid'].value.length > 0 ? e.target['last-paid'].value : "0-0-0000"

        axios.put(backendUrl + 'users/' + user._id, formData, config).then(({ data }) => {
            if (data.modifiedCount) {
                setEditing(false)
                setIndex(-1);
                toast.success(`${user.username}'s data updated successfully`);
                setUpdate(!update);
            } else {
                toast.error("Nothing is modified");
                setEditing(false)
            }
        }).catch(err => console.log(err))
    }

    const handleDelete = () => {
        const reply = confirm(`Are you sure to delete ${user.username}`);
        // console.log(reply);
        const config = {
            headers: {
                token
            }
        }
        if (reply) {
            axios.delete(backendUrl + 'users/' + user._id, config).then(res => {
                console.log(res.data);
                if (res.data.deletedCount) {
                    setUpdate(!update)
                    toast.success("User Removed successfully");
                    setIndex(-1)
                }
            })
        }
    }



    return (
        <div className='fixed top-0 left-0 w-screen h-screen backdrop-blur flex items-center justify-center'>
            <form className="relative xl:w-1/2 xl:h-1/2 shadow-[0_0_20px_#1c1c1c]" onSubmit={handleSubmit}>
                <button type='button' className='absolute right-0 -top-10 text-2xl' onClick={() => setIndex(-1)}>&times;</button>
                {/* <input type="text" value={user.username} onChange={e => setFormData({ ...formData, username: e.target.value })} /> */}
                <div className='w-full h-full rounded-md p-4 flex flex-col gap-5 overflow-auto bg-[#333]'>
                    <h1 className='text-center text-5xl gradient-text font-semibold'>Edit User</h1>
                    <InputField required={true} id='username' label='User Name' placeholder='User Name' name='username' type="text" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
                    <InputField required={true} id='mac' label='Mac Address' placeholder='Mac Address' name='mac' type="text" value={formData.mac} onChange={e => setFormData({ ...formData, mac: e.target.value })} />
                    <InputField id='last-paid' label='Last Paid' placeholder='Last Paid' name='last-paid' type="date" value={formData['last-paid']} onChange={e => setFormData({ ...formData, "last-paid": e.target.value })} />
                    <div className="text-center mt-0">
                        <input type="submit" value={editing ? "Editing..." : "Edit"} className={`px-10 py-2 bg-blue-800 text-white cursor-pointer hover:bg-blue-900 rounded ${editing && 'opacity-60'}`} />
                        <Button type='button' className='bg-red-600 text-white py-2 rounded hover:bg-red-700 px-10 ml-4' onClick={handleDelete}>Delete</Button>
                    </div>
                </div>
            </form>
        </div>
    );
};

Details.propTypes = {
    user: PropTypes.object.isRequired,
    setIndex: PropTypes.func.isRequired
}

export default Details;