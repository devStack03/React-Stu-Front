import React from "react";
import {
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import Fade from "react-awesome-reveal";

const OurMission = () => {
  return (
    <>
      <Container>
        <Row className="common-styling">
          <Col xs="12" className="mb-4">
            {/* <div className="how-it-works-card pb-5" id = "ourmission"> */}
            <Fade direction="up">
              <h1 className="breed">Our Mission</h1>
            </Fade>
            <Fade direction="up">
              <p>
                Our mission is to unleash a TIDAL WAVE of new business to
                revolutionize the domain industry. Every level of our members
                will have global opportunities to grow and change their destiny.
                We want to change lives with lots of Rags to Riches stories!
              </p>
            </Fade>
            <Fade direction="up">
              <p>
                The Riches get the Pitches who own the prime domain names giving
                them the chance to find Creative geniuses to become partners or
                expand their empire via the Startup Breeders
              </p>
            </Fade>
            <ListGroup className="my-4">
              <ListGroup.Item>
                <Fade direction="up">
                  <div className="video-pitch-strong">
                    <strong>Video Pitch Idea </strong> to always push the premium
                    domain to the limit so it gets the TRUE VALUE!
                  </div>
                </Fade>
              </ListGroup.Item>
            </ListGroup><Fade direction="up">
              <h3 style={{ lineHeight: "40px" }}>
                No force on earth can stop true passion. <br></br>
                No force on earth can hold you back
              </h3>
            </Fade>
            <Fade direction="up">
              <p>
                We truly want all our members to succeed and be wildly
                successful, connect VISIONARY LEADERS with like-minded people
                who share their positive energy so the VOLCANO of VICTORY will
                erupt and Magically things happen once you connect the dots. Our
                mission is to take domains outta the dark into the LIGHT!
                SPOTLIGHT!
              </p>
            </Fade>
            {/* </div> */}
          </Col>
          <Col xs="12">
            <div className="how-it-works-card">
              <Fade direction="up">
                <h2 className="breed">Turning Point</h2>
              </Fade>
              <Fade direction="up">
                <p>
                  OUR number one enemies are domain investors selling their assets
                  way too cheap. When it comes to valuation domainers are either
                  up in the ozone for worthless domains or they’re giving away
                  life-changing domains for less than life-changing amounts.
                  Sometimes even chump change. When will they ever learn??
                </p>
              </Fade>
              <Fade direction="up">
                <h3>THE DOMAIN SLEEPING DRAGON AWAKES</h3>
              </Fade>
              <Fade direction="up">
                <p>
                  Don’t come to Stud.com if you’re desperate and you need to sell
                  your domain TODAY for the lowest price. There are plenty of
                  venues that can do that for you and STUD is not one of them. We
                  don't need millions of names clogging up the system. Therefore,
                  we will set minimum values and quality to be listed.
                </p>
              </Fade>
              <Fade direction="up">
                <p>
                  Join Stud because you are a founder of that domain name and
                  maybe you deserve more than just a one-time DESPERATE payday.
                  Come to Stud because you want to market and circulate your
                  domain name and have it utilized for the highest and best use.
                  Network on Stud for the right reasons, not the wrong reasons.
                  Members will join Stud to get the best results and help them
                  generate faster income with all our tools while waiting for the
                  BIG WHALE deal.
                </p>
              </Fade>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default OurMission;
