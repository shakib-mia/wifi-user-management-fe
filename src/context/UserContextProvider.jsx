import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { backendUrl } from '../constants';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [update, setUpdate] = useState(false)
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState({});
    const [verified, setVerified] = useState(true)
    const config = {
        headers: {
            token,
        },
    };
    // const navigate = useNavigate()

    useEffect(() => {

        if (token) {
            axios.get(`${backendUrl}users`, config).then((res) => {
                // console.log(res.data);
                // if (res.data.name === 'TokenExpiredError') {
                // localStorage.removeItem("token");
                // setToken("");
                // return <Navigate to='/login' replace={true} />
                // }
                setUsers(res.data);
                setLoading(false)
            }).catch(err => {
                console.log(err.response.status === 401);
                if (err.response.status === 401) {
                    localStorage.removeItem("token");
                    setToken("");
                    return <Navigate to='/login' replace={true} />
                }
            })
        }
    }, [update, token, config]);

    useEffect(() => {
        const config = {
            headers: {
                token,
            },
        };

        if (token) {
            axios.get(`${backendUrl}admin`, config).then(({ data }) => {
                setVerified(data.isVerified)
                setAdmin(data);
                setLoading(false)
            }).catch(err => console.error(err))
        }
    }, [update, token]);



    const [editableData, setEditableData] = useState({})


    const contextValue = {
        users,
        setUsers,
        update,
        setUpdate,
        setToken,
        setLoading,
        token,
        config,
        loading,
        admin,
        verified,
        editableData,
        setEditableData
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