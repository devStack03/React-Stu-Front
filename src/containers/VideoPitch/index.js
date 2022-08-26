/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import userImg from "../../assets/img/user.png";
import ApiHelper from "../../helpers/apiHelper";
import VideoPlay from "./VideoPlay";
import { Rating } from "react-simple-star-rating";
import * as variable from "../../variables/variables";
import { Card, Container } from "react-bootstrap";
import Button from '@mui/material/Button';

const VideoPitch = () => {
  const [domainList, setDomainList] = useState(null);
  const [playVideoModal, setPlayVideoModal] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [rating] = useState(4);

  useEffect(() => {
    ApiHelper.get(variable.API_URL + "/api/domains/").then((res) => {
      setDomainList(res.data.domains);
    });
  }, []);

  const openVideoPlayModal = (e, videoId) => {
    e.stopPropagation();
    setPlayVideoModal(true);
    setVideoId(videoId);
  };

  return (
    <React.Fragment>
      <Container className="custom-data-table mt-5">
        <Card
          border="light"
          className="shadow-sm p-3 custom-card column-visibility-table items-table"
        >
          <Card.Header className="d-flex justify-content-between algrn-items-center flex-column flex-md-row">
            <h2>Video Pitch projects</h2>
            <div className="filterControls d-flex justify-content-md-between align-items-md-center flex-column flex-md-row ">
              <div className="d-flex align-items-center mb-3 mb-md-0 filterby">
                Filters by:
              </div>
              <div className="d-flex align-items-center  flex-wrap justify-content-between">
                <a href="javascript:void(0)" className="projectAspect">
                  All projects<i className="fa fa-times"></i>
                </a>
                <a href="javascript:void(0)" className="projectAspect">
                  Accepted<i className="fa fa-times"></i>
                </a>
                <a href="javascript:void(0)" className="projectAspect">
                  Decline<i className="fa fa-times"></i>
                </a>
                <a href="javascript:void(0)" className="projectAspect">
                  Deleted<i className="fa fa-times"></i>
                </a>
                <a href="javascript:void(0)" className="projectAspect">
                  Undecided<i className="fa fa-times"></i>
                </a>
              </div>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="star-box">
              <div className="container">
                <div className="row">
                  {domainList &&
                    domainList.map((domain, key) =>
                      domain.videos.length > 0
                        ? domain.videos.map((video, key) => (
                          <div key={key} className="col-md-6">
                            <div className="domains">
                              <h4>{domain.domain_name}</h4>
                              <img src={userImg} alt="icon" width="80" />
                              <h4 className="m-0">
                                {domain.user.first_name}{" "}
                                {domain.user.last_name}
                              </h4>
                              <span>Marketing Manager</span>
                              <Rating
                                initialValue={rating}
                                readonly={true} /* Available Props */
                              />
                              <a
                                href="#"
                                onClick={(e) =>
                                  openVideoPlayModal(e, video.id)
                                }
                              >
                                <h6>Watch</h6>
                              </a>
                            </div>
                          </div>
                        ))
                        : null
                    )}
                  {playVideoModal && (
                    <VideoPlay
                      show={playVideoModal}
                      onHide={() => setPlayVideoModal(false)}
                      videoId={videoId}
                    />
                  )}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
        <div className="approve_deny">
          <Button variant="contained" color="success" className="approve">Approve</Button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button variant="contained" className="deny">Deny</Button>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default VideoPitch;
