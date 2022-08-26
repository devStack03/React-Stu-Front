import React, { Component } from 'react'
import Header from '../../components/Header/Header';
import sliderImg1 from '../../assets/img/slider-1.jpg';
import sliderImg2 from '../../assets/img/slider-2.jpg';
import sliderImg3 from '../../assets/img/slider-3.jpg';
import sliderImg4 from '../../assets/img/slider-4.jpg';
import sliderImg5 from '../../assets/img/slider-5.jpg';
import sliderImg6 from '../../assets/img/slider-6.jpg';
import sliderImg7 from '../../assets/img/slider-7.jpg';
import sliderImg8 from '../../assets/img/slider-8.jpg';

import sliderIcon from '../../assets/img/slider-icon.png';

import sliderVideo1 from '../../assets/img/slider-1.jpg';
import sliderVideo2 from '../../assets/img/slider-2.jpg';
import sliderVideo4 from '../../assets/img/slider-4.jpg';
import sliderVideo6 from '../../assets/img/slider-6.jpg';

import Slider from "react-slick";
import { Link } from 'react-router-dom';

// import "../../assets/sass/bootstrap.css";
// import "../../assets/sass/fontawesome.css";
// import "../../assets/sass/fonts.css";
// import "../../assets/sass/modal-video.css";
// import "../../assets/sass/slick.scss";
// import "../../assets/sass/smartmenu.scss";
// import "../../assets/sass/style.css";
class Buy extends Component {
    render() {
        const settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <React.Fragment>
                <Header />
                <section className="home_benner">
                    <div className="containerH">
                        <div className="home_title_info">
                            <h2>The Right Domain Pays Off</h2>
                        </div>
                        <Slider {...settings}>
                            <div className="item">
                                <div className="video_block video_block_1">
                                    <figure> <img src={sliderImg1} alt="#" className="img-fluid ofi" /> </figure>
                                    <Link to={sliderVideo1} className="js-video-button" data-channel="video" data-video-url={{ sliderVideo1 }}><img src={sliderIcon} alt="#" /></Link>
                                </div>
                            </div>
                            <div className="item">
                                <div className="video_block video_block_2">
                                    <figure> <img src={sliderImg2} alt="#" className="img-fluid ofi" /> </figure>
                                    <Link to={sliderVideo2} className="js-video-button" data-channel="video" data-video-url={sliderVideo2}><img src={sliderIcon} alt="#" /></Link> </div>
                            </div>
                            <div className="item">
                                <div className="video_block">
                                    <figure> <img src={sliderImg3} alt="#" className="img-fluid ofi" /> </figure>
                                </div>
                            </div>
                            <div className="item">
                                <div className="video_block video_block_4">
                                    <figure> <img src={sliderImg4} alt="#" className="img-fluid ofi" /> </figure>
                                    <Link to={sliderVideo4} className="js-video-button" data-channel="video" data-video-url={sliderVideo4}><img src={sliderIcon} alt="#" /></Link> </div>
                            </div>
                            <div className="item">
                                <div className="video_block">
                                    <figure> <img src={sliderImg5} alt="#" className="img-fluid ofi" /> </figure>
                                </div>
                            </div>
                            <div className="item">
                                <div className="video_block video_block_6">
                                    <figure> <img src={sliderImg6} alt="#" className="img-fluid ofi" /> </figure>
                                    <Link to={sliderVideo6} className="js-video-button" data-channel="video" data-video-url={sliderVideo6}><img src={sliderIcon} alt="#" /></Link> </div>
                            </div>
                            <div className="item">
                                <div className="video_block">
                                    <figure> <img src={sliderImg7} alt="#" className="img-fluid ofi" /> </figure>
                                </div>
                            </div>
                            <div className="item">
                                <div className="video_block">
                                    <figure> <img src={sliderImg8} alt="#" className="img-fluid ofi" /> </figure>
                                </div>
                            </div>
                        </Slider>
                    </div>
                </section>
                <section className="dream_domain_options_sec">
                    <div className="container">
                        <h2>Dream Domain Options</h2>
                        <div className="dream_domain_options_info_one">
                            <div className="row">
                                <div className="col-7 col-sm-8 align-self-center">
                                    <h3><b>Domains.com</b> is listed for sale</h3>
                                </div>
                                <div className="col-5 col-sm-4 align-self-center">
                                    <div className="favourite_link"> <Link to="#" style={{textDecoration:'none'}}> <i className="fas fa-heart" ></i>Favourite </Link> </div>
                                </div>
                            </div>
                        </div>
                        <div className="dream_domain_options_info_two">
                            <div className="row">
                                <div className="col-6 col-sm-6 align-self-center">
                                    <div className="video_pitch_idea">
                                        <h3>Video Pitch Idea</h3>
                                        <Link to="#" style={{textDecoration:'none'}}><i className="fas fa-video"></i> PITCH VIDEO </Link>
                                    </div>
                                </div>
                                <div className="col-6 col-sm-6 align-self-center">
                                    <div className="price_upon_request">
                                        <h3>Buy this domain</h3>
                                        <form>
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" style={{opacity : '1.0',position : 'relative'}}/>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="con_btn"> <Link to="#" style={{textDecoration:'none'}}>Continue</Link> </div>
                        </div>
                    </div>
                </section>
            </React.Fragment>
        )
    }
}

export default Buy