// import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { backendUrl } from '../../constants';
import { useEffect, useState } from 'react';
import container from "../../assets/verify-container.webp";
import check from "./../../assets/check.webp"

const Verify = () => {
    const location = useLocation();
    // console.log(email);
    const [verifying, setVerifying] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        const email = location.pathname.split("/")[2].split("at").join("@").split("dot").join(".");
        axios.get(`${backendUrl}verify/${email}`).then(res => {
            if (res.data.modifiedCount) {
                setVerifying(!res.data.modifiedCount);
                navigate("/login")
            }
        })
    }, [])

    setTimeout(() => setVerifying(false), 3000)
    return (
        <div className='flex flex-col items-center justify-center h-screen'>
            {/* <div className='animate-bounce'> */}
            {/* {verifying ? "verifying..." : "verified"} */}

            <div className="relative w-1/12">
                <img src={container} className={`w-1/2 h-auto mx-auto ${verifying ? 'rotate' : ""}`} alt="" />
                {!verifying && <img className='w-1/3 absolute top-0 bottom-0 left-0 right-0 m-auto' src={check} />}
            </div>

            <div>
                {verifying ? 'verifying...' : 'verified'}
            </div>
            {/* </div> */}
        </div>
    );
};

export default Verify;