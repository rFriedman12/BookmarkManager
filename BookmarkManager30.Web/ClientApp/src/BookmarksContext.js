import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const BookmarksContext = createContext();

function BookmarksContextComp({ children }) {

    const [user, setUser] = useState(null);

    useEffect(() => {
        async function getUser() {
            const { data } = await axios.get('/api/account/getcurrentuser');
            setUser(data);
        }

        getUser();
    }, []);

    return <BookmarksContext.Provider value={{ user, setUser }}>
        {children}
    </BookmarksContext.Provider>
}

const useBookmarksContext = () => useContext(BookmarksContext);

export { useBookmarksContext, BookmarksContextComp };