import React, {useEffect, useState} from "react";
import { Form, Modal } from "react-bootstrap";
import { Player, BigPlayButton } from "video-react";
import "video-react/dist/video-react.css";
import ApiHelper from "../../helpers/apiHelper";
import { API_URL } from "../../variables/variables";

const VideoPlay = (props) => {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const { videoId } = props;
    
    ApiHelper.get(`${API_URL}/api/domains/get_video/${videoId}`)
      .then(res => {
        setVideoData(res.data);
      });
  }, [props]);

  return (
    <Modal
      show={props.show} onHide={props.onHide} size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>Watch Video</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Player
            playsInline
            fluid={false}
            width='100%'
            height={680}
            src={videoData}
          >
            <BigPlayButton position="center" />
          </Player>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-cta" onClick={props.onHide}>Close</button>
      </Modal.Footer>
    </Modal>
  )
}

export default VideoPlay;
