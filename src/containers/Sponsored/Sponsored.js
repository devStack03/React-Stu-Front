/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import * as variable from "../../variables/variables";
import CommonHeader from "../../components/Header/CommonHeader";
import SearchHeader from "../../components/SearchHeader/SearchHeader";
import StartupBreeders from "../../components/StartupBreeders";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SET_LOADING } from "../../redux/actions/constants";

const Sponsored = () => {
  const dispatch = useDispatch();

  const [sponsoredHeadlines, setSponsoredHeadlines] = useState([]);
  const scrollToSponsored = () => {
    let currentLocation = window.location.href;
    const hasCommentAnchor = currentLocation.includes("#");
    if (hasCommentAnchor) {
      const anchorCommentId = `${currentLocation.substring(currentLocation.indexOf("#") + 1)}`;
      const anchorComment = document.getElementById(anchorCommentId);
      if (anchorComment) {
        anchorComment.scrollIntoView({ behavior: "smooth" });
      }
    }
  }
  let getSponsored = () => {

    dispatch({
      type: SET_LOADING,
      payload: true,
    });
    axios.get(variable.API_URL + "/api/domains/sponsored-headlines/").then((res) => {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
      console.log(res);
      let buyNowList = res.data?.filter(item => { return item.category_obj.name === "Buy Now" });
      let startupBreeders = res.data?.filter(item => { return item.category_obj.name === "Startup Breeders" });
      let tradeDomains = res.data?.filter(item => { return item.category_obj.name === "Trade Domains" });
      scrollToSponsored();
      let maxLenth = Math.max(buyNowList.length,startupBreeders.length,tradeDomains.length);
   
      let sponsoredDomains = [];
      for (let index = 0; index < maxLenth; index++) {
        let buyNow = buyNowList[index];
        let startupBreedersDomain = startupBreeders[index];
        let tradeDomain = tradeDomains[index];
        let sponsoredDomain = {buynow:"",startup:"",trade:""};
        if(buyNow){
          sponsoredDomain.buynow=buyNow.domain_obj.domain_name;
        }
        if(startupBreedersDomain){
          sponsoredDomain.startup=startupBreedersDomain.domain_obj.domain_name;
        }
        if(tradeDomain){
          sponsoredDomain.trade=tradeDomain.domain_obj.domain_name;
        }
        sponsoredDomains.push(sponsoredDomain);
        
      }
      console.log(sponsoredDomains);
      setSponsoredHeadlines(sponsoredDomains);
    }).catch(error => {
      dispatch({
        type: SET_LOADING,
        payload: false,
      });
      console.log(error);
    });
  }
  useEffect(() => {
    getSponsored()

  }, [getSponsored]);

  return (
    <React.Fragment>
    <CommonHeader />
    <SearchHeader />
    <div style={{ backgroundColor: "#eaeaea" }}>
      <div className="main" id="sponsored">
        <div className="banner" style={{ border: "0" }}>
          <div className="sponsored-headline">
            <h2 className="section-title">Sponsored Headlines</h2>
            <div className="table-outer">
              <table className="table custom-table">
                <tbody>
                  <tr>
                    <th>Domain trade</th>
                    <th>Buy Now</th>
                    <th>Startup Breeders</th>
                  </tr>
                  {sponsoredHeadlines.map((domain,index) => {
                      return (
                        <tr key={index}>
                          <td>{domain.trade}</td>
                          <td>{domain.buynow}</td>
                          <td>{domain.startup}</td>
                        </tr>
                      );
                    })}

               
                </tbody>
              </table>

              <Link to="/#sponsored" className="btn-expand">
                {/* <Link to="#" className="btn-expand"> */}
                <svg
                  width="24"
                  height="24"
                  stroke-width="1.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 2L6 2"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18 22L6 22"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 14V19M12 19L15 16M12 19L9 16"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 10V5M12 5L15 8M12 5L9 8"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <StartupBreeders />
      </div>
    </div>
  </React.Fragment>
  );

}
export default Sponsored;
