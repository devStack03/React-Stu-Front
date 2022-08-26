import React from "react";
import "./home.css";
import CommonHeader from "../../components/Header/CommonHeader";
import StartupBreeders from "../../components/StartupBreeders";
import { Col, Container, Row } from "react-bootstrap";
import MainFooter from "../mainFooter/MainFooter";
import SponsoredHeadlines from "./sponsoredHeadlines";
import Logo from "../../assets/img/StudLogo.png";
import Media from "../../assets/img/Media.png";
import SkeletonLeft from "../../assets/img/skeleton.png";
import SkeletonRight from "../../assets/img/skeleton1.png"
import Fade from "react-awesome-reveal";

const Home = () => {
  return (
    <React.Fragment>
      <CommonHeader />
      <div className="main pb-4">
        <img src={SkeletonLeft} className="skeletonleft" alt="skeleton-left" />
        <img src={SkeletonRight} className="skeletonright" alt="skeleton-right" />
        <div className="banner with-home">
          <img src={Logo} className="studLogo" alt="studioLogo" />
          <Fade direction="up">
            <div className="market-place-logon">
              <span className="section-title mb-4 mx-0 mt-lg-4 pt-4" style={{ color: "white" }}>
                The World's Most Exclusive Domain <br></br> Marketplace & Top Freelancer Network
              </span>
            </div>
          </Fade>
          <div className="spring-flex">
            <Fade direction="up">
              <div className="spring-sponsored-role">
                <p className="spring-sponsored-headline">
                  Sponsored Headlines
                </p>
              </div>
            </Fade>
          </div>
          <Container style={{ maxWidth: "1550px" }}>
            <SponsoredHeadlines />
          </Container>
        </div>
        <Container fluid>
          <Row className="mx-0 mb-5">
            <Col>
              <div className="find-partner">
                <div className="spring-flex-aspiring">
                  <Fade direction="up">
                    <div className="spring-sponsored-role">
                      <h2 className="section-title">
                        Find Partners with <span>BIG IDEAS</span> on Our <br></br> Landing Page
                      </h2>
                    </div>
                  </Fade>
                </div>
                <Fade direction="up">
                  <p className="aspiring">
                    Aspiring entrepreneurs if you have a solid and profitable idea
                    and you have a <br></br> record of success on the internet upload your
                    Video Pitch Idea - Rick Schwartz
                  </p>
                </Fade>
                <div className="pitchbtn-pos">
                  <button className="btn video-btn text-uppercase">
                    pitch video
                  </button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <img src={Media} alt="icon" />
                </div>
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
