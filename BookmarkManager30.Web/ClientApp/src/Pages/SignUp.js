import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

function SignUp() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const history = useHistory();

    function onFormChange(e) {
        const formCopy = { ...formData, [e.target.name]: e.target.value };
        setFormData(formCopy);
    }

    async function onFormSubmit(e) {
        e.preventDefault();
        await axios.post('/api/account/signup', formData);
        history.push('/login');
    }

    const { firstName, lastName, email, password } = formData;
    const disableSignUpButton = () => firstName === '' || lastName === '' || email === '' || password === '';

    return <div className='row'>
        <div className='col-md-5 offset-md-3 card card-body bg-light'>
            <h3>Sign up for a new account</h3>
            <form className='mt-3' onSubmit={onFormSubmit}>
                <input name="firstName" placeholder="First Name" className="form-control" onChange={onFormChange} />
                <br />
                <input name="lastName" placeholder="Last Name" className="form-control" onChange={onFormChange} />
                <br />
                <input name="email" placeholder="Email" className="form-control" onChange={onFormChange} />
                <br />
                <input name="password" placeholder="Password" className="form-control" onChange={onFormChange} />
                <br />
                <button className="btn btn-primary" disabled={disableSignUpButton()} >Signup</button>
            </form>
        </div>
    </div>
}

export default SignUp;