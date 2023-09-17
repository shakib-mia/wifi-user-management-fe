// import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { backendUrl } from '../../constants';
import { useState } from 'react';

const Verify = () => {
    const location = useLocation();
    const email = location.pathname.split("/")[2].split("at").join("@").split("dot").join(".");
    // console.log(email);
    const [verifying, setVerifying] = useState(true)
    axios.get(`${backendUrl}verify/${email}`).then(res => setVerifying(res.data.modifiedCount))
    return (
        <div className='flex items-center justify-center h-screen'>
            {/* <div className='animate-bounce'> */}
            {verifying ? "verifying..." : "verified"}
            {/* </div> */}
        </div>
    );
};

export default Verify;