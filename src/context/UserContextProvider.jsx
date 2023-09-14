import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { backendUrl } from '../constants';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [update, setUpdate] = useState('')
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState({});
    // const [tokenDetails, setTokenDetails] = useState({});
    // const [time, setTime] = useState(0)
    // const navigate = useNavigate();



    // useEffect
    // console.log(tokenDetails);

    // useEffect(() => {
    //     const date = new Date();
    //     if (tokenDetails?.exp > date.getTime()) {
    //         localStorage.removeItem("token")
    //     }
    // }, [tokenDetails])

    useEffect(() => {
        const config = {
            headers: {
                token,
            },
        };

        if (token) {
            axios.get(`${backendUrl}users`, config).then((res) => {
                console.log(res.data.name);
                if (res.data.name === 'TokenExpiredError') {
                    localStorage.removeItem("token");
                    setToken("");
                    // navigate("/login")
                    return <Navigate to='/login' replace={true} />
                }
                setUsers(res.data);
                setLoading(false)
            }).catch(err => console.log(err))
        }
    }, [update, token]);

    useEffect(() => {
        const config = {
            headers: {
                token,
            },
        };

        if (token) {
            axios.get(`${backendUrl}admin`, config).then(({ data }) => {
                setAdmin(data);
                setLoading(false)
            })
        }
    }, [update, token]);

    const contextValue = {
        users,
        setUsers,
        setUpdate,
        setToken,
        token,
        loading,
        admin
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
}


UserContextProvider.propTypes = {
    children: PropTypes.node.isRequired
}