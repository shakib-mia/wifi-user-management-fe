import { useContext, useState } from 'react';
import dummy from './../../assets/dummy.webp'
import { UserContext } from '../../context/UserContextProvider';
import EditableItem from '../../components/EditableItem/EditableItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { backendUrl } from '../../constants';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
    const { admin, update, setUpdate, setToken, config } = useContext(UserContext);
    const [image, setImage] = useState({});
    const [deleteUser, setDeleteUser] = useState(false);

    // console.log(import.meta.env.VITE_TINYPNG_API_KEY);

    const handleChange = e => {
        e.preventDefault()
        var reader = new FileReader();
        reader.onloadend = function () {
            // Convert the Data URL to a Blob
            const dataURL = reader.result;
            const byteString = atob(dataURL.split(',')[1]);
            const mimeType = dataURL.split(',')[0].split(':')[1].split(';')[0];
            const blob = new Blob([new Uint8Array(byteString.length)], { type: mimeType });
            // console.log(dataURL);
            // Get the file size from the Blob
            const fileSize = blob.size;

            if (fileSize / 1024.9 < 150) {
                const newAdminData = { ...admin, profilePic: reader.result }

                delete newAdminData._id

                axios.put(`${backendUrl}admin/${admin._id}`, newAdminData, config).then(res => {
                    if (res.data.modifiedCount) {
                        setImage({});
                        setUpdate(!update)
                    }
                })
            } else {
                // toast.error("File Must be Less than 100kB")
                console.log(dataURL);
                axios.post(backendUrl + "compress", { dataURL }, config).then(({ data }) => console.log(data))
            }
        }
        reader.readAsDataURL(image);

    }

    const navigate = useNavigate()

    const handleDeleteAccount = () => {
        console.log(admin._id);

        axios.delete(backendUrl + 'admin/' + admin._id, config).then(res => {
            console.log(res);
            navigate('/login');
            setToken("");
            localStorage.removeItem("token")
        })
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>

            <div className='card w-1/4'>
                <div className="flex items-center flex-col relative">
                    <div className='absolute -top-[60px]'>
                        <div className="relative">
                            <img src={admin.profilePic || dummy} className='w-20 h-20 rounded-full' alt="" />
                            <label htmlFor='file' className='absolute bg-slate-300 text-slate-800 bottom-0 right-0 p-2 w-6 h-6 rounded-full flex justify-center items-center cursor-pointer'>
                                <FontAwesomeIcon icon={faPen} className='text-[8px]' />
                            </label>

                            <input onChange={e => setImage(e.target.files[0])} type="file" accept='image/*' id="file" name='profilePicture' className='hidden' />
                        </div>
                    </div>
                    <div className='mt-8 w-full'>
                        <EditableItem value={admin.name ? admin.name : ''} item={admin} name="name" />
                        <EditableItem value={admin.email ? admin.email : ""} item={admin} name="email" />

                        {/* {name ? <h2 className='text-base text-center'>{email}</h2> : <PulseLoading />} */}

                        <Button type='button' className='inline-block w-full py-2 border border-[#FF6347] rounded-md text-[#FF6347] mt-3 hover:bg-[#FF6347] hover:text-white transition-all' onClick={() => setDeleteUser(true)}>Delete</Button>
                    </div>
                </div>
            </div>

            {image?.name && <Modal>

                {/* {} */}
                <form className='relative h-1/2' onSubmit={handleChange}>
                    <button className="absolute text-2xl -top-10 -right-10" onClick={() => setImage({})}>&times;</button>
                    <img src={URL.createObjectURL(image)} className='h-full' alt="profile" />
                    <div className="text-center mt-5">
                        <Button type='submit'>Submit</Button>
                    </div>
                </form>
            </Modal>}


            {deleteUser && <Modal>
                <div className='bg-[#333] p-10 text-center relative'>
                    <button type='button' className='absolute -right-10 -top-10 text-4xl' onClick={() => setDeleteUser(false)}>&times;</button>
                    Are You Sure You want to delete your Account? <br />
                    All of your data will be lost.

                    <Button className='inline-block w-full py-2 border border-[#FF6347] rounded-md text-[#FF6347] mt-3 hover:bg-[#FF6347] hover:text-white transition-all' onClick={handleDeleteAccount}>Delete</Button>
                </div>
            </Modal>}
        </div>
    );
};

export default Profile;