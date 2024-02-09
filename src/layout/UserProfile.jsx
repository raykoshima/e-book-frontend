import axios from "axios";
import { useEffect, useState } from "react";

function UserProfile() {
    const [user, setUser] = useState({});

    useEffect(() => {
        const token = localStorage.getItem('token');
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3000/user", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching User:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            <img alt="User avatar" src={user.avatar} width="30" height="24"/>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
            <p>Display Name: {user.display}</p>
            <p>Created At: {new Date(user.createdAt).toLocaleString()}</p>
        </div>
    );
}

export default UserProfile;
