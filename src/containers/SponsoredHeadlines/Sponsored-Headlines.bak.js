import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import ApiHelper from "../../helpers/apiHelper";
import styles from "./Sponsored-Headlines.css";
import * as variable from "../../variables/variables";
import { set } from "nprogress";
import { Button, Container, Col, Row, Accordion, Card, ListGroup  } from "react-bootstrap";
import { ArrowsAngleExpand, ArrowsAngleContract  } from 'react-bootstrap-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useHistory } from 'react-router-dom';
const SponsoredHeadlines = () => {
  const [domainList, setDomainList] = useState(null);
  const [buyNowDomains, setBuyNowDomains] = useState(null);
  const [buyNowSelectedDomains, setBuyNowSelectedDomains] = useState([]);
  const [startupBreedersDomains, setStartupBreedersDomains] = useState(null);
  const [startupBreedersSelectedDomains, setStartupBreedersSelectedDomains] = useState([]);

  const [threeFigureDomains, setThreeFigureDomains] = useState(null);
  const [threeFigureSelectedDomains, setThreeFigureSelectedDomains] = useState([]);
  const [fourFigureDomains, setFourFigureDomains] = useState(null);
  const [fourFigureSelectedDomains, setFourFigureSelectedDomains] = useState([]);
  const [fiveFigureDomains, setFiveFigureDomains] = useState(null);
  const [fiveFigureSelectedDomains, setFiveFigureSelectedDomains] = useState([]);

  //frm here keithy starts code !!
  const [activateIndex, setActivateIndex] = useState(0);
  const navigate = useHistory();
  const [useCurrentDomainList, setUseCurrentDomainList] = useState(null);

  const amountPerPage = 5;



  useEffect(() => {
    getDomainList();
  }, []);

  const getDomainList = () => {
    ApiHelper.get(variable.API_URL + '/api/domains/?page=1&limit=1000').then(res => {
      setDomainList(res.data.domains);
      let buyNowList = res.data.domains?.filter(item => { return item.business_status === "Buy Now" });
      setBuyNowDomains(buyNowList);
      let startupBreeders = res.data.domains?.filter(item => { return item.startup_breeders_switch === "Yes" });
      setStartupBreedersDomains(startupBreeders);
      let threeFigure = res.data.domains?.filter(item => { return (item.trade_switch === "Yes" && item.trade_option === '3 Figures') });
      setThreeFigureDomains(threeFigure);
      let fourFigure = res.data.domains?.filter(item => { return (item.trade_switch === "Yes" && item.trade_option === '4 Figures') });
      setFourFigureDomains(fourFigure);
      let fiveFigure = res.data.domains?.filter(item => { return (item.trade_switch === "Yes" && item.trade_option === '5 Figures') });
      setFiveFigureDomains(fiveFigure);
    });
  }

  const placeOrder =async () => {
    let tradeDomains = threeFigureSelectedDomains.concat(fourFigureSelectedDomains).concat(fiveFigureSelectedDomains);
    tradeDomains = tradeDomains.filter((item,index)=>(tradeDomains.indexOf(item) === index))
    let cart = {
      "items": [
        {
          "domain_ids": buyNowSelectedDomains,
          "category": "Buy Now"
        },
        {
          "domain_ids": tradeDomains,
          "category": "Trade Domains"
        },
        {
          "domain_ids": startupBreedersSelectedDomains,
          "category": "Startup Breeders"
        },
        
      ]
    }
    let cartResponse =  await ApiHelper.post(variable.API_URL+'/api/domains/sponsored-headlines/cart/',cart)
    localStorage.setItem('cart',JSON.stringify(cartResponse.data))
    navigate.push("/checkout");
  }

  const maximize =async (num) => {
    console.log(num)
    setActivateIndex(num);
    switch(num) {
      case 0:
        // code block
        
        break;
      case 1:
        // code block
        setUseCurrentDomainList(buyNowDomains);
        break;
      case 2:
        // code block  
        let tempArray = [];
        tempArray = threeFigureDomains.concat(fourFigureDomains, fiveFigureDomains); //threeFigureDomains, fourFigureDomains, fiveFigureDomains
        setUseCurrentDomainList(tempArray);
        console.log(tempArray);
        console.log('tempArraytempArraytempArraytempArraytempArraytempArraytempArray');
        break;
      case 3:
        // code block
        setUseCurrentDomainList(startupBreedersDomains);
        break;
      // default:
        // code block
    }
  }


  if(activateIndex == 0)
      return (
        <>
          {/* <Container>  */}
            <div className="sponsoredList">
              {/* <Col lg={3} className = {activateIndex == 1 ? 'activateCard' : '' } >    */}
              <div className = {activateIndex == 1 ? 'activateCard col-md-3 col-12 mt-4 mt-md-0' : 'col-md-3 col-12 mt-4 mt-md-0' } >
                <ListGroup as="ul">
                  <ListGroup.Item as="li"  className = "cardHeader" >
                    Sponsored Headlines <ArrowsAngleExpand className="expandIcon" onClick = {() => maximize(1)}/>
                  </ListGroup.Item>
                  {buyNowDomains?.map((item, index) => {
                    if(amountPerPage > index)
                      return (
                        <ListGroup.Item as="li" action variant={index % 2 == 0 ? "light"  : "secondary"}>
                          <div className="li-item">
                            <a target={'_blank'} href={"https://" + item.domain_name}>
                              <label className="li-item-label" for={"buynow" + item.id}>
                                {item.domain_name}
                              </label>
                            </a>
                          </div>
                        </ListGroup.Item>
                      )
                    }
                    )}
                </ListGroup>
              </div>
              {/* </Col> */}
              <div className = 'col-md-5 col-12 mt-4 mt-md-0'>
                  <ListGroup.Item as="li" className = "cardHeader">
                    Trade Domains <ArrowsAngleExpand className="expandIcon" onClick = {() => maximize(2)}/>
                  </ListGroup.Item>
                  {threeFigureDomains?.map((item, index) => {
                    if(amountPerPage > index)
                    return (
                      <ListGroup.Item as="li" action variant={index % 2 == 0 ? "light"  : "secondary"}>
                        <div className="li-item">
                          
                          <label className="li-item-label" for={"threefigure" + item.id}>
                            {item.domain_name}
                          </label>
                        </div>
                      </ListGroup.Item>
                    )
                  }
                  )}

                  {fourFigureDomains?.map((item, index) => {
                    if(amountPerPage > index)
                    return (
                      <ListGroup.Item as="li" action variant={index % 2 == 0 ? "light"  : "secondary"}>
                        <div className="li-item">
                          
                          <label className="li-item-label" for={"fourfigure" + item.id}>
                            {item.domain_name}
                          </label>
                        </div>
                      </ListGroup.Item>
                    )
                  }
                  )}

                  {fiveFigureDomains?.map((item, index) => {
                    if(amountPerPage > index)
                    return (
                      <ListGroup.Item as="li" action variant={index % 2 == 0 ? "light"  : "secondary"}>
                        <div className="li-item">
                          
                          <label className="li-item-label" for={"fourfigure" + item.id}>
                            {item.domain_name}
                          </label>
                        </div>
                      </ListGroup.Item>
                    )
                  }
                  )}
              {/* </Col> */}
              </div>
              {/* <Col lg={3}> */}
              <div className = 'col-md-4 col-12 mt-4 mt-md-0' >
                <ListGroup as="ul">
                    <ListGroup.Item as="li" className = "cardHeader">
                      Startup Breeder Domains <ArrowsAngleExpand className="expandIcon" onClick = {() => maximize(3)}/>
                    </ListGroup.Item> 
                      {startupBreedersDomains?.map((item, index) => {
                        if(amountPerPage > index)
                        return (
                          <ListGroup.Item as="li" action variant={index % 2 == 0 ? "light"  : "secondary"}>
                            <div className="li-item">
                              
                              <label className="li-item-label" for={"startupBreeders" + item.id}>
                                {item.domain_name}
                              </label>
                            </div>
                          </ListGroup.Item>
                        )
                      }
                      )}
                  </ListGroup>
              {/* </Col> */}
              </div>
              <div className = 'col-md-2 col-12 mt-4 mt-md-0' >
                <Button onClick={placeOrder} className="btn btn-warning text-uppercase pitchtous"><b> Pitch To Us </b></Button>
              </div>
            </div>
          {/* </Container> */}
        </>
      );
  if(activateIndex != 0)
  {
    return (
      <>
        <div style = {{padding:'10px'}}>
          <ListGroup as="ul" style = {{width:'80%', margin:'auto'}} >
            <ListGroup.Item as="li"  className = "cardHeader" >
              Sponsored Headlines <ArrowsAngleContract className="expandIcon" onClick = {() => maximize(0)}/>
            </ListGroup.Item>
            {useCurrentDomainList?.map((item, index) => {
                return (
                  <ListGroup.Item as="li" action variant={index % 2 == 0 ? "light"  : "secondary"}>
                    <div className="li-item">
                      <a target={'_blank'} href={"https://" + item.domain_name}>
                        <label className="li-item-label" for={"buynow" + item.id}>
                          {item.domain_name}
                        </label>
                      </a>
                      <Button onClick={placeOrder} className="btn btn-success text-uppercase everybuy"><b>Pitch To Us </b></Button>
                    </div>
                  </ListGroup.Item>
                )
              }
              )}
          </ListGroup>
        </div>
      </>
    )
  }
};
export default SponsoredHeadlines;
