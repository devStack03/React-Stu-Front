/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import ApiHelper from "../../helpers/apiHelper";
import "./Sponsored-Headlines.css";
import * as variable from "../../variables/variables";
import { useHistory } from 'react-router-dom';
import { ArrowsAngleContract  } from 'react-bootstrap-icons';
import { Button,ListGroup  } from "react-bootstrap";

const SponsoredHeadlines = () => {

  let count_per_page = 10;  
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

  const [activateIndex, setActivateIndex] = useState(0);
  const navigate = useHistory();
  const [useCurrentDomainList, setUseCurrentDomainList] = useState(null);




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

  let tradeDomains = threeFigureSelectedDomains.concat(fourFigureSelectedDomains).concat(fiveFigureSelectedDomains);
  const placeOrder =async () => {
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
        break;
      case 3:
        // code block
        setUseCurrentDomainList(startupBreedersDomains);
        break;
      // default:
        // code block
    }
  }

  if(activateIndex === 0)
  return (

    <div className="container-fluid" style={{marginBottom:"130px"}}>
      <br />
        <h1 className="sponsored-head">Sponsored Headlines</h1>
      <div className="sponsoredList">
        <div className="sponsoredListpanel">
          <div className="sponsoredListBody">
            <span className="h5">Buy Now</span>
            <div className="sponsoredListView">
                    {buyNowDomains?.map((item, index) => {
                      if(index < count_per_page)
                        return (
                          <div className="form-check">
                            <input className="form-check-input" onChange={() => {
                              console.log(item.id);
                              let buyNowSelectedDomainsTemp = JSON.parse(JSON.stringify(buyNowSelectedDomains))
                              if (buyNowSelectedDomainsTemp.includes(item.id)) {
                                let index = buyNowSelectedDomainsTemp.indexOf(item.id);
                                buyNowSelectedDomainsTemp.splice(index, 1);
                              }
                              else {
                                buyNowSelectedDomainsTemp.push(item.id);
                              }
                              setBuyNowSelectedDomains(buyNowSelectedDomainsTemp);
                            }} checked={buyNowSelectedDomains.includes(item.id)} type="checkbox" value={item.id} id={"buynow" + item.id} />
                            <label className="form-check-label" for={"buynow" + item.id}>
                              {item.domain_name}
                            </label>
                          </div>
                        )
                      if(index === count_per_page)
                        return (
                          <div className="form-check">
                            ... ...
                          </div>
                        )
                      else
                        return;
                    }
                    )}
            </div>
          </div>
        </div>

        <div className="sponsoredListpanel">
          <div className="sponsoredListBody">
            <span className="h5">3 Figure Trade Domains</span>
            <div className="sponsoredListView">
                    {threeFigureDomains?.map((item, index) => {
                      if(index < count_per_page)
                        return (
                          <div className="form-check">
                            <input className="form-check-input" onChange={() => {
                              console.log(item.id);
                              let threeFigureSelectedDomainsTemp = JSON.parse(JSON.stringify(threeFigureSelectedDomains))
                              if (threeFigureSelectedDomainsTemp.includes(item.id)) {
                                let index = threeFigureSelectedDomainsTemp.indexOf(item.id);
                                threeFigureSelectedDomainsTemp.splice(index, 1);
                              }
                              else {
                                threeFigureSelectedDomainsTemp.push(item.id);
                              }
                              setThreeFigureSelectedDomains(threeFigureSelectedDomainsTemp);
                            }} checked={threeFigureSelectedDomains.includes(item.id)} type="checkbox" value={item.id} id={"threefigure" + item.id} />
                            <label className="form-check-label" for={"threefigure" + item.id}>
                              {item.domain_name}
                            </label>
                          </div>
                        )
                        if(index === count_per_page)
                          return (
                            <div className="form-check">
                              ... ...
                            </div>
                          )
                        else
                          return;
                        }
                    )}
            </div>
          </div>

          <div className="sponsoredListBody">
            <span className="h5">4 Figure Trade Domains</span>
            <div className="sponsoredListView">
                    {fourFigureDomains?.map((item, index) => {
                      if(index < count_per_page)
                      return (
                        <div className="form-check">
                          <input className="form-check-input" onChange={() => {
                            console.log(item.id);
                            let fourFigureSelectedDomainsTemp = JSON.parse(JSON.stringify(fourFigureSelectedDomains))
                            if (fourFigureSelectedDomainsTemp.includes(item.id)) {
                              let index = fourFigureSelectedDomainsTemp.indexOf(item.id);
                              fourFigureSelectedDomainsTemp.splice(index, 1);
                            }
                            else {
                              fourFigureSelectedDomainsTemp.push(item.id);
                            }
                            setFourFigureSelectedDomains(fourFigureSelectedDomainsTemp);
                          }} checked={fourFigureSelectedDomains.includes(item.id)} type="checkbox" value={item.id} id={"fourfigure" + item.id} />
                          <label className="form-check-label" for={"fourfigure" + item.id}>
                            {item.domain_name}
                          </label>
                        </div>
                      )
                      if(index === count_per_page)
                          return (
                            <div className="form-check">
                              ... ...
                            </div>
                          )
                        else
                          return;
                        }
                    )}

            </div>
          </div>

          <div className="sponsoredListBody">
            <span className="h5">5 Figure Trade Domains</span>
            <div className="sponsoredListView">
                    {fiveFigureDomains?.map((item, index) => {
                      if(index < count_per_page)
                      return (
                        <div className="form-check">
                          <input className="form-check-input" onChange={() => {
                            console.log(item.id);
                            let fiveFigureSelectedDomainsTemp = JSON.parse(JSON.stringify(fiveFigureSelectedDomains))
                            if (fiveFigureSelectedDomainsTemp.includes(item.id)) {
                              let index = fiveFigureSelectedDomainsTemp.indexOf(item.id);
                              fiveFigureSelectedDomainsTemp.splice(index, 1);
                            }
                            else {
                              fiveFigureSelectedDomainsTemp.push(item.id);
                            }
                            setFiveFigureSelectedDomains(fiveFigureSelectedDomainsTemp);
                          }} checked={fiveFigureSelectedDomains.includes(item.id)} type="checkbox" value={item.id} id={"fivefigure" + item.id} />
                          <label className="form-check-label" for={"fivefigure" + item.id}>
                            {item.domain_name}
                          </label>
                        </div>
                      )
                      if(index === count_per_page)
                          return (
                            <div className="form-check">
                              ... ...
                            </div>
                          )
                        else
                          return;
                        }
                    )}
            </div>
          </div>

        </div>

        <div className="sponsoredListpanel">
          <div className="sponsoredListBody">
            <span className="h5">Startup Breeder Domains</span>
            <div className="sponsoredListView">
                    {startupBreedersDomains?.map((item, index) => {
                      if(index < count_per_page)
                      return (
                        <div className="form-check">
                          <input className="form-check-input" onChange={() => {
                            console.log(item.id);
                            let startupBreedersSelectedDomainsTemp = JSON.parse(JSON.stringify(startupBreedersSelectedDomains))
                            if (startupBreedersSelectedDomainsTemp.includes(item.id)) {
                              let index = startupBreedersSelectedDomainsTemp.indexOf(item.id);
                              startupBreedersSelectedDomainsTemp.splice(index, 1);
                            }
                            else {
                              startupBreedersSelectedDomainsTemp.push(item.id);
                            }
                            setStartupBreedersSelectedDomains(startupBreedersSelectedDomainsTemp);
                          }} checked={startupBreedersSelectedDomains.includes(item.id)} type="checkbox" value={item.id} id={"startupBreeders" + item.id} />
                          <label className="form-check-label" for={"startupBreeders" + item.id}>
                            {item.domain_name}
                          </label>
                        </div>
                      )
                      if(index === count_per_page)
                          return (
                            <div className="form-check">
                              ... ...
                            </div>
                          )
                        else
                          return;
                        }
                    )}
            </div>
          </div>
        </div>
      </div>
            <Button onClick={placeOrder} className="btn btn-warning text-uppercase pitch-to-us"> Place your order</Button>
    </div>
  );

  if(activateIndex !== 0)
  {
    return (
      <>
        <div style = {{padding:'10px'}}>
          <ListGroup as="ul" style = {{width:'80%', margin:'auto',maxWidth:'1200px'}} >
            <ListGroup.Item as="li"  className = "cardHeader" >
              Domain Trade Options <ArrowsAngleContract className="expandIcon" onClick = {() => maximize(0)}/>
            </ListGroup.Item>
            {useCurrentDomainList?.map((item, index) => {
              console.log(item);
                return (
                  <ListGroup.Item as="li" action variant={index % 2 === 0 ? "light"  : "secondary"}>
                    <div className="li-item">
                      <a target={'_blank'} href={"https://" + item.domain_name} cursor='pointer' rel="noreferrer">
                        <label className="li-item-label" for={"buynow" + item.id}>
                          {item.domain_name}
                        </label>
                      </a>
                      <Button onClick={placeOrder} className="btn btn-success everybuy">{item.trade_option}</Button>
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