import React, { useState } from "react";
import { useBookmarksContext } from '../BookmarksContext';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function LogIn() {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showError, setShowError] = useState(false);
    const { setUser } = useBookmarksContext();
    const history = useHistory();

    function onFormChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        const { data } = await axios.post('/api/account/login', formData);
        if (data === null) {
            setShowError(true);
            return;
        }
        setUser(data);
        history.push('/');
    }

    return <div className='row'>
        <div className='col-md-5 offset-md-3 card card-body bg-light'>
            <h3>Log In To Your Account</h3>
            <form className='mt-3' onSubmit={onFormSubmit}>
                <span className="text-danger" hidden={!showError}>Login Information is Incorrect</span>
                <input name="email" placeholder="Email" className="form-control" onChange={onFormChange} />
                <br />
                <input type='password' name="password" placeholder="Password" className="form-control" onChange={onFormChange} />
                <br />
                <button className="btn btn-primary">Log In</button>
            </form>
        </div>
    </div>
}

export default LogIn;