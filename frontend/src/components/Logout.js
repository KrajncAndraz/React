import { useEffect, useContext } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Logout(){
    const userContext = useContext(UserContext); 
    useEffect(function () {
        const logout = async function () {
            try {
                userContext.setUserContext(null);
                const res = await fetch("http://localhost:3001/users/logout");
                if (!res.ok) {
                    console.error("Logout failed");
                }
            } catch (err) {
                console.error("An error occurred during logout:", err);
            }
        }
        logout();
    }, []);

    return (
        <Navigate replace to="/" />
    );
}

export default Logout;