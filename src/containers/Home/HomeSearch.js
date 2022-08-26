/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "../../assets/sass/theme.scss";
import "../../assets/sass/responsive.scss";
import "../../assets/sass/bootstrap.min.css";
import "../../assets/sass/range.scss";
import { Link, useHistory } from "react-router-dom";
import * as variable from "../../variables/variables";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import {
  Button,
  Card,
  Col,
  ListGroup,
  Row,
} from "react-bootstrap";
import ApiHelper from "../../helpers/apiHelper";
import { toastr } from "react-redux-toastr";
import { getSearchResult } from "../../redux/actions/search";
import { connect } from "react-redux";
import QueryString from "qs";
import SearchHeaderGlobal from "../../components/SearchHeader/SearchHeaderGlobal";

const SponsoredHeadlines = (props) => {
  let queries = QueryString.parse(props.location.search?.replace("?", ""));

  const history = useHistory();
  const [buyNowHeadlines, setBuyNowHeadlines] = useState([]);
  const [startupBreedersHeadlines, setStartupBreedersHeadlines] = useState([]);
  const [tradeDomainsHeadlines, setTradeDomainsHeadlines] = useState([]);

  useEffect(() => {
    console.log(props.location);
    props.getSearchResult(queries.search, [], {});
  }, []);
  useEffect(() => {
    if (props.searchResults.length) {
      setBuyNowHeadlines(
        props.searchResults.filter((item) => {
          return item.business_status === "Buy Now";
        })
      );

      setStartupBreedersHeadlines(
        props.searchResults.filter((item) => {
          return item.startup_breeders_switch === "Yes";
        })
      );
      setTradeDomainsHeadlines(
        props.searchResults.filter((item) => {
          return item.trade_switch === "Yes";
        })
      );
    }
  }, [props.searchResults]);

  const handleBuyNow = (e, domain) => {
    history.push("/buy_order");
  };

  const generateLead = (e, category, domain) => {
    if(!props.isAuthenticated){
      history.push("/login",{ from: props.location});
      return;
    }

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
      <SearchHeaderGlobal />
      <div className="container-fluid ">
        <Row className="mt-4 pt-4 mb-4 homepagesponsored-headlines with-changed-view mx-0 search-result">
          <Col lg={4} xs={12}>
            <Card border="light" className="shadow-sm custom-card">
              <Card.Header className="d-flex justify-content-center alirn-items-center">
                <h2>
                  <Link to="/sponsored/domain-trade">Domain trade</Link>
                </h2>
              </Card.Header>
              <Card.Body>
                <ListGroup className="p-3">
                  {tradeDomainsHeadlines.map((domain, index) => {
                    return (
                      <ListGroup.Item key={domain + index}>
                        <div className="d-flex justify-content-between">
                        <Link to={'/landing/'+domain.id}>{domain.domain_name}</Link>

                          <Button
                            onClick={(e) =>
                              generateLead(e, domain.trade_option, domain)
                            }
                            className="button"
                            size="sm"
                            variant="secondary"
                          >
                            {domain.trade_option}
                          </Button>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={4} xs={12}>
            <Card border="light" className="shadow-sm custom-card">
              <Card.Header className="d-flex justify-content-center alirn-items-center">
                <h2>
                  <Link to="/sponsored/buy-now"> Buy Now</Link>
                </h2>
              </Card.Header>
              <Card.Body>
                <ListGroup className="p-3">
                  {buyNowHeadlines.map((domain, index) => {
                    return (
                      <ListGroup.Item key={domain.domain_name + index}>
                        <div className="d-flex justify-content-between ">
                        <div className="d-flex align-items-start flex-column">
                          <Link to={'/landing/'+domain.id}>{domain.domain_name}</Link>
                          {"$" + domain.buyer_price}
                        </div>
                          <Button
                            onClick={(e) => generateLead(e, "Buy Now", domain)}
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
          <Col lg={4} xs={12}>
            <Card border="light" className="shadow-sm  custom-card">
              <Card.Header className="d-flex justify-content-center alirn-items-center">
                <h2>
                  <Link to="/sponsored/startup-breeders">
                    {" "}
                    Startup Breeders
                  </Link>
                </h2>
              </Card.Header>
              <Card.Body>
                <ListGroup className="p-3">
                  {startupBreedersHeadlines.map((domain, index) => {
                    return (
                      <ListGroup.Item key={domain.domain_name + index}>
                        <div className="d-flex justify-content-between">
                        <Link to={'/landing/'+domain.id}>{domain.domain_name}</Link>

                          <Button
                            className="button"
                            size="sm"
                            variant="secondary"
                            onClick={(e) =>
                              generateLead(
                                e,
                                domain.startup_breeders_switch,
                                domain
                              )
                            }
                          >
                            {domain.startup_breeders}
                          </Button>
                        </div>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  searchResults: state.search.searchResults,
});

const mapDispatchToProps = (dispatch) => ({
  getSearchResult: (name, extensions) =>
    dispatch(getSearchResult(name, extensions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SponsoredHeadlines);
