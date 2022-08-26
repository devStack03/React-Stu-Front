import React from "react";
import CommonHeader from "../../components/Header/CommonHeader";
import studiologo from "../../assets/img/studio-logo.png";
import camimg from "../../assets/img/cam.png";
import StartupBreeders from "../../components/StartupBreeders";
import { Col, Container, Row } from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import  BigLogo  from '../../assets/img/big-logo.png';
import MainFooter from "../mainFooter/MainFooter";
import SponsoredHeadlines from "./sponsoredHeadline";


const Home = () => {
  

  return (
    <React.Fragment>
      <CommonHeader />
        <div className="main pb-4" style={{ backgroundColor: "#eaeaea" }}>
          <div className="banner" style={{ border: "0" }}>
            <Container>
              <Row>
                <Col>
                  {" "}
                  <h1 className="section-title">
                    Freelance Collaboration & Domain Breeding
                    <br />
                    Marketplace
                  </h1>
                  <div className="banner-icons">
                    <Image src={BigLogo} /> 
                  </div>
                </Col>
              </Row>
            </Container>

            <Container fluid>
              <Row className="mx-0 mt-lg-4">
                <Col>
                  <div className="sponsored-headline" id="sponsored">
                    <SponsoredHeadlines />
                  </div>
                </Col>
              </Row>
            </Container>
          </div>

          <Container fluid>
            <Row className="mx-0 mb-5">
              <Col>
                <div className="studio-logo">
                  <img src={studiologo} alt="logo" />
                </div>
                <div className="find-partner">
                  <h2 className="section-title">
                    Find Partners with <span>BIG IDEAS</span> on Our Landing
                    Page
                  </h2>
                  <p>
                    Aspiring entrepreneurs if you have a solid and profitable
                    idea and you have a record of success on the internet upload
                    your Video Pitch Idea - Rick Schwartz
                  </p>
                  <button className="btn video-btn text-uppercase">
                    <img src={camimg} alt="icon" width="24" /> pitch video
                  </button>
                </div>
              </Col>
            </Row>
          </Container>

          <StartupBreeders />
        </div>
        <MainFooter />
    </React.Fragment>
  );
};
export default Home;
