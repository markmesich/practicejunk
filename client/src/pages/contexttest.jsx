import { useContext, useEffect, useState } from "react";
import { UsersContext } from "../context/userContext";
import userFinder from "../services/userFinder";


const Test = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(false)
    
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await userFinder.get("/");
            setUsers(response.data.data.username);
        } catch (err) {
            console.error(err);
            setError(true);
        }
    };
    return (
        <div className='test'>
            {users.map((user) => (
                <div key={user.userid}>
                <span className="output-box">Email:{user.email}</span>
                <span className="output-box">Username: {user.username}</span>
                <span className="output-box">Prompt: {user.prompt ? user.prompt : 
                <span className="empty-prompt">Empty</span>
                }
                </span>
                {error && <span>Error displaying data</span>}
            </div>
            ))}
            <div className="pageination-container">
            <button className="page-button" onClick={() => null}>
                    previous
                </button>
                <button className="page-button" onClick={() => null}>
                    next
                </button>
            </div>
        </div>

    )
}

export default Test;