import { useContext } from 'react';
import dummy from './../../assets/dummy.webp'
import { UserContext } from '../../context/UserContextProvider';
// const check 
// import PulseLoading from '../../components/PulseLoading/PulseLoading';
import EditableItem from '../../components/EditableItem/EditableItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
    const { admin } = useContext(UserContext);

    return (
        <div className='h-screen w-screen flex justify-center items-center'>

            <div className='card w-1/4'>
                <div className="flex items-center flex-col relative">
                    <div className='absolute -top-[60px]'>
                        <div className="relative">
                            <img src={dummy} className='w-20 h-20 rounded-full' alt="" />
                            <label htmlFor='file' className='absolute bg-slate-300 text-slate-800 bottom-0 right-0 p-2 w-6 h-6 rounded-full flex justify-center items-center cursor-pointer'>
                                <FontAwesomeIcon icon={faPen} className='text-[8px]' />
                            </label>

                            <input type="file" id="file" className='hidden' />
                        </div>
                    </div>
                    <div className='mt-8 w-full'>
                        <EditableItem value={admin.name ? admin.name : ''} item={admin} name="name" />
                        <EditableItem value={admin.email ? admin.email : ""} item={admin} name="email" />

                        {/* {name ? <h2 className='text-base text-center'>{email}</h2> : <PulseLoading />} */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;