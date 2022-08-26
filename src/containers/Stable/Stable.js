import React, { useEffect, useState } from "react";
import { Redirect, Switch, useRouteMatch } from "react-router-dom";
import "../../assets/sass/theme.scss";
import "../../assets/sass/responsive.scss";
import "../../assets/sass/bootstrap.min.css";
import a1img from "../../assets/img/a1.png";
import a2img from "../../assets/img/a2.png";
import a3img from "../../assets/img/a3.png";
import a4img from "../../assets/img/a4.png";
import a5img from "../../assets/img/a5.png";
import a6img from "../../assets/img/a6.png";
import a7img from "../../assets/img/a7.png";
import a8img from "../../assets/img/a8.png";
import n2img from "../../assets/img/n2.png";
import n3img from "../../assets/img/n3.png";
import n4img from "../../assets/img/n4.png";
import n5img from "../../assets/img/n5.png";
import { Link } from "react-router-dom";
import ApiHelper from "../../helpers/apiHelper";
import * as variable from "../../variables/variables";
import { ListGroup } from "react-bootstrap";
import PrivateRoute from "../../components/PrivateRoute";
import DomainLeads from "../../containers/Domains/Domainlead";
import VideoPitch from "../VideoPitch";
import PowerPortfolio from "../Powerportfolio/Powerportfolio";
import AddDomain from "../Domains/AddDomain";
import DomainleadNegotiation from "../../containers/Domains/DomainleadNegotiation";
import "./Stable.css";

function Stable() {
  // The <Route> that rendered this component has a
  // path of `/topics/:topicId`. The `:topicId` portion
  // of the URL indicates a placeholder that we can
  // get from `useParams()`.
  let [state, setState] = useState({
    data: {
      domain_leads: 0,
      video_pitch_leads: 0,
      recently_viewed_domains: 0,
      market_count: 0,
    },
  });
  useEffect(() => {
    let isCancelled = false;

    ApiHelper.get(variable.API_URL + "/api/domains/my-stable")
      .then((res) => {
        if (!isCancelled) {
          setState(res);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return () => {
      isCancelled = true;
    };
  }, []);
  let { path, url } = useRouteMatch();
  

  return (
    <React.Fragment>
      <div className="main bg-dark stableView">
        <div className="stable-icon">
          <div className="stable-title text-center">
            {/* <img src={stable} alt="#" width="250" /> */}
            <h1 className="breed">My Stable</h1>
          </div>
          <div className="container-fluid" style={{width: "88%"}}>
            <ListGroup horizontal className="my-stable-lisiting">
              {window.location.pathname.includes("/domain-leads") ? (
                <ListGroup.Item active style={{background: "#323232!important"}}>
                  <Link to={`${url}/domain-leads`}>
                    <img src={a1img} alt="icon" />
                    <h5>  
                      domain leads <br />
                      <span className="badge badge-info">
                        {state.data.domain_leads}
                      </span>
                    </h5>
                  </Link>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Link to={`${url}/domain-leads`}>
                    <img src={a1img} alt="icon" />
                    <h5>
                      domain leads <br />
                      <span className="badge badge-info">
                        {state.data.domain_leads}
                      </span>
                    </h5>
                  </Link>
                </ListGroup.Item>
              )}

              {window.location.pathname.includes("/video-pitch") ? (
                <ListGroup.Item active>
                  <Link to={`${url}/video-pitch`}>
                    <img src={a2img} alt="icon" />
                    <h5>
                      video pitch leads
                      <br />
                      <span className="badge badge-info">
                        {state.data.video_pitch_leads}
                      </span>
                    </h5>
                  </Link>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Link to={`${url}/video-pitch`}>
                    <img src={a2img} alt="icon" />
                    <h5>
                      video pitch leads
                      <br />
                      <span className="badge badge-info">
                        {state.data.video_pitch_leads}
                      </span>
                    </h5>
                  </Link>
                </ListGroup.Item>
              )}
              {window.location.pathname.includes("/recently-viewed-domains") ? (
                <ListGroup.Item active>
                  <Link to={`${url}/recently-viewed-domains`}>
                    <img src={a3img} alt="icon" />
                    <h5>
                      Recent Views
                      {/* <br /> domains */}
                      <br />
                      <span className="badge badge-info">
                        {state.data.recently_viewed_domains}
                      </span>
                    </h5>
                  </Link>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Link to={`${url}/recently-viewed-domains`}>
                    <img src={a3img} alt="icon" />
                    <h5>
                      Recent Views
                      {/* <br /> domains */}
                      <br />
                      <span className="badge badge-info">
                        {state.data.recently_viewed_domains}
                      </span>
                    </h5>
                  </Link>
                </ListGroup.Item>
              )}
              {window.location.pathname.includes("/portfolio") ? (
                <ListGroup.Item active>
                  <Link to={`${url}/portfolio`}>
                    <img src={a5img} alt="icon" />
                    <h5>portfolio</h5>
                  </Link>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Link to={`${url}/portfolio`}>
                    <img src={a5img} alt="icon" />
                    <h5>portfolio</h5>
                  </Link>
                </ListGroup.Item>
              )}
              {window.location.pathname.includes("/add_domains") ? (
                <ListGroup.Item active>
                  <Link to={`${url}/add_domains`}>
                    <img src={a6img} alt="icon" />
                    <h5>Add domains</h5>
                  </Link>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Link to={`${url}/add_domains`}>
                    <img src={a6img} alt="icon" />
                    <h5>Add domains</h5>
                  </Link>
                </ListGroup.Item>
              )}
              {window.location.pathname.includes("/traffic") ? (
                <ListGroup.Item active>
                  <Link to={`${url}/traffic`}>
                    <img src={a4img} alt="icon" />
                    <h5>traffic</h5>
                  </Link>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Link to={`${url}/traffic`}>
                    <img src={a4img} alt="icon" />
                    <h5>traffic</h5>
                  </Link>
                </ListGroup.Item>
              )}

              {window.location.pathname.includes("/market") ? (
                <ListGroup.Item active>
                  <Link to={`${url}/market`}>
                    <img src={a7img} alt="icon" />
                    <h5>
                      market
                      <br />
                      <span className="badge badge-info">
                        {state.data.market_count}
                      </span>
                    </h5>
                  </Link>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Link to={`${url}/market`}>
                    <img src={a7img} alt="icon" />
                    <h5>
                      market
                      <br />
                      <span className="badge badge-info">
                        {state.data.market_count}
                      </span>
                    </h5>
                  </Link>
                </ListGroup.Item>
              )}

              {window.location.pathname.includes("/settings") ? (
                <ListGroup.Item active>
                  <Link to={`${url}/settings`}>
                    <img src={a8img} alt="icon" />
                    <h5>settings</h5>
                  </Link>
                </ListGroup.Item>
              ) : (
                <ListGroup.Item>
                  <Link to={`${url}/settings`}>
                    <img src={a8img} alt="icon" />
                    <h5>settings</h5>
                  </Link>
                </ListGroup.Item>
              )}
            </ListGroup>
            <Switch>
              <PrivateRoute
                exact
                path={`${path}/domain-leads`}              
                component={DomainLeads}
              />
              <PrivateRoute
                path={`${path}/video-pitch`}
                component={VideoPitch}
              />
              <PrivateRoute
                path={`${path}/recently-viewed-domains`}
                component={() => <React.Fragment></React.Fragment>}
              />
              <PrivateRoute
                path={`${path}/portfolio`}
                component={PowerPortfolio}
              />
              <PrivateRoute
                path={`${path}/add_domains`}
                component={AddDomain}
              />
              <PrivateRoute
                path={`${path}/traffic`}
                component={() => <React.Fragment></React.Fragment>}
              />
              <PrivateRoute
                path={`${path}/market`}
                component={() => <React.Fragment></React.Fragment>}
              />
              <PrivateRoute
                path={`${path}/settings`}
                component={() => <React.Fragment></React.Fragment>}
              />
              <PrivateRoute
                path={`${path}/domain-leads/negotiation/:id`}
                component={DomainleadNegotiation}
              />

              <PrivateRoute
                path={`${path}`}
                component={() => (
                  <Redirect to={`${url}/domain-leads`}></Redirect>
                )}
              />
            </Switch>
          </div>
        </div>
        <div className="social s-bottom">
          <Link to="#">
            <img src={n2img} alt="icon" width="25" />
          </Link>
          <Link to="#">
            <img src={n3img} alt="icon" width="25" />
          </Link>
          <Link to="#">
            <img src={n4img} alt="icon" width="25" />
          </Link>
          <Link to="#">
            <img src={n5img} alt="icon" width="25" />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Stable;
