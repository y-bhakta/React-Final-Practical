import React from 'react'
import './Header.css'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { currentUser } = useSelector(state => state.user);

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/login');
    }
console.log(currentUser);

    return (
        <header className="modern-header">
            <nav className="navbar-custom">
                <div className="nav-container">
                    <div className="brand-section">
                        <span className="brand-icon"></span>
                        <a className="brand-name" href="/">Recipe Book</a>
                    </div>
                    <ul className="nav-menu">
                        <li className="nav-item">
                            <a className="nav-link text-white" href="/">Home</a>
                        </li>
                        {
                            currentUser.role==="admin"
                                ? <>
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="/add-recipe">Add Recipe</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-white" href="/view-recipes">View Recipes</a>
                                    </li>
                                </>
                                :null
                        }
                        {currentUser && (
                            <li className="nav-item">
                                <span className="user-name text-white">{currentUser.email}</span>
                            </li>
                        )}
                        <li className="nav-item">
                            <button className="logout-btn" onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header
