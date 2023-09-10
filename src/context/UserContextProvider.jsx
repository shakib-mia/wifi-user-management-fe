import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types'
import { backendUrl } from '../constants';
import axios from 'axios';

export const UserContext = createContext();

export function UserContextProvider({ children }) {
    const [update, setUpdate] = useState('')
    const [users, setUsers] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState({})


    useEffect(() => {
        const config = {
            headers: {
                token,
            },
        };

        if (token) {
            axios.get(`${backendUrl}users`, config).then(({ data }) => {
                setUsers(data);
                setLoading(false)
            })
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