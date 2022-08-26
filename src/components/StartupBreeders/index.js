import React from "react";
import Fountain from "../../assets/img/fountain.png";
import { Col, Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { Fade } from "react-awesome-reveal";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function StartupBreeders() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    arrows: true,
    slidesToScroll: -1,
    responsive: [
      {
        breakpoint: 1281,
        settings: {
          slidesToShow: 2,
          slidesToScroll: -1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: -1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: -1,
          dots: false,
        },
      },
    ],
  };
  const populardomain = [
    {
      number: "0 1",
      domainName: "Banker.com"
    },
    {
      number: "02",
      domainName: "Cheapest.com"
    },
    {
      number: "03",
      domainName: "VirtualTours.com"
    },
    {
      number: "04",
      domainName: "HomeMade.com"
    },
    {
      number: "05",
      domainName: "LUV.com"
    },
    {
      number: "06",
      domainName: "Queen.com"
    }
  ]
  return (
    <React.Fragment>
      <Container fluid>
        <Row className="mx-0 mb-5">
          <Col style={{ marginTop: "-100px" }}>
            <div className="fountain">
              <img src={Fountain} alt="fountain" />
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Fade direction="up">
          <div className="container-fluid exclusive-breeder">
            <p className="ms-4 exclusive-breeder-ft">
              Exclusive STARTUP BREEDERS - <br></br> Build The Next Big Thing
            </p>
          </div>
        </Fade>
      </Container>
      <Container fluid>
        <Row className="mx-0 mb-5">
          <Col>
            <div className="studio-icons flogo" style={{ background: "rgb(14 14 14 / 0%)" }}>
              <div className="container">
                <Slider {...settings}>
                  {
                    populardomain.map((data, index) =>
                    (
                      <div className="slider-bg">
                        <span className="number-assets">
                          {
                            data.number
                          }
                        </span>
                        <span className="domain-assets">
                          {
                            data.domainName
                          }
                        </span>
                      </div>
                    )
                    )
                  }
                </Slider>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="mx-0">
          <Col> 
            <Fade direction="up">
              <div className="spring-buildream-flex">
                <div className="spring-buildream-role">
                  <p className="spring-buildream-headline">
                    BUILD YOUR DREAM
                  </p>
                </div>
              </div>
            </Fade>
            <div className="studio-icons flogo" style={{ background: "rgb(14 14 14 / 0%)", marginTop: "5%" }}>
              <div className="container">
                <Slider {...settings}>
                  <div className="slider-bg-1">
                  </div>
                  <div className="slider-bg-2">
                  </div>
                  <div className="slider-bg-3">
                  </div>
                  <div className="slider-bg-4">
                  </div>
                  <div className="slider-bg-5">
                  </div>
                  <div className="slider-bg-6">
                  </div>
                  <div className="slider-bg-7">
                  </div>
                  <div className="slider-bg-8">
                  </div>
                  <div className="slider-bg-9">
                  </div>
                  <div className="slider-bg-10">
                  </div>
                  <div className="slider-bg-11">
                  </div>
                </Slider>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
}
