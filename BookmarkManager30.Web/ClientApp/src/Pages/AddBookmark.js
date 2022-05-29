import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Addbookmark() {

    const [formData, setFormData] = useState({
        title: '',
        url: ''
    });
    const history = useHistory();

    function onFormChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        await axios.post('/api/bookmarks/add', formData);
        history.push('/mybookmarks');
    }

    return <div className='row'>
        <div className='col-md-5 offset-md-3 card card-body bg-light'>
            <h3>Add Bookmark</h3>
            <form className='mt-3' onSubmit={onFormSubmit}>
                <input name="title" placeholder="Title" className="form-control" onChange={onFormChange} />
                <br />
                <input name="url" placeholder="URL" className="form-control" onChange={onFormChange} />
                <br />
                <button className="btn btn-primary">Add</button>
            </form>
        </div>
    </div>
}

export default Addbookmark;