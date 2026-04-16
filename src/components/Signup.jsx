import React, { useState } from 'react'
import './signup.css'
import { useDispatch } from 'react-redux';
import { registeruser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [register,setRegister]=useState({});
    const dsipatch=useDispatch();
    const navigate=useNavigate();
    const handlechange=(e)=>{
        const {name,value}=e.target;
        setRegister({...register,[name]:value});
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
        console.log(register);        
        dsipatch(registeruser(register));
        setRegister({});
        navigate('/login');
    }
    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="form" method='post' onSubmit={handlesubmit}>
                            <p className="title">Register </p>
                            <p className="message">Signup now and get full access to our app. </p>
                            <div className="flex">
                                <label>
                                    <input required placeholder type="text" name='name' className="input" onChange={handlechange} value={register.name || ''} />
                                    <span>Name</span>
                                </label>
                            </div>
                            <label>
                                <input required placeholder type="email" name='email' className="input" onChange={handlechange} value={register.email || ''} />
                                <span>Email</span>
                            </label>
                            <label>
                                <input required placeholder type="password" name='password' className="input" onChange={handlechange} value={register.password || ''} />
                                <span>Password</span>
                            </label>
                            <button className="submit">Submit</button>
                            <p className="signin">Already have an acount ? <a href="/login">Log In</a> </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
