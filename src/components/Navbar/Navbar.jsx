import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext, useState } from 'react';
import dummy from "../../assets/dummy.webp"
import UserAction from '../UserAction/UserAction';
import { UserContext } from '../../context/UserContextProvider';

const Navbar = () => {
    const [shownAction, setShowAction] = useState(false);
    const { admin } = useContext(UserContext)


    document.addEventListener('click', function (event) {
        const targetElement = document.getElementById('icon');
        if (targetElement) {
            const isClickInsideElement = targetElement?.contains(event.target);
            if (!isClickInsideElement) {
                setShowAction(false);
            }
        }
    });


    return (
        <div className="fixed top-3 right-3">
            <div className="flex items-center gap-3">
                <img src={admin.profilePic || dummy} className="w-10 h-10 rounded-full" alt="" />
                <FontAwesomeIcon icon={faChevronCircleDown} className={`cursor-pointer transition duration-300 ${shownAction ? 'rotate-180' : 'rotate-0'}`} id='icon' onClick={() => setShowAction(!shownAction)} />
                <UserAction shownAction={shownAction} />
            </div>
        </div>
    );
};

export default Navbar;