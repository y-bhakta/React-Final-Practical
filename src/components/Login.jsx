import React, { useEffect, useState } from 'react'
import './signup.css'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getallusers, loginUser } from '../features/user/userSlice';

const Login = () => {
    const [register,setRegister]=useState({});
    const [error,setError]=useState('');
    const dsipatch=useDispatch();
    const navigate=useNavigate();
    const {users}=useSelector(state=> state.user);
    const handlechange=(e)=>{
        const {name,value}=e.target;
        setRegister({...register,[name]:value});
    }
    const handlesubmit=(e)=>{
        e.preventDefault();
        const {email,password}=register;
        const user=users.find(user=> user.email === email && user.password === password);
        if(user){
            dsipatch(loginUser(user));
            navigate('/');
        }else{
            setError('Invalid email or password');
        }
        setRegister({});
    }
    useEffect(()=>{
        dsipatch(getallusers());
    },[]);
    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form className="form" method='post' onSubmit={handlesubmit}>
                            <p className="title">Log In </p>
                            <p className="message">Please log in to access your account. </p>
                            <label>
                                <input required placeholder type="email" name='email' className="input" onChange={handlechange} value={register.email || ''} />
                                <span>Email</span>
                            </label>
                            <label>
                                <input required placeholder type="password" name='password' className="input" onChange={handlechange} value={register.password || ''} />
                                <span>Password</span>
                            </label>
                            <p>{error}</p>
                            <button className="submit">Submit</button>
                            <p className="signin">Donot have an acount ? <a href="/signup">Sign Up</a> </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
