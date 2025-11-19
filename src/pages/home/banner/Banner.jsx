import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BannerImg1 from '../../../assets/banner.jpg'
import BannerImg2 from '../../../assets/test.png'
import BannerImg3 from '../../../assets/Donor.jpg'
import BannerImg4 from '../../../assets/react.svg'
// import BannerImg5 from '../../../assets/banner.jpg'
// import BannerImg6 from '../../../assets/banner.jpg'

const Banner = () => {
    return (
        <div>
            <Carousel autoPlay={true} interval={2500} transitionTime={1500} infiniteLoop={true} swipeable={true} showStatus={false} showThumbs={false} dynamicHeight={true}>
                <div>
                    <img src={BannerImg1} />
                </div>
                <div>
                    <img src={BannerImg2} />
                </div>
                <div>
                    <img src={BannerImg3} />
                </div>
                <div>
                    <img src={BannerImg4} />
                </div>
                <div>
                    <img src={BannerImg1} />
                </div>
                <div>
                    <img src={BannerImg1} />
                </div>
            </Carousel>
        </div>
    );
};

export default Banner;