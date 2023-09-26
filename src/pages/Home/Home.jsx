import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import Details from "../../components/Details/Details";
import ListItem from "../../components/ListItem/ListItem";
import AddUserModal from "../../components/AddUserModal/AddUserModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { users, setToken, loading, setUsers, verified } = useContext(UserContext)
    const navigate = useNavigate()
    const [index, setIndex] = useState(-1);
    const [addUserModal, showAddUserModal] = useState(false);

    if (verified === false) {
        return <div className="flex items-center justify-center h-screen w-1/3 mx-auto text-center">
            To Be Benefited from this Website Check your <br /> Email For Verification mail and Get Verified
        </div>
    }



    return <div className="xl:h-screen xl:w-screen xl:flex xl:flex-col xl:items-center xl:justify-center">
        <div className="xl:w-1/2 xl:h-1/2 shadow-[0_0_20px_#1c1c1c] rounded-md p-4 overflow-auto relative">
            <div className="w-[600px] xl:w-full relative">

                <h1 className="text-center text-5xl gradient-text font-semibold">All Users</h1>
                <h6 className="text-center text-lg text-slate-400 mb-4 font-medium">Total Users: {users.length}</h6>
                {users.length > 0 && <div className="flex gap-5 p-3 shadow-md my-3 text-center capitalize items-center text-xl font-light" id="userslist">
                    <div className="w-3/12">username</div>
                    <div className="w-4/12">MAC Address</div>
                    <div className="w-3/12">last paid</div>
                    <div className="w-1/12"></div>
                    <div className="w-1/12"></div>
                </div>}
            </div>
            {!loading ?
                users.length > 0 ?
                    users.map((item, key) => <ListItem item={item} setIndex={setIndex} itemKey={key} key={key} />)
                    : <div className="text-center h-full w-full flex items-center justify-center absolute top-0 left-0">No users found &#128528;</div>
                : <div className="text-center">Loading...</div>}

        </div>
        <button className="mt-28 px-5 py-2 bg-green-800 text-white rounded" onClick={() => showAddUserModal(true)}>Add User</button>

        {index > -1 && <Details user={users[index]} setIndex={setIndex} />}
        {addUserModal && <AddUserModal showAddUserModal={showAddUserModal} />}

    </div >;
};

export default Home;