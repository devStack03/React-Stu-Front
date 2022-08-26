/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../../assets/sass/theme.scss";
import "../../assets/sass/responsive.scss";
import "../../assets/sass/bootstrap.min.css";
import "../../assets/sass/range.scss";
import { Link, useHistory, useParams } from "react-router-dom";
import * as variable from "../../variables/variables";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
} from "react-bootstrap";
import axios from "axios";
import ApiHelper from "../../helpers/apiHelper";
import { toastr } from "react-redux-toastr";

const SponsoredPage = () => {
  const history = useHistory();

  const [buyNowHeadlines, setBuyNowHeadlines] = useState([]);
  const [startupBreedersHeadlines, setStartupBreedersHeadlines] = useState([]);
  const [tradeDomainsHeadlines, setTradeDomainsHeadlines] = useState([]);
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
        console.log(res);
        let buyNowList = res.data?.filter((item) => {
          return item.category_obj.name === "Buy Now";
        });
        setBuyNowHeadlines(buyNowList);

        let startupBreeders = res.data?.filter((item) => {
          return item.category_obj.name === "Startup Breeders";
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
  }, [getSponsored]);

  const handleBuyNow = (e, domain) => {
    history.push("/buy_order");
  };

  let { page } = useParams();

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

  return (
    <React.Fragment>
      <Container>
        <Row className="mt-4 pt-4 mb-4 homepagesponsored-headlines with-changed-view">
          {page === "domain-trade" && (
            <Col xs={12} className="mb-4 mb-lg-0">
              <Card border="light" className="shadow-sm custom-card">
                <Card.Header className="d-flex justify-content-center alirn-items-center">
                  <h2>Domain trade</h2>
                </Card.Header>
                <Card.Body>
                  <ListGroup className="p-3">
                    {tradeDomainsHeadlines.map((domain, index) => {
                      return (
                        <ListGroup.Item key={domain + index}>
                          <div className="d-flex justify-content-between">
                            <Link to={"/landing/" + domain.domain_obj.id}>
                              {domain.domain_obj.domain_name}
                            </Link>
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
                    })}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          )}
          {page === "buy-now" && (
            <Col xs={12} className="mb-4 mb-lg-0">
              <Card border="light" className="shadow-sm custom-card">
                <Card.Header className="d-flex justify-content-center alirn-items-center">
                  <h2>Buy Now</h2>
                </Card.Header>
                <Card.Body>
                  <ListGroup className="p-3">
                    {buyNowHeadlines.map((domain, index) => {
                      return (
                        <ListGroup.Item key={domain + index}>
                          <div className="d-flex justify-content-between ">
                            <div className="d-flex align-items-start flex-column">
                              <Link to={"/landing/" + domain.domain_obj.id}>
                                {domain.domain_obj.domain_name}
                              </Link>
                              {"$" + domain.domain_obj.buyer_price}
                            </div>
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
                    })}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          )}
          {page === "startup-breeders" && (
            <Col xs={12}>
              <Card border="light" className="shadow-sm  custom-card">
                <Card.Header className="d-flex justify-content-center alirn-items-center">
                  <h2>Startup Breeders</h2>
                </Card.Header>
                <Card.Body>
                  <ListGroup className="p-3">
                    {startupBreedersHeadlines.map((domain, index) => {
                      return (
                        <ListGroup.Item key={domain + index}>
                          <div className="d-flex justify-content-between">
                            <Link to={"/landing/" + domain.domain_obj.id}>
                              {domain.domain_obj.domain_name}
                            </Link>
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
                    })}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          )}
        </Row>
      </Container>
    </React.Fragment>
  );
};
export default SponsoredPage;
