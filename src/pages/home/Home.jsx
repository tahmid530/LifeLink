import React from 'react';
import Banner from './banner/banner';
import Story from './story/Story';
import Work from './work/work';
import Donate from './why donate/donate';
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