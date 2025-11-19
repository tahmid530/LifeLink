import React from 'react';
import Banner from './banner/Banner';
import UpcomingEvent from './upcoming event/UpcomingEvent';
import Volunteer from './volunteer/Volunteer';
import Sponsor from './sponsor/Sponsor';
import UpcomingEvents from './upcoming event/UpcomingEvent';

const Event = () => {
    return (
        <div>
            <Banner></Banner>
            <UpcomingEvent></UpcomingEvent>
            <Volunteer></Volunteer>
            <Sponsor></Sponsor>
        </div>
    );
};

export default Event;