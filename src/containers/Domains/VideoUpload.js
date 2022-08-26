import React, { useState } from "react";
import { useHistory } from "react-router";
import S3 from 'react-aws-s3';
import videoPitchImg from "../../assets/img/videopitch.png";
import { toastr } from "react-redux-toastr";
import ApiHelper from "../../helpers/apiHelper";
import { API_URL } from "../../variables/variables";

const VideoUpload = (props) => {
  const {id} = props.match.params;
  const history = useHistory();
  const hiddenFileInput = React.useRef(null);
  const [fileData, setFileData] = useState(null);

  const handleFile = e => {
    if(checkFileSize) {
      setFileData(e.target.files[0]);
    }
  };

  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  const checkFileSize = e => {
    let files = e.target.files;
    let size = 2 * 1024 * 1024;
    let err = [];
    for(let x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err[x] = files[x].name + ' is too large, please pick a smaller than 2M\n';
      }
    }
    for(let z = 0; z < err.length; z++) {
      toastr.error(err[z]);
      e.target.value = null;
    }
    return true;
  };

  const handleUpload = () => {
    const config = {
      bucketName: 'stud-video',
      // dirName: 'media', /* optional */
      region: 'eu-west-2',
      accessKeyId: 'AKIAS3BD4RJBZMGZPYPI',
      secretAccessKey: '8M/EIiwNg588+q1KJNhEUK3yurVemAfuzGhVNpHd',
      // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
    };
    const ReactS3Client = new S3(config);
    const fileName = fileData.name;
    ReactS3Client.uploadFile(fileData, fileName)
      .then(data => {
        if (data.status === 204) {
          ApiHelper.post(`${API_URL}/api/domains/upload_video/`, {
            domain_id: id,
            file_name: data.key
          }).then(res => {
            toastr.success("Success!");
            history.push("/video_pitch");
          }).catch(err => {
            toastr.error("Fail!");
          });
        } else {
          toastr.error("Failed to upload this video file.");
        }
      });
  };

  return (
    <React.Fragment>
      {/* <CommonHeader />
      <SearchHeader /> */}
      <div className="main bg-dark video-img ">
        <div className="container">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <div className="video-pitch">
                <img src={videoPitchImg} alt="img" width="340" />
                <div className="blackbox">
                  <input
                    type="file"
                    name="file"
                    ref={hiddenFileInput}
                    onChange={handleFile}
                    style={{display: 'none'}}
                  />
                  <button
                    className="upload text-uppercase"
                    onClick={handleClick}
                  >
                    Upload
                  </button>
                  <p style={{color: "white"}}>{fileData ? fileData.name : ''}</p>
                </div>
                <p>Brief description of your solid and<br /> profitable idea.</p>
                <textarea placeholder="Description(Optional)" />
                <button className="upload text-uppercase" onClick={handleUpload}>Submit</button>
              </div>
            </div>
            <div className="col-md-3" />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default VideoUpload;
