/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import { Slider } from 'primereact/slider';
import { Form, Spinner, Accordion } from "react-bootstrap";
import { getSearchResult } from "../../redux/actions/search";
import { connect } from "react-redux";
import * as variable from "../../variables/variables";
import toQueryString from "../../shared/toQueryString";
import ApiHelper from "../../helpers/apiHelper";
import { toastr } from "react-redux-toastr";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import { Card } from "react-bootstrap";
const DomainSearch = (props) => {
  const history = useHistory();
  const [price, setPrice] = useState([0, 100000]);
  const [changingPrice, setChangingPrice] = useState([0, 100000]);
  const [characterRange, setCharacterRange] = useState([0, 65]);
  const [changingcharacterRange, setChangingCharacterRange] = useState([0, 65]);
  const [startWith, setStartWith] = useState("");
  const [endWith, setEndWith] = useState("");
  const [setLoading] = useState(false);
  const [filter, setFilter] = useState({
    business_status: [],
    trade_options: [],
    extensions: [],
    price: [],
    characterRange: [],
    Exclude: [],
  });
  let data = props.searchResults ? props.searchResults : [];
  if (startWith !== "") {
    data = data.filter(item => item.domain_name.startsWith(startWith))
  }
  if (endWith !== "") {
    data = data.filter(item => item.domain_name.endsWith(endWith))
  }
  useEffect(() => {
    setLoading(false);
  }, [data, setLoading])

  useEffect(() => {
    setFilter({ ...filter, ...{ price: price }, ...{ characterRange: characterRange } });
  }, [price, characterRange])

  useEffect(() => {
    localStorage.setItem('extensions', filter["extensions"]);
    localStorage.setItem('filters', toQueryString(filter));
    props.getSearchResult(localStorage.getItem('searchText'), localStorage.getItem('extensions'), null);
  }, [filter])

  const handleBuyNow = (e, domain) => {
    history.push('/buy_order');
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

  const handleChecked = (key, val) => {
    console.log("handle checked", key, val)
    if (filter[key].includes(val)) {
      filter[key] = filter[key].filter(obj => obj !== val);

      setFilter({ ...filter });
    } else {
      filter[key].push(val);

      setFilter({ ...filter });
    }
  }


  const { SearchBar, ClearSearchButton } = Search;
  const columns = [
    {
      dataField: "id",
      text: "Domain Names",
      sort: true,
      attrs: {
        "data-title": "Domain Names",
      },
      formatter: (cell, row) => (<a href={`/landing/${row.id}`}>
        {row.domain_name}
      </a>)
    },
    {
      dataField: "visits",
      text: "Bids",
      sort: true,
      attrs: {
        "data-title": "Total Inquiries",
      },

    },
    {
      dataField: "buyer_price",
      text: "Last Bid",
      sort: true,
      attrs: {
        "data-title": "Last Bid",
      },
      formatter: (cell, row) => (row.buyer_price > 0 ? '$' + row.buyer_price : '')
    },
    {
      dataField: "created_at",
      text: "Last Offer",
      sort: true,
      attrs: {
        "data-title": "Last Offer",
      },
      formatter: (cell, row) => (row.created_at.split('T')[0])
    },
    {
      dataField: "seller_price",
      text: "Price",
      sort: true,
      attrs: {
        "data-title": "Price",
      },
      formatter: (cell, row) => (row.seller_price > 0 ? '$' + row.seller_price : '')
    },
    {
      dataField: "startup_breeders",
      text: "Action",
      sort: true,
      attrs: {
        "data-title": "Action",
      },
      formatter: (cell, row) => ((<React.Fragment>
        {row.business_status !== "" ? <button className="viewBtn butn" onClick={e => generateLead(e, row.business_status, row)}>{row.business_status}</button> : ''}
        {row.trade_switch === "Yes" ? (
          <button
            className="viewBtn butn"
            title="Reset"
            onClick={(e) =>
              generateLead(
                e,
                row.trade_option,
                row
              )
            }
          >
            {row.trade_option}
          </button>
        ) : ""}
        {row.startup_breeders_switch === "Yes" ? (
          <button
            className="viewBtn butn"
            title="Reset"
            onClick={(e) =>
              generateLead(
                e,
                row.startup_breeders,
                row
              )
            }
          >
            {row.startup_breeders}
          </button>
        ) : ""}
      </React.Fragment>))
    },
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Enteries
    </span>
  );
  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    withFirstAndLast: false, // Hide the going to First and Last page button
    hidePageListOnlyOnePage: true, // Hide the pagination list when only one page
    firstPageText: "First",
    prePageText: "Previous",
    nextPageText: "Next",
    lastPageText: "Last",
    nextPageTitle: "First page",
    prePageTitle: "Pre page",
    firstPageTitle: "Next page",
    lastPageTitle: "Last page",
    showTotal: true,
    paginationTotalRenderer: customTotal,
    disablePageTitle: true,
    sizePerPageList: [
      {
        text: "10",
        value: 10,
      },
      {
        text: "25",
        value: 25,
      },
      {
        text: "50",
        value: 50,
      },
      {
        text: "100",
        value: 100,
      },
      {
        text: "200",
        value: 200,
      },
      {
        text: "All",
        value: data.length,
      },
    ],
  };

  if (0) {
    return (
      <div className="loading-overlay">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  } else {
    return (
      <React.Fragment>
        <div className="mainContent">
          <div className="allFilter" style={{ position: "sticky", top: "170px" }} >
            <Accordion>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <span className="search_sidebar_title">Listing Type</span>
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Check
                    type="checkbox"
                    id="buy_now"
                    label="Buy Now"
                    defaultValue="Buy Now"
                    onChange={e => handleChecked('business_status', e.target.value)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="price_upon_request"
                    label="Price Upon Request"
                    defaultValue="Price Upon Request"
                    onChange={e => handleChecked('business_status', e.target.value)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="through_beed"
                    label="Throughbeeds"
                    defaultValue="Throughbeeds"
                    onChange={e => handleChecked('business_status', e.target.value)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="startup_breeders"
                    label="Startup Breeders"
                    defaultValue="Startup Breeder"
                    onChange={e => handleChecked('business_status', e.target.value)}
                  />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <span className="search_sidebar_title">Trade Options</span>
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Check
                    type="checkbox"
                    id="3_figures"
                    label="3 Figures"
                    defaultValue="3 Figures"
                    onChange={e => handleChecked('trade_options', e.target.value)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="4_figures"
                    label="4 Figures"
                    defaultValue="4 Figures"
                    onChange={e => handleChecked('trade_options', e.target.value)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="5_figures"
                    label="5 Figures"
                    defaultValue="5 Figures"
                    onChange={e => handleChecked('trade_options', e.target.value)}
                  />

                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="list-toggle" style={{ paddingTop: '10px' }}>
              <h4 className="text-uppercase">price range</h4>
              <Slider
                value={changingPrice}
                onChange={(e) => setChangingPrice(e.value)}
                onSlideEnd={(e) => setPrice(e.value)}
                range
                min="0"
                max="100000" />
              <div className="price-slider">
                <span>
                  <b>Min</b>
                  <input type="number" value={changingPrice[0]} style={{ border: '1px solid black' }} />
                </span>
                <span>&nbsp;to&nbsp;</span>
                <span>
                  <b>Max</b>
                  <input type="number" value={changingPrice[1]} style={{ border: '1px solid black' }} />
                </span>
              </div>
            </div>

            <div className="list-toggle">
              <h4 className="text-uppercase">character range</h4>
              <Slider
                value={changingcharacterRange}
                onChange={(e) => setChangingCharacterRange(e.value)}
                onSlideEnd={(e) => setCharacterRange(e.value)}
                range
                min="0"
                max="65"
              />
              <div className="price-slider">
                <span>
                  <b>Min</b>
                  <input type="number" value={changingcharacterRange[0]} style={{ border: '1px solid black' }} />
                </span>
                <span>&nbsp;to&nbsp;</span>
                <span>
                  <b>Max</b>
                  <input type="number" value={changingcharacterRange[1]} style={{ border: '1px solid black' }} />
                </span>
              </div>
              <p>Any character length</p>
            </div>
            <Accordion>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <span className="search_sidebar_title">Exclude</span>
                </Accordion.Header>
                <Accordion.Body>
                  <Form.Check
                    type="checkbox"
                    id="number"
                    label="Number"
                    defaultValue="Number"
                    onChange={e => handleChecked('Exclude', e.target.value)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="no_hyphens"
                    label="No Hyphens"
                    defaultValue="No Hyphens"
                    onChange={e => handleChecked('Exclude', e.target.value)}
                  />
                  <Form.Check
                    type="checkbox"
                    id="startup_breeders"
                    label="IDN"
                    defaultValue="IDN"
                    onChange={e => handleChecked('Exclude', e.target.value)}
                  />
                  <Link to="#" className="textBtn" style={{ textDecoration: 'none', color: 'inherit' }}>+ TLD</Link>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <div className="list-toggle job-post" style={{ paddingTop: '10px' }}>
              <h4 className="text-uppercase">starting with</h4>
              <input type="text" name="name" value={startWith} onChange={(e) => setStartWith(e.target.value)} style={{ border: '1px solid black' }} />
            </div>
            <div className="list-toggle job-post">
              <h4 className="text-uppercase">ending with</h4>
              <input type="text" name="name" value={endWith} onChange={(e) => setEndWith(e.target.value)} style={{ border: '1px solid black' }} />
            </div>
          </div>
          <div className="mainInner custom-data-table">
            <Card
              border="light"
              className="shadow-sm p-3 custom-card column-visibility-table items-table"
            >
              <Card.Header className="d-flex justify-content-between algrn-items-center flex-column flex-md-row">
                <h2>Search Leads</h2>
                <div className="filterControls d-flex justify-content-md-between align-items-md-center flex-column flex-md-row ">

                </div>
              </Card.Header>

              <ToolkitProvider
                keyField="id"
                data={data}
                columns={columns}
                search
              >
                {(props) => (
                  <>
                    <div className="d-flex d-justify-content-between flex-column flex-md-row  align-items-md-center mb-3">
                      <div className="search-bar">
                        <SearchBar {...props.searchProps} />
                        {props.searchProps?.searchText?.length > 0 && (
                          <ClearSearchButton
                            className="clear"
                            {...props.searchProps}
                          />
                        )}
                      </div>
                    </div>
                    <div className="pagination-wrapper">
                      <BootstrapTable
                        {...props.baseProps}
                        bootstrap4
                        striped
                        hover
                        condensed
                        // selectRow={selectRow}
                        selectRow={{ mode: "checkbox" }}
                        headerClasses="table-header"
                        pagination={paginationFactory(options)}
                        noDataIndication={() => (
                          <div className="empty-data">No records to display</div>
                        )}
                        keyField="id"
                        data={data}
                        dataColumn={data.title}
                        columns={columns}
                        defaultSorted={defaultSorted}
                      />
                    </div>
                  </>
                )}
              </ToolkitProvider>
            </Card>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  searchResults: state.search.searchResults
});

const mapDispatchToProps = (dispatch) => ({
  getSearchResult: (name, extensions) => dispatch(getSearchResult(name, extensions)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DomainSearch);
