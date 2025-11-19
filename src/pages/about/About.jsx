import React from 'react';
import Banner from '../about/banner/Banner';
import WhoWeAre from './who we are/WhoWeAre';
import Achievement from './achievement/Achievement';
import Opinion from './opinion/Opinion';

const About = () => {
    return (
        <div>
            <Banner></Banner>
            <WhoWeAre></WhoWeAre>
            <Achievement></Achievement>
            <Opinion></Opinion>
        </div>
    );
};

export default About;