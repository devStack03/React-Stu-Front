/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../../assets/sass/theme.scss";
import "../../assets/sass/responsive.scss";
import "../../assets/sass/bootstrap.min.css";
import "../../assets/sass/range.scss";
import { Link, useHistory } from "react-router-dom";
import * as variable from "../../variables/variables";
import { ArrowsAngleContract } from 'react-bootstrap-icons';
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import {
  Button,
  Card,
  Col,
  ListGroup,
  Row,
} from "react-bootstrap";
import axios from "axios";
import ApiHelper from "../../helpers/apiHelper";
import { toastr } from "react-redux-toastr";
import { Pagination } from 'antd';
import Arrow from "../../assets/img/Arrow.png"

const SponsoredHeadlines = () => {

  let count_per_page = 6;

  const history = useHistory();
  const [buyNowHeadlines, setBuyNowHeadlines] = useState([]);
  const [startupBreedersHeadlines, setStartupBreedersHeadlines] = useState([]);
  const [tradeDomainsHeadlines, setTradeDomainsHeadlines] = useState([]);

  const [useCurrentDomainList, setUseCurrentDomainList] = useState([]);
  const [activateIndex, setActivateIndex] = useState(0);

  const [page_show, setpage_show] = useState(1);


  const scrollToSponsored = () => {
    let currentLocation = window.location.href;
    const hasCommentAnchor = currentLocation.includes("#");
    if (hasCommentAnchor) {
      const anchorCommentId = `${currentLocation.substring(
        currentLocation.indexOf("#") + 1
      )}`;
      const anchorComment = document.getElementById(anchorCommentId);
      if (anchorComment) {
        anchorComment.scrollIntoView({ behavior: "smooth" });
      }
    }
  };
  let getSponsored = () => {
    axios
      .get(variable.API_URL + "/api/domains/sponsored-headlines/")
      .then((res) => {
        let buyNowList = res.data?.filter((item) => {
          return item.category_obj.name === "Buy Now";
        });
        setBuyNowHeadlines(buyNowList);

        let startupBreeders = res.data?.filter((item) => {
          return item.category_obj.name === "Startup Breeders" && item.domain_obj.startup_breeders === "Pitch To Us";
        });
        setStartupBreedersHeadlines(startupBreeders);
        let tradeDomains = res.data?.filter((item) => {
          return item.category_obj.name === "Trade Domains";
        });
        setTradeDomainsHeadlines(tradeDomains);
        scrollToSponsored();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getSponsored();
  }, []);

  const handleBuyNow = (e, domain) => {
    history.push("/buy_order");
  };

  const onChange = (e) => {
    setpage_show(e)
  }

  const generateLead = (e, category, domain) => {
    switch (category) {
      case "Buy Now":
        handleBuyNow(e, domain);
        return false;
      default:
        ApiHelper.post(
          variable.API_URL + "/api/domains/domain-leads/",
          {
            domain_id: domain.id,
          },
          {},
          true
        ).then((res) => {
          Promise.all([
            ApiHelper.post(
              variable.API_URL + "/api/domains/notifications/",
              {
                domain_lead_id: res.data.domain_lead_id,
                category: category,
              },
              {},
              true
            ),
            ApiHelper.post(
              variable.API_URL + "/api/domains/negotiation/",
              {
                domain_lead_id: res.data.domain_lead_id,
                amount: 0,
                status: 1,
              },
              {},
              true
            ),
          ])
            .then((res) =>
              toastr.success("Success", "Your request is submitted succefully")
            )
            .catch(() => {
              toastr.error("Success", "Something went wrong!");
            });
        });
    }

    return false;
  };




  const maximize = async (num) => {
    console.log(num)
    setActivateIndex(num);
    switch (num) {
      case 0:
        // code block
        break;
      case 1:
        // code block
        setUseCurrentDomainList(tradeDomainsHeadlines);
        break;
      case 2:
        // code block  
        setUseCurrentDomainList(buyNowHeadlines);
        break;
      case 3:
        // code block
        setUseCurrentDomainList(startupBreedersHeadlines);
        break;
      default:
      // code block
    }
  }

  if (activateIndex === 0)
    return (
      <React.Fragment>
        <Row className="mt-4 pt-4 mb-4 homepagesponsored-headlines with-changed-view">
          <Col lg={4} xs={12}>
            <h2 className="homeHeader">
              <Link to="/sponsored/domain-trade">DOMAIN TRADE OPTIONS </Link>
            </h2>
            <div className="gap-space"></div>
            <Card border="light" className="shadow-sm custom-card">
              <Card.Body>
                <ListGroup className="p-3">
                  {tradeDomainsHeadlines.map((domain, index) => {
                    if (index < count_per_page)
                      return (
                        <ListGroup.Item key={domain + index}>
                          <div className="d-flex justify-content-between align-items-center">
                            <Link to={'/landing/' + domain.domain_obj.id} className="domainId">{domain.domain_obj.domain_name}</Link>
                            <Button
                              onClick={(e) =>
                                generateLead(
                                  e,
                                  domain.domain_obj.trade_option,
                                  domain.domain_obj
                                )
                              }
                              className="button"
                              size="sm"
                              variant="secondary"
                            >
                              {domain.domain_obj.trade_option}
                            </Button>
                          </div>
                        </ListGroup.Item>
                      );
                    if (index === count_per_page) {
                      return (<div className='domainTableHome' onClick={() => maximize(1)}>
                        SEE ALL   <img src={Arrow} className="arrow-image" alt="arrow-imag"></img>
                      </div>)
                    }
                    else
                      return;
                  })}

                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} xs={12} className="col-gap">
            <h2 className="homeHeader">
              <Link to="/sponsored/buy-now">BUY NOW</Link>
            </h2>
            <div className="gap-space"></div>
            <Card border="light" className="shadow-sm custom-card">
              <Card.Body>
                <ListGroup className="p-3">
                  {buyNowHeadlines.map((domain, index) => {
                    if (index < count_per_page)
                      return (
                        <ListGroup.Item key={domain + index}>
                          <div className="d-flex justify-content-between align-items-center">
                              <Link to={'/landing/' + domain.domain_obj.id} className="domainId">{domain.domain_obj.domain_name}</Link>
                              <div className="domain_price">{"$" + domain.domain_obj.buyer_price}</div>
                            <Button
                              onClick={(e) =>
                                generateLead(e, "Buy Now", domain.domain_obj)
                              }
                              className="button"
                              size="sm"
                              variant="secondary"
                            >
                              Checkout
                            </Button>
                          </div>
                        </ListGroup.Item>
                      );
                    if (index === count_per_page)
                      return (<div className='domainTableHome' onClick={() => maximize(2)}>
                        SEE ALL   &gt;
                      </div>)
                    else
                      return;
                  })}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} xs={12} className="col-gap">
            <h2 className="homeHeader">
              <Link to="/sponsored/startup-breeders"> STARTUP BREEDERS</Link>
            </h2>
            <div className="gap-space"></div>
            <Card border="light" className="shadow-sm  custom-card">
              <Card.Body>
                <ListGroup className="p-3">
                  {startupBreedersHeadlines.map((domain, index) => {
                    if (index < count_per_page)
                      return (
                        <ListGroup.Item key={domain + index}>
                          <div className="d-flex justify-content-between align-items-center">
                            <Link to={'/landing/' + domain.domain_obj.id} className="domainId">{domain.domain_obj.domain_name}</Link>
                            <Button
                              className="button"
                              size="sm"
                              variant="secondary"
                              onClick={(e) =>
                                generateLead(
                                  e,
                                  domain.domain_obj.startup_breeders_switch,
                                  domain.domain_obj
                                )
                              }
                            >
                              {domain.domain_obj.startup_breeders}
                            </Button>
                          </div>
                        </ListGroup.Item>
                      );
                    if (index === count_per_page)
                      return (<div className='domainTableHome' onClick={() => maximize(3)}>
                        SEE ALL   &gt;
                      </div>);
                    else
                      return;
                  })}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );

  if (activateIndex !== 0) {
    console.log(useCurrentDomainList);
    return (
      <>
        <div style={{ padding: '10px' }}>
          <ListGroup as="ul" style={{ width: '100%', margin: 'auto', maxWidth: '1200px' }} >
            <ListGroup.Item as="li" className="cardHeader" >
              Domain Trade Options <ArrowsAngleContract className="expandIcon" onClick={() => maximize(0)} />
            </ListGroup.Item>
            {useCurrentDomainList.slice(page_show, page_show + 5)?.map((item, index) => {
              return (
                <ListGroup.Item as="li" action variant={index % 2 === 0 ? "light" : "secondary"}>
                  <div className="li-item" style={{ textAlign: 'left', paddingLeft: '20px' }}>
                    <a target={'_blank'} rel="noreferrer" href={"https://" + item.domain_obj.domain_name} cursor='pointer'>
                      <label className="li-item-label" for={"buynow" + item.id}>
                        {item.domain_obj.domain_name}
                      </label>
                    </a>
                    <Button className="btn btn-success everybuy">{item.domain_obj.trade_option}</Button>
                  </div>
                </ListGroup.Item>
              )
              // }
            }
            )}
          </ListGroup>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination onChange={onChange} total={useCurrentDomainList.length} />
          </div>
        </div>
      </>
    )
  }

};
export default SponsoredHeadlines;
