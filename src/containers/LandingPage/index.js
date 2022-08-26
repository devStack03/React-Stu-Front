import React, {useEffect, useState} from "react";
import { useHistory } from "react-router";
import videoPitchImg from '../../assets/img/videopitch.png';
import camImg from '../../assets/img/cam.png';
import horseshoeImg from '../../assets/img/horseshoe.png';
import StartupBreeders from "../../components/StartupBreeders";
import ApiHelper from "../../helpers/apiHelper";
import { API_URL } from "../../variables/variables"

const LandingPage = (props) =>  {
  const history = useHistory();
  const {id} = props.match.params;
  const [domainData, setDomainData] = useState(null);

  useEffect(() => {
    ApiHelper.get(`${API_URL}/api/domains/${id}`)
      .then(res => {
        console.log(res.data)
        setDomainData(res.data);
      });
  }, [id]);

  return(
    <React.Fragment style={{zIndex: 1000}}>
      {/* <CommonHeader/> */}
      <div style={{backgroundColor:'#eaeaea',position: "relative", zIndex: 1000, marginTop: "-78px"}}>
        <div className="main m-landing">
          <div className="price-banner">
            <div className="container-fluid">
              <div className="p-mobile">
                <div className="p-mobile-rect">
                    <div className="landing-domain-name-mobile">
                      <span style={{fontSize: '20px', fontWeight: 'bold'}}>{domainData && domainData.domain_name}</span><br />
                      <span>is for sale</span><br />
                    </div>
                    {(domainData && domainData.business_status === "Buy Now")?
                        (<div className="landing-status-mobile">
                          <span style={{fontSize: '20px', fontWeight: 'bold'}}>Buy Now {(domainData && domainData.seller_price === 0)? "":("$"+ (domainData && domainData.seller_price))}</span>
                        </div>)
                      :
                        (<div className="landing-status-mobile">
                          <span style={{fontSize: '20px', fontWeight: 'bold'}}>{(domainData && domainData.business_status === "")? "Enquire":domainData && domainData.business_status}</span>
                        </div>)
                  }
                </div>
              </div>
              <div className="p-left">
                <img src={videoPitchImg} alt="img" width="500"/>
                <p>Aspiring entrepreneurs if you have a solid and profitable idea<br/>
                  and you have a record of success on the internet upload your<br/>
                  Video Pitch Idea - Rick Schwartz</p>
                <button
                  className="btn video-btn text-uppercase"
                  onClick={() => history.push(`/video_upload/${id}`)}
                >
                  <img src={camImg} alt="icon" width="24"/> pitch video
                </button>
                {/* <h5 className="text-right">OPTION 2 Domain Inquiry</h5> */}
              </div>
              <div className="p-right">
                <img src={horseshoeImg} alt="icon" width="360"/>
                <div className="landing-domain-name">
                  <span style={{fontSize: '20px', fontWeight: 'bold'}}>{domainData && domainData.domain_name}111</span><br />
                  <span>is for sale</span><br />
                </div>
                {(domainData && domainData.business_status === "Buy Now")?
                    (<div className="landing-status">
                      <span style={{fontSize: '20px', fontWeight: 'bold'}}>Buy Now {(domainData && domainData.seller_price === 0)? "":("$"+ (domainData && domainData.seller_price))}</span>
                    </div>)
                  :
                    (<div className="landing-status">
                      <span style={{fontSize: '20px', fontWeight: 'bold'}}>{(domainData && domainData.business_status === "")? "Enquire":domainData && domainData.business_status}</span>
                    </div>)
                }
              </div>
            </div>
          </div>
          <StartupBreeders />
        </div>
      </div>
    </React.Fragment>
  )
}
export default LandingPage;
