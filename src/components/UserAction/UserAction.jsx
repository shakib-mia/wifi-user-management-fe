import { useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types'
import { gsap } from 'gsap';
import { UserContext } from '../../context/UserContextProvider';
import { NavLink, useNavigate } from 'react-router-dom';

const UserAction = ({ shownAction }) => {
    const { admin, setToken, setUsers } = useContext(UserContext);
    const navigate = useNavigate()


    const handleLogout = () => {
        setToken("");
        localStorage.removeItem('token');
        navigate("/login");
        setUsers([])
    }

    const containerRef = useRef(null);

    useEffect(() => {
        if (shownAction) {
            gsap.to(containerRef.current, { top: '48px', opacity: 1, display: 'block', duration: 0.3 })
        } else {
            gsap.to(containerRef.current, { top: '64px', opacity: 0, display: 'none', duration: 0.3 })

        }
    }, [shownAction])

    return (
        <div className="absolute top-16 right-0 opacity-0" id='action' ref={containerRef}>
            <div className='bg-white relative w-48 text-slate-800 p-3'>
                <div className='bg-white w-4 h-4 absolute rotate-45 right-5 -top-[2px] z-[-1]'></div>

                <p className="text-center">
                    {admin.name}
                </p>

                <ul className='flex flex-col gap-2'>
                    <NavLink className='inline-block w-full h-full rounded hover:bg-slate-100' to="/">
                        <li className='p-3'>
                            Dashboard
                        </li>
                    </NavLink>

                    <NavLink className='inline-block w-full h-full rounded hover:bg-slate-100' to="/profile">
                        <li className='p-3'>
                            Profile
                        </li>
                    </NavLink>

                    <li className='p-3 cursor-pointer text-red-500 tracking-widest hover:bg-red-50' onClick={handleLogout}>
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default UserAction;

UserAction.propTypes = {
    shownAction: PropTypes.bool
}