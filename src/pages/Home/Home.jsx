import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContextProvider";
import Details from "../../components/Details/Details";
import ListItem from "../../components/ListItem/ListItem";
import AddUserModal from "../../components/AddUserModal/AddUserModal";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const { users, setToken, loading } = useContext(UserContext)
    // console.log(users);
    const navigate = useNavigate()
    const [index, setIndex] = useState(-1);
    const [addUserModal, showAddUserModal] = useState(false)

    const handleLogout = () => {
        setToken("");
        localStorage.removeItem('token');
        navigate("/login")
    }


    return <div className="xl:h-screen xl:w-screen xl:flex xl:flex-col xl:items-center xl:justify-center">
        <div className="xl:w-1/2 xl:h-1/2 shadow-[0_0_20px_#1c1c1c] rounded-md p-4 overflow-auto relative">
            <div className="w-[600px] xl:w-full relative">
                <p className="text-right fixed right-3 top-4">Total users: {users.length} <button className="text-white bg-red-700 px-4 py-2 rounded ml-4" onClick={handleLogout}>Log out</button></p>
                <h1 className="text-center text-5xl gradient-text font-semibold">All Users</h1>
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