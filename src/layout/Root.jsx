import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../pages/shared/Navbar/Navbar';
import Footer from '../pages/shared/footer/Footer';

const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;