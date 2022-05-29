import React, { useState } from 'react';

function BookmarkEditRow({ bookmark, onDeleteClick, onUpdateClick, setEditMode }) {

    const { url } = bookmark;
    const [title, setTitle] = useState(bookmark.title);

    function onTitleChange(e) {
        setTitle(e.target.value);
    }

    function onSetUpdateClick() {
        bookmark.title = title;
        onUpdateClick(bookmark);
        setEditMode(false);
    }

    return <tr>
        <td>
            <input className='form-control' onChange={onTitleChange} value={title} />
        </td>
        <td>
            <a href={`${url}`}>{url}</a>
        </td>
        <td>
            <button className='btn btn-success' onClick={onSetUpdateClick}>Update</button>
            <button className='ml-3 btn btn-secondary' onClick={() => setEditMode(false)}>Cancel</button>
            <button className='ml-3 btn btn-danger' onClick={onDeleteClick}>Delete</button>
        </td>
    </tr>
}

export default BookmarkEditRow;