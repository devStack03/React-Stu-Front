/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import avatarImg from "../../assets/img/avatar.png";
import settingImg from "../../assets/img/setting.png";
import shareImg from "../../assets/img/share.png";
import youtubeImg from "../../assets/img/youtube.png";
import * as variable from "../../variables/variables";
import ApiHelper from "../../helpers/apiHelper";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const [domainList, setDomainList] = useState([]);
  const user = useSelector((state) => state?.auth?.user);
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  useEffect(() => {
    getDomainList();
  }, []);
  const getDomainList = () => {
    ApiHelper.get(variable.API_URL + '/api/domains/?page=1&limit=1000').then(res => {
      setDomainList(res.data.domains);
    });
  }
  return (
    <React.Fragment>{isAuthenticated && (<div className="main bg-dark stable">
      <div className="container edit-profile">
        <div className="row">
          <div className="col-md-3">
            <div className="user-icon">
              <img src={avatarImg} alt="image" width="70" />
            </div>
          </div>
          <div className="col-md-9 text-right">
            <a href="" className="btn prof">Edit profile</a>
            <div className="setting">
              <img src={settingImg} alt="icon" width="20" />
            </div>
            <div className="share">
              <img src={shareImg} alt="icon" width="20" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 projects">
            <div className="gray-box">
              <h4>{user?.user?.first_name} {user?.user?.last_name}</h4>
              <h5>{user?.user?.email}</h5>
            </div>
            <h5 className="text-center">My Video Pitch</h5>
            <div className="gray-box text-center">
              <a href="#" className="v-player">
                <img src={youtubeImg} alt="icon" />
              </a>
            </div>
            <h5 className="text-center">Buy Now</h5>
            <div className="gray-box">
              <div className="breeder-table">
                {domainList
                  .filter(obj => obj.business_status === "Buy Now")
                  .map(domain => <p>{domain.domain_name}</p>)}
              </div>
            </div>
            <h5 className="text-center">Startup Breeders</h5>
            <div className="gray-box">
              <div className="breeder-table">
                {domainList
                  .filter(obj => obj.startup_breeders_switch === 'Yes')
                  .map(domain => <p>{domain.domain_name}</p>)}
              </div>
            </div>
            <h5 className="text-center">Trade Listed Domains</h5>
            <div className="gray-box">
              <div className="breeder-table">
                {domainList
                  .filter(obj => obj.trade_switch === 'Yes')
                  .map(domain => <p>{domain.domain_name}</p>)}
              </div>
            </div>
          </div>
          <div className="col-md-7">
            <div className="breeder-right">
              <h5 className="text-center text-uppercase">My Projects</h5>
              <div className="gray-box"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="social s-bottom">
        <a href="#"><img src="img/n2.png" alt="icon" width="25" /></a>
        <a href="#"><img src="img/n3.png" alt="icon" width="25" /></a>
        <a href="#"><img src="img/n4.png" alt="icon" width="25" /></a>
        <a href="#"><img src="img/n5.png" alt="icon" width="25" /></a>
      </div>

    </div>
    )}
    </React.Fragment>
  )
}

export default UserProfile;