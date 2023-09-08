// import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'
import { backendUrl } from '../../constants';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContextProvider';
import { toast } from 'react-toastify';

const ListItem = ({ item, setIndex, itemKey }) => {
    const { update, setUpdate } = useContext(UserContext)

    const handleDelete = () => {
        const reply = confirm(`Are you sure to delete ${item.username}`);
        // console.log(reply);
        if (reply) {
            axios.delete(backendUrl + 'users/' + item._id).then(res => {
                // console.log(res);
                if (res.data.acknowledged) {
                    setUpdate(!update)
                    toast.success("User Removed successfully")
                }
            })
        }
    }

    return (
        <div className="flex rounded gap-5 p-3 shadow-[0_0_5px_#1c1c1c] my-3 text-center items-center w-[600px] xl:w-full text-xl font-light" key={item._id}>
            <div className="w-3/12">{item.username}</div>
            <div className="w-4/12">{item.mac}</div>
            <div className="w-3/12">{item["last-paid"]}</div>
            <div className="w-1/12">
                <button className='text-base text-[#4169e1]' onClick={() => setIndex(itemKey)}>Edit</button>
            </div>
            <div className="w-1/12">
                <button className='text-base text-[#f09c00c4]' onClick={handleDelete}>Delete</button>
            </div>
        </div>
    );
};

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    setIndex: PropTypes.func.isRequired,
    itemKey: PropTypes.number.isRequired
}

export default ListItem;