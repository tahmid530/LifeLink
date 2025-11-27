import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../../contexts/authcontext/AuthContext';
import { useNavigate } from 'react-router';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('User logged out successfully');
                navigate('/');
            })
            .catch(error => {
                console.error('Logout error:', error);
            });
    }

    const Navitems = <>
        <li><NavLink to="/" className={({ isActive }) => isActive ? "text-[#B71B1C] font-semibold" : ""}>Home</NavLink></li>
        <li><NavLink to="/about" className={({ isActive }) => isActive ? "text-[#B71B1C] font-semibold" : ""}>About</NavLink></li>
        <li><NavLink to="/event" className={({ isActive }) => isActive ? "text-[#B71B1C] font-semibold" : ""}>Event</NavLink></li>
        <li><NavLink to="/blog" className={({ isActive }) => isActive ? "text-[#B71B1C] font-semibold" : ""}>Blog</NavLink></li>
    </>

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 sm:px-6">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
                        {Navitems}
                        {/* Mobile auth links */}
                        <div className="lg:hidden">
                            {user ? (
                                <li>
                                    <button onClick={handleLogOut} className="text-[#B71B1C] hover:bg-red-50">
                                        Log Out
                                    </button>
                                </li>
                            ) : (
                                <li>
                                    <NavLink to="/login" className={({ isActive }) => isActive ? "text-[#B71B1C] font-semibold" : ""}>
                                        Login
                                    </NavLink>
                                </li>
                            )}
                        </div>
                    </ul>
                </div>
                <NavLink to="/" className="btn btn-ghost text-xl text-[#B71B1C] font-bold">Lifelink</NavLink>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {Navitems}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <div className="flex items-center gap-4">
                        {/* User profile dropdown */}
                        <div className="dropdown dropdown-end">
                            <div
                                tabIndex={0}
                                role="button"
                                className="flex items-center gap-2 cursor-pointer hover:bg-red-50 rounded-lg p-2 transition-colors duration-200"
                            >
                                <div className="h-10 w-10">
                                    <img src={user.photoURL} alt="" className='rounded-full' />
                                </div>
                                <span className="text-sm text-gray-700 hidden md:inline">
                                    {user.displayName || user.email}
                                </span>
                                <svg
                                    className="w-4 h-4 text-gray-600 hidden sm:block"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            <ul
                                tabIndex={0}
                                className="dropdown-content menu bg-base-100 rounded-box z-50 w-fit p-2 shadow-lg border border-gray-200 mt-2"
                            >
                                {/* User Info */}
                                <li className="px-4 py-2 border-b border-gray-100">
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-gray-800">
                                            {user.displayName || 'User'}
                                        </span>
                                        <span className="text-sm text-gray-500 truncate">
                                            {user.email}
                                        </span>
                                    </div>
                                </li>

                                {/* Dashboard Link */}
                                <li>
                                    <NavLink
                                        to="/dashboard"
                                        className="flex items-center gap-2 py-3 px-4 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 text-[#B71B1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                        Dashboard
                                    </NavLink>
                                </li>

                                {/* Profile Link */}
                                <li>
                                    <NavLink
                                        to="/profile"
                                        className="flex items-center gap-2 py-3 px-4 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 text-[#B71B1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        My Profile
                                    </NavLink>
                                </li>

                                {/* Settings Link */}
                                <li>
                                    <NavLink
                                        to="/settings"
                                        className="flex items-center gap-2 py-3 px-4 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                    >
                                        <svg className="w-4 h-4 text-[#B71B1C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Settings
                                    </NavLink>
                                </li>

                                {/* Divider */}
                                <li><hr className="my-1 border-gray-200" /></li>

                                {/* Logout Button */}
                                <li>
                                    <button
                                        onClick={handleLogOut}
                                        className="flex items-center gap-2 py-3 px-4 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 w-full text-left"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Log Out
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <NavLink
                            to="/login"
                            className="bg-[#B71B1C] text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors duration-200 font-semibold"
                        >
                            Login
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;