import React, { Component, useEffect, useState } from "react";
import "../../assets/sass/theme.scss";
import "../../assets/sass/responsive.scss";
import "../../assets/sass/bootstrap.min.css";
import "../../assets/sass/range.scss";
import { Link, useHistory } from "react-router-dom";
import * as variable from "../../variables/variables";
import { itemsTable } from "../tables";
import {
  ColumnDirective,
  ColumnsDirective,
  GridComponent,
  Inject,
  Sort,
  Page,
  //   Search,
  Toolbar,
} from "@syncfusion/ej2-react-grids";
import star from "../../assets/img/star.png";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import axios from "axios";
import ApiHelper from "../../helpers/apiHelper";
import { toastr } from "react-redux-toastr";

const DomainTradeList = () => {
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
        setBuyNowHeadlines(buyNowList)

        let startupBreeders = res.data?.filter((item) => {
          return item.category_obj.name === "Startup Breeders";
        });
        setStartupBreedersHeadlines(startupBreeders)
        let tradeDomains = res.data?.filter((item) => {
          return item.category_obj.name === "Trade Domains";
        });
        setTradeDomainsHeadlines(tradeDomains)
        scrollToSponsored();
        // let maxLenth = Math.max(
        //   buyNowList.length,
        //   startupBreeders.length,
        //   tradeDomains.length
        // );
        // if (maxLenth > 5) {
        //   maxLenth = 5;
        // }
        // let sponsoredDomains = [];
        // for (let index = 0; index < maxLenth; index++) {
        //   let buyNow = buyNowList[index];
        //   let startupBreedersDomain = startupBreeders[index];
        //   let tradeDomain = tradeDomains[index];
        //   let sponsoredDomain = { buynow: "", startup: "", trade: "" };
        //   if (buyNow) {
        //     sponsoredDomain.buynow = buyNow.domain_obj.domain_name;
        //   }
        //   if (startupBreedersDomain) {
        //     sponsoredDomain.startup =
        //       startupBreedersDomain.domain_obj.domain_name;
        //   }
        //   if (tradeDomain) {
        //     sponsoredDomain.trade = tradeDomain.domain_obj.domain_name;
        //   }
        //   sponsoredDomains.push(sponsoredDomain);
        // }
        // console.log(sponsoredDomains);
        // setSponsoredHeadlines(sponsoredDomains);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getSponsored();
  }, []);

  const handleBuyNow = (e, domain) => {
    history.push('/buy_order');
  }

  const handlePriceRequest = (e, domain) => {
    console.log('price upon request: ', domain);
  }

  const generateLead = (e, category, domain) => {

    switch (category) {
      case 'Buy Now':
        handleBuyNow(e, domain);
        return false;
      default:
        ApiHelper.post(variable.API_URL + '/api/domains/domain-leads/', {
          'domain_id': domain.id,
        }, {}, true).then(res => {
          Promise.all([ApiHelper.post(variable.API_URL + '/api/domains/notifications/', {
            'domain_lead_id': res.data.domain_lead_id,
            'category': category
          }, {}, true),
          ApiHelper.post(variable.API_URL + '/api/domains/negotiation/', {
            'domain_lead_id': res.data.domain_lead_id,
            "amount": 0,
            "status": 1
          }, {}, true)]).then(res => toastr.success("Success", 'Your request is submitted succefully')).catch(() => {
            toastr.error("Success", 'Something went wrong!')
          });


        });
    }

    return false;
  }

  return (
    <React.Fragment>
      <Row className="mt-4 pt-4 mb-4 homepagesponsored-headlines with-changed-view">
        <Col lg={4} xs={12} className="mb-4 mb-lg-0">
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
                        <span>
                          {domain.domain_obj.domain_name}
                        </span>
                        {console.log(domain.domain_obj)}
                        <Button onClick={e => generateLead(e, domain.domain_obj.trade_option, domain.domain_obj)} className="button" size="sm" variant="secondary">
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
        <Col lg={4} xs={12} className="mb-4 mb-lg-0">
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
                        <span>
                          {domain.domain_obj.domain_name}
                        </span>
                        <Button onClick={e => generateLead(e, "Buy Now", domain.domain_obj)} className="button" size="sm" variant="secondary">
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
              <h2>Startup Breeders</h2>
            </Card.Header>
            <Card.Body>
              <ListGroup className="p-3">
                {startupBreedersHeadlines.map((domain, index) => {
                  return (
                    <ListGroup.Item key={domain + index}>
                      <div className="d-flex justify-content-between">
                        <span>
                          {domain.domain_obj.domain_name}
                        </span>
                        <Button className="button" size="sm" variant="secondary" onClick={(e) =>
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
      </Row>
    </React.Fragment>
  );
};
export default DomainTradeList;
