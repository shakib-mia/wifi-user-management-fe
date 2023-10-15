import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import ListItem from "../../components/ListItem/ListItem";
import AddUserModal from '../../components/AddUserModal/AddUserModal';
import Details from "../../components/Details/Details"
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
// import { useNavigate } from "react-router-dom";

const Home = () => {
    const { users, verified } = useContext(UserContext)
    const [wifiUsers, setWifiUsers] = useState([...users]);


    useEffect(() => {
        setWifiUsers(users)
    }, [users])

    useEffect(() => {
        users.push({})
    }, [])

    // console.log(wifiUsers);
    const [index, setIndex] = useState(-1);
    const [addUserModal, showAddUserModal] = useState(false);

    if (verified === false) {
        return <div className="flex items-center justify-center h-screen w-1/3 mx-auto text-center">
            To Be Benefited from this Website Check your <br /> Email For Verification mail and Get Verified
        </div>
    }


    const handleSearch = e => {
        const foundUsers = users.filter(user => user.username.toLowerCase().includes(e.target.value.toLowerCase()) || user.mac.toLowerCase().includes(e.target.value.toLowerCase()))
        // setWifiUsers(foundUsers);
        console.log(foundUsers);
        // console.log(foundUsers);
    }


    // return <div className="xl:h-screen xl:w-screen xl:flex xl:flex-col xl:items-center xl:justify-center">
    //     <div className="xl:w-1/2 xl:h-1/2 shadow-[0_0_20px_#1c1c1c] rounded-md p-4 overflow-auto relative">
    //         <div className="w-[600px] xl:w-full relative">

    //             <h1 className="text-center text-5xl gradient-text font-semibold">All Users</h1>
    //             <h6 className="text-center text-lg text-slate-400 mb-4 font-medium">Total Users: {users.length}</h6>
    //             <InputField placeholder="Search by user's name" type="text" onChange={handleSearch} id="Search" />
    //             {users.length > 0 && <div className="flex gap-5 p-3 shadow-md my-3 text-center capitalize items-center text-xl font-light" id="userslist">
    //                 <div className="w-3/12">username</div>
    //                 <div className="w-4/12">MAC Address</div>
    //                 <div className="w-3/12">last paid</div>
    //                 <div className="w-1/12"></div>
    //                 <div className="w-1/12"></div>
    //             </div>}
    //         </div>
    //         {!loading ?
    //             users.length > 0 ?
    //                 wifiUsers.map((item, key) => <ListItem item={item} setIndex={setIndex} itemKey={key} key={key} />)
    //                 : <div className="text-center h-full w-full flex items-center justify-center absolute top-0 left-0 bg-[#333]">No users found &#128528;</div>
    //             : <div className="text-center">Loading...</div>}

    //     </div>
    //     <button className="mt-28 px-5 py-2 bg-green-800 text-white rounded" onClick={() => showAddUserModal(true)}>Add User</button>

    //     {index > -1 && <Details user={users[index]} setIndex={setIndex} />}
    //     {addUserModal && <AddUserModal showAddUserModal={showAddUserModal} />}

    // </div >;

    return <div className="w-11/12 md:w-9/12 lg:w-5/6 xl:w-10/12 2xl:w-1/2 mx-auto">
        <InputField placeholder="Enter your Name or MAC Here" className="mt-20" onChange={handleSearch} type="text" />
        <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-20 items-center">
            {users.length > 0 ? wifiUsers.map((item, key) => <ListItem key={key} item={item} itemKey={key} setIndex={setIndex} />)
                :
                <>Loading...</>}
        </div>
        {!wifiUsers.length && <p className="text-center mx-auto">No Users Found &#128528;</p>}

        <div className="text-center mt-16">
            <Button className="bg-green-700 px-5 py-2 rounded" type="button" onClick={() => showAddUserModal(true)}>Add New User</Button>
        </div>


        {index > -1 && <Details user={users[index]} setIndex={setIndex} />}
        {addUserModal && <AddUserModal showAddUserModal={showAddUserModal} />}
    </div>
};

export default Home;