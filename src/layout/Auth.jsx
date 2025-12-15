import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/navbar/Navbar';

const Auth = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div>
    );
};

export default Auth;