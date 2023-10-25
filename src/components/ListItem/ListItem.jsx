import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobile } from '@fortawesome/free-solid-svg-icons';

const ListItem = ({ item, setIndex, itemKey }) => {
    const date = new Date(item['last-paid']);
    const month = date.toLocaleString('default', { month: 'long' });

    return (
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