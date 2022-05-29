import React, { useState } from 'react';
import BookmarkEditRow from './BookmarkEditRow';

function BookmarkRow({ bookmark, onDeleteClick, onUpdateClick }) {

    const { title, url } = bookmark;
    const [editMode, setEditMode] = useState(false);

    if (editMode) {
        return <BookmarkEditRow 
                    bookmark={bookmark} 
                    onDeleteClick={onDeleteClick} 
                    onUpdateClick={onUpdateClick}
                    setEditMode={setEditMode} />
    }

    return <tr>
        <td>{title}</td>
        <td>
            <a href={`${url}`}>{url}</a>
        </td>
        <td>
            <button className='btn btn-success' onClick={() => setEditMode(true)}>Edit Title</button>
            <button className='ml-3 btn btn-danger' onClick={onDeleteClick}>Delete</button>
        </td>
    </tr>
}

export default BookmarkRow;