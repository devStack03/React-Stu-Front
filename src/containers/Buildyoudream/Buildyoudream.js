import React, { Component } from 'react';

import "../../assets/sass/flexslider.css";
import "../../assets/sass/theme.scss";
import "../../assets/sass/responsive.scss";
import "../../assets/sass/bootstrap.min.css";
import i1img from "../../assets/img/i1.png";
import i2img from "../../assets/img/i2.png";
import i3img from "../../assets/img/i3.png";
import i4img from "../../assets/img/i4.png";
import i5img from "../../assets/img/i5.png";
import dataimg from "../../assets/img/data.png";
import seoimg from "../../assets/img/seo.png";
import i6img from "../../assets/img/i6.png";
import i7img from "../../assets/img/i7.png";
import i8img from "../../assets/img/i8.png";
import i9img from "../../assets/img/i9.png";
import i10img from "../../assets/img/i10.png";
import virtualimg from "../../assets/img/virtual.png";
import businessimg from "../../assets/img/business.png";
import download from "../../assets/img/download.png";
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';

class Buildyoudream extends Component {
  constructor(props) {
    super(props);
    this.state = { fileUploadState: "" }
    this.inputReference = React.createRef();
  }

  fileUploadAction = () => this.inputReference.current.click();
  fileUploadInputChange = (e) => this.setState({ fileUploadState: e.target.value });

  render() {


    return (
      <React.Fragment>
        <Header />
        <div className="main bg-dark build-dream">
          <div className="container">
            <h2><span className="text-uppercase">build your dream - </span>Post Your Job</h2>
            <div className="b-content">
              <p>STARTUP BREEDERS - Find Talent To Build The Next Big Thing</p>
            </div>
            <div className="banner-icons b-dream pt-2" style={{ width: "100%" }}>
              <h4 className="text-capitalize"><span>select</span> categories</h4>
              <div className="row">

                <div className="col">
                  <div className="icon">
                    <img src={i1img} alt="icons" />
                    <h5>buy <br /> domain</h5>
                  </div>
                </div>
                <div className="col">
                  <div className="icon">
                    <img src={i2img} alt="icons" />
                    <h5>sell <br /> domain</h5>
                  </div>
                </div>
                <div className="col">
                  <div className="icon">
                    <img src={i3img} alt="icons" />
                    <h5>logo <br /> design</h5>
                  </div>
                </div>
                <div className="col">
                  <div className="icon">
                    <img src={i4img} alt="icons" />
                    <h5>graphic <br /> design</h5>
                  </div>
                </div>
                <div className="col">
                  <div className="icon">
                    <img src={i5img} alt="icons" />
                    <h5>programmers</h5>
                  </div>
                </div>
                <div className="col">
                  <div className="icon">
                    <img src={dataimg} alt="icons" />
                    <h5>data</h5>
                  </div>
                </div>
                <div className="col">
                  <div className="icon">
                    <img src={seoimg} alt="icons" />
                    <h5>seo and<br /> marketing</h5>
                  </div>
                </div>

              </div>
              <div className="row">

                <div className="col">
                  <div className="icon">
                    <img src={i6img} alt="icons" />
                    <h5>video and <br />animation</h5>
                  </div>
                </div>
                <div className="col">
                  <div className="icon">
                    <img src={i7img} alt="icons" />
                    <h5>writing and <br />translation</h5>
                  </div>
                </div>
                <div className="col">
                  <div className="icon">
                    <img src={i8img} alt="icons" />
                    <h5>web and<br /> mobile app</h5>
                  </div>
                </div>
                <div className="col">
                  <div className="icon">
                    <img src={i9img} alt="icons" />
                    <h5>music and <br />audio</h5>
                  </div>
                </div>
                <div className="col">
                  <div className="icon">
                    <img src={i10img} alt="icons" />
                    <h5>wordpress</h5>
                  </div>
                </div>
                <div className="col">
                  <div className="icon">
                    <img src={virtualimg} alt="icons" />
                    <h5>virtual <br />assistant</h5>
                  </div>
                </div>
                <div className="col">
                  <div className="icon">
                    <img src={businessimg} alt="icons" />
                    <h5>business</h5>
                  </div>
                </div>

              </div>
            </div>
            <div className="job-post">
              <div className="row">
                <div className="col-md-6">
                  <label>Give your job posting a title</label>
                  <input type="text" name="name" placeholder="name" style={{ border: '1px solid black' }} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Describe the work that needs to be done</label>
                  <textarea placeholder="provide a more detailed description of your project, to help you get better proposals."
                    style={{ border: '1px solid black' }}></textarea>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7">
                  <label>(Optional) Attachments to help explain the job</label>
                  <p>Only JPEG, PNG, GIF, TXT, PDF, DOC, ODT, XLS, CSV files are allowed.</p>
                  <button onClick={this.fileUploadAction} className="file_upload" style={{ border: '1px solid black' }}><img src={download} alt="icon" />Drop or click here to upload</button>
                  <input type="file" name="fileupload" id="fileupload" style={{ display: 'none' }}
                    hidden ref={this.inputReference} onChange={this.fileUploadInputChange} />

                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <label>What type of project do you have?</label>
                  <div className="radio">
                    <label className="l-radio">One-time project
                      <input type="radio" name="radio" />
                      <span className="radio-check"></span>
                    </label>
                    <label className="l-radio">Ongoing project
                      <input type="radio" name="radio" />
                      <span className="radio-check"></span>
                    </label>
                    <label className="l-radio">I am not sure
                      <input type="radio" name="radio" />
                      <span className="radio-check"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>What is your budget?(Higher budget attracts more freelancers)</label>
                  <div className="budget">
                    <span>$</span>
                    <input type="text" placeholder="Your Max Budget" style={{ border: '1px solid black' }} />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>How long do you want to run this posting?</label>
                  <select name="pets" id="length-select" style={{ border: '1px solid black' }}>
                    <option value="">--select length--</option>
                    <option value="dog">1</option>
                    <option value="cat">2</option>
                    <option value="hamster">3</option>
                    <option value="parrot">4</option>
                    <option value="spider">5</option>
                    <option value="goldfish">6</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label>Keywords: What skill is required?</label>
                  <input type="text" name="name" placeholder="name" style={{ border: '1px solid black' }} />
                </div>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <label>How much exposure do you want your job to get?</label>
                  <div className="radio">
                    <label className="l-radio">Maximum Allow search engines like google to index your positing
                      <input type="radio" name="radio" />
                      <span className="radio-check"></span>
                    </label>
                    <label className="l-radio">Limited Only STUD members can view your posting
                      <input type="radio" name="radio" />
                      <span className="radio-check"></span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="submit-post">
                    <Link to="#">Submit Job</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </React.Fragment>
    )
  }
}
export default Buildyoudream;