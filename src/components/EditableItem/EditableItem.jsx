import { useContext, useEffect, useState } from 'react';
import PulseLoading from '../PulseLoading/PulseLoading';
import PropTypes from 'prop-types'
import { UserContext } from '../../context/UserContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { backendUrl } from '../../constants';
import { toast } from 'react-toastify';

const EditableItem = ({ value, item, name }) => {
    const [editable, setEditable] = useState(false);
    const { editableData, setEditableData, token, setUpdate, update } = useContext(UserContext)
    // const { value, email } = value;
    // console.log(value);



    const [formData, setFormData] = useState({
        ...item
    })

    useEffect(() => setFormData({ ...item, [name]: value }), [value, name, item])


    const handleSubmit = e => {
        e.preventDefault();

        delete formData._id
        if (name !== 'email') {
            axios.put(backendUrl + 'admin/' + item._id, formData, {
                headers: {
                    token
                }
            }).then(res => {
                if (res.data.modifiedCount) {
                    setUpdate(!update)
                    setEditable(false);
                }
            })
        }

        else {
            axios.put(backendUrl + 'admin/' + item._id, formData, {
                headers: {
                    token
                }
            }).then(res => {
                console.log(res);
                if (res.status === 200) {
                    setUpdate(!update)
                    setEditable(false);


                    toast.success(res.data)
                }
            }).catch(({ response }) => {
                if (response.status) {
                    toast.error("Email Already in Use")
                }
            })
        }
    }


    const handleChange = e => {
        setFormData({ ...formData, [name]: e.target.value })
        setEditableData({ ...editableData, [name]: e.target.value })
        // console.log(formData);
    }


    return (
        <div>
            {value ? <div className='flex justify-center items-center gap-3'>
                {editable ? <form onSubmit={handleSubmit} className='flex justify-center items-center gap-3'>
                    <input className='bg-transparent focus:outline-none' name={name} onChange={handleChange} value={formData[name]} />
                    <button type='submit'>
                        <FontAwesomeIcon icon={faCheck} />
                    </button>
                </form> : <>
                    <h2 className='text-xl text-center'>{value}</h2>
                    <button className='text-sm' onClick={() => setEditable(true)}>
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                </>}

            </div> : <PulseLoading />}
        </div>
    );
};

export default EditableItem;

EditableItem.propTypes = {
    value: PropTypes.string.isRequired,
    item: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
}