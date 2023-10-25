// import React from 'react';
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobile } from '@fortawesome/free-solid-svg-icons';

const ListItem = ({ item, setIndex, itemKey }) => {
    // const { update, setUpdate, token } = useContext(UserContext);
    // console.log(token);
    // console.log(item['last-paid'] !== '0-0-000');

    const date = new Date(item['last-paid']);  // 2009-11-10
    const month = date.toLocaleString('default', { month: 'long' });
    // console.log(month);


    return (
        // <div className="flex rounded gap-5 p-3 shadow-[0_0_5px_#1c1c1c] my-3 text-center items-center w-[600px] xl:w-full text-xl font-light" key={item._id}>
        //     <div className="w-3/12">{item.username}</div>
        //     <div className="w-4/12">{item.mac}</div>
        //     <div className="w-3/12">{item["last-paid"]}</div>
        //     <div className="w-1/12">
        //         <button className='text-base text-[#4169e1] font-medium' onClick={() => setIndex(itemKey)}>Edit</button>
        //     </div>
        //     <div className="w-1/12">
        //         <button className='text-base text-[#ff1a1a] font-medium' onClick={handleDelete}>Delete</button>
        //     </div>
        // </div>
        <div className="text-center shadow-xl hover:scale-110 transition p-3 cursor-pointer" onClick={() => setIndex(itemKey)}>
            <FontAwesomeIcon className="text-white text-5xl" icon={faMobile} />
            <p>{item?.username}</p>
            <p className='text-xs'>Last Paid: {month === 'Invalid Date' ? <span className='text-red-500'>never yet</span> : <span className='text-green-500'>{month}</span>}</p>
        </div>
    );
};

ListItem.propTypes = {
    item: PropTypes.object.isRequired,
    setIndex: PropTypes.func.isRequired,
    itemKey: PropTypes.number.isRequired
}

export default ListItem;