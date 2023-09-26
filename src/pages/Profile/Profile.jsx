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

const Profile = () => {
    const { admin, token, update, setUpdate } = useContext(UserContext);
    const [image, setImage] = useState({})

    const handleChange = e => {
        e.preventDefault()
        console.log(admin._id);
        // console.log(e.target.files[0]);
        const formData = new FormData();
        formData.append("image", image);

        const url = 'https://api.imgbb.com/1/upload?key=42afc79fccd60ad9768d1aa145ddfaff'

        axios.post(url, formData).then(res => {
            if (res.data.data?.display_url) {
                // delete admin._id
                const newAdminData = { ...admin, profilePic: res.data.data?.display_url };
                delete newAdminData._id
                axios.put(`${backendUrl}admin/${admin._id}`, newAdminData, {
                    headers: {
                        token
                    }
                }).then(res => {
                    if (res.data.modifiedCount) {
                        setImage({});
                        setUpdate(!update)
                    }
                })
            }
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

                            <input onChange={e => setImage(e.target.files[0])} type="file" id="file" name='profilePicture' className='hidden' />
                        </div>
                    </div>
                    <div className='mt-8 w-full'>
                        <EditableItem value={admin.name ? admin.name : ''} item={admin} name="name" />
                        <EditableItem value={admin.email ? admin.email : ""} item={admin} name="email" />

                        {/* {name ? <h2 className='text-base text-center'>{email}</h2> : <PulseLoading />} */}
                    </div>
                </div>
            </div>

            {image.name && <Modal>

                <form className='relative h-1/2' onSubmit={handleChange}>
                    <button className="absolute text-2xl -top-10 -right-10" onClick={() => setImage({})}>&times;</button>
                    <img src={URL.createObjectURL(image)} className='h-full' alt="profile" />
                    <div className="text-center mt-5">
                        <Button type='submit'>Submit</Button>
                    </div>
                </form>
            </Modal>}
        </div>
    );
};

export default Profile;