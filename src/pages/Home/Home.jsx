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
    const [wifiUsers, setWifiUsers] = useState(users);

    useEffect(() => {
        setWifiUsers(users)
    }, [users.length])

    useEffect(() => {
        users.push({})
    }, [])

    const [index, setIndex] = useState(-1);
    const [addUserModal, showAddUserModal] = useState(false);

    if (verified === false) {
        return <div className="flex items-center justify-center h-screen w-1/3 mx-auto text-center">
            To Be Benefited from this Website Check your <br /> Email For Verification mail and Get Verified
        </div>
    }


    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const foundUsers = users.filter((user) =>
            user.username.toLowerCase().includes(searchValue) || user.mac.toLowerCase().includes(searchValue)
        );

        setWifiUsers(foundUsers);
    };


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