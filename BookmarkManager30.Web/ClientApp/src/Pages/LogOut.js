import axios from 'axios';
import React, { useEffect } from 'react';
import { useBookmarksContext } from '../BookmarksContext';

function LogOut() {

    const { setUser } = useBookmarksContext();

    useEffect(() => {
        async function logoutUser() {
            await axios.post('/api/account/logout');
            setUser(null);
        }
        
        logoutUser();
    }, []);
    
    return <></>
}

export default LogOut;