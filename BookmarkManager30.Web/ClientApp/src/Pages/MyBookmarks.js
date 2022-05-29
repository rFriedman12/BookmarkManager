import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarksContext } from '../BookmarksContext';
import BookmarkRow from '../Components/BookmarkRow';

function MyBookmarks() {

    const { user } = useBookmarksContext();

    const [bookmarks, setBookmarks] = useState([]);

    async function getBookmarks() {
        const { data } = await axios.get(`/api/bookmarks/getall?userId=${user.id}`);
        setBookmarks(data);
    }

    useEffect(() => {
        getBookmarks();
    }, []);

    async function onDeleteClick(id) {
        await axios.post(`api/bookmarks/delete?id=${id}`);
        getBookmarks();
    }

    async function onUpdateClick(updatedBookmark) {
        await axios.post('/api/bookmarks/update', updatedBookmark);
        getBookmarks();
    }

    return <div>
        <h1>Welcome Back {user.firstName} {user.lastName}</h1>
        <Link to='/addbookmark'>
            <button className='mt-3 btn btn-primary btn-block'>AddBookmark</button>
        </Link>
        <table className='mt-3 table table-hover table-bordered'>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>URL</th>
                    <th>Edit/Delete</th>
                </tr>
            </thead>
            <tbody>
                {bookmarks.map(b => {
                    return <BookmarkRow 
                                key={b.id} 
                                bookmark={b} 
                                onDeleteClick={() => onDeleteClick(b.id)}
                                onUpdateClick={onUpdateClick} />
                })}
            </tbody>
        </table>
    </div>
}

export default MyBookmarks;