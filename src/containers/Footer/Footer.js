import React from 'react';
import i10img from '../../assets/img/i10.png';
import i8img from '../../assets/img/i8.png';
import i1img from '../../assets/img/i1.png';
import i5img from '../../assets/img/i5.png';
import i4img from '../../assets/img/i4.png';
import i6img from '../../assets/img/i6.png';
import i15img from '../../assets/img/i15.png';
import i7img from '../../assets/img/i7.png';
import i9img from '../../assets/img/i9.png';
import i3img from '../../assets/img/i3.png';
import i2img from '../../assets/img/i2.png';
import studioLogoImg from "../../assets/img/studio-logo.png";
import './Footer.css';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
  return(
    <React.Fragment>
      <footer className="foo">
          <Container fluid>
        <Row className="mx-0 mb-4">
          <Col>
            <div className="studio-logo content">
              <span className="tag">DIGITAL ASSETS Toolbox</span>
              <div className="container-fluid">
                <h4 className="ms-4">BUILD YOUR DREAM</h4>
                <img src={studioLogoImg} alt="logo" />
              </div>
            </div>
            <div className="botton-icons text-uppercase">
              <div className="icon">
                <img src={i10img} alt="icon" />
                <p>wordpress</p>
              </div>
              <div className="icon">
                <img src={i8img} alt="icon" />
                <p>web and mobile app</p>
              </div>
              <div className="icon">
                <img src={i3img} alt="icon" />
                <p>logo design</p>
              </div>
              <div className="icon">
                <img src={i2img} alt="icon" />
                <p>sell domain</p>
              </div>
              <div className="icon">
                <img src={i1img} alt="icon" />
                <p>buy domain</p>
              </div>
              <div className="icon">
                <img src={i5img} alt="icon" />
                <p>programmers</p>
              </div>
              <div className="icon">
                <img src={i4img} alt="icon" />
                <p>graphic design</p>
              </div>
              <div className="icon">
                <img src={i6img} alt="icon" />
                <p>video and animation</p>
              </div>
              <div className="icon">
                <img src={i15img} alt="icon" />
                <p>online meetings</p>
              </div>
              <div className="icon">
                <img src={i7img} alt="icon" />
                <p>writing and translation</p>
              </div>
              <div className="icon">
                <img src={i9img} alt="icon" />
                <p>music and audio</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      </footer>
    </React.Fragment>
  )
}

export default Footer
