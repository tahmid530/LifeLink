import React from 'react';
import Banner from './banner/Banner';
import Story from './story/Story';
import Work from './work/Work';
import Donate from './why donate/Donate';
import Blog from './blog/Blog';
import Event from './event/Event';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Story></Story>
            <Work></Work>
            <Donate></Donate>
            <Event></Event>
            <Blog></Blog>
        </div>
    );
};

export default Home;