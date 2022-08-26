import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Modal, Form } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import Select from "react-select";
import {
  gTLDOptions,
  ccTLDOptions,
} from "../../variables/domainExtensions";
import "./SearchHeader.css";
import { getSearchResult } from "../../redux/actions/search";
import ApiHelper from "../../helpers/apiHelper";
import { toastr } from "react-redux-toastr";
import * as variable from "../../variables/variables";

const SearchHeader = (props) => {
  const history = useHistory();
  const [multipleSelect, setMultipleSelect] = useState([]);
  const [show, setShow] = useState(false);
  const [showDomainDen, setShowDomainDen] = useState(false);
  const [checked, setChecked] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [domains, setDomains] = useState(ccTLDOptions);
  const [radioValue, setRadioValue] = useState("1");
  const [domainKey, setDomainKey] = useState(0);
  const data = props.searchResults;

  const generateLead = (e, category, domain) => {

    switch (category) {
      case "Buy Now":
        setShow(false);
        setShowDomainDen(false);
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
  };

  const handleBuyNow = (e, domain) => {
    history.push("/buy_order");
  };

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  const handleShowDomainDen = () => {
    let extensions = [];

    multipleSelect.map((extension) => extensions.push(extension.label));

    props
      .getSearchResult(searchText, extensions, {})
      .then((res) => { })
      .catch((err) => {
        console.log(err.data);
      });
    setShowDomainDen(true);
  };

  const handleCloseDomainDen = () => setShowDomainDen(false);

  const handleClickCctlds = () => {
    setRadioValue("1");
    setDomains(ccTLDOptions);
  };

  const handleClickGtlds = () => {
    setRadioValue("2");
    setDomains(gTLDOptions);
  };

  const handleChecked = (key, e) => {
    const index = multipleSelect.findIndex(
      (value) => value.label === e.target.value
    );
    if (index === -1) {
      checked[e.target.value] = e.target.checked;
      setChecked(checked);
      setMultipleSelect([
        ...multipleSelect,
        { label: e.target.value, value: e.target.value },
      ]);
    } else {
      multipleSelect.splice(index, 1);
      setMultipleSelect([...multipleSelect]);
    }
  };

  const handleReset = () => setMultipleSelect(null);

  const handleApply = () => {
    let extensions = [];

    multipleSelect.map((extension) => extensions.push(extension.label));

    setShow(false);

    props
      .getSearchResult(searchText, extensions, {})
      .then(
        history.push("/search")
      )
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <React.Fragment>
      <div className="header-bottom home-b">
        <div className="d-flex m-0">
          <input
            className="form-control"
            type="search"
            value={searchText}
            placeholder="Search here..."
            aria-label="Search"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleApply()
              }
            }}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div id="tld-select" className="std-input full no-border">
            <div className="tld-dialog-selector" onClick={handleShow}>
              <span className="tld-dialog-selector-text">TLD</span>
            </div>
          </div>
          <Modal
            show={show}
            onHide={handleClose}
            animation={false}
            size="lg"
            style={{ marginTop: "120px" }}
          >
            <Modal.Header closeButton>
              <div className="col-sm-11 text-center s-title">
                <b>Find my Dream Domain</b>
              </div>
            </Modal.Header>
            <div style={{ padding: "15px" }}>
              <Select
                className="react-select info"
                classNamePrefix="react-select"
                placeholder="Choose Domain Extensions"
                name="multipleSelect"
                closeMenuOnSelect={false}
                isMulti
                value={multipleSelect}
                onChange={(value) => setMultipleSelect(value)}
                options={domains}
              />
              <div className="row tag_listing">
                {domains.map((option, key) => (
                  <div key={key} className="col-sm-3">
                    {multipleSelect.filter((obj) => obj.label === option.label)
                      .length ? (
                      <Form.Check
                        type="checkbox"
                        checked
                        id={key}
                        label={option.label}
                        value={option.label}
                        onChange={(e) => handleChecked(key, e)}
                      />
                    ) : (
                      <Form.Check
                        type="checkbox"
                        id={key}
                        label={option.label}
                        value={option.label}
                        onChange={(e) => handleChecked(key, e)}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="button-bar text-center">
              <button
                className="btn btn-cta btn-blue"
                onClick={handleShowDomainDen}
              >
                Domain Den
              </button>
              <div className="tld-btns">
                <ToggleButton
                  type="radio"
                  value={1}
                  checked={radioValue === "1"}
                  className="btn btn-cta2"
                  onClick={handleClickCctlds}
                >
                  ccTLDs
                </ToggleButton>
                <ToggleButton
                  type="radio"
                  value={2}
                  checked={radioValue === "2"}
                  className="btn btn-cta2"
                  onClick={handleClickGtlds}
                >
                  gTLDs
                </ToggleButton>
              </div>
              <button className="btn btn-cta" onClick={handleReset}>
                Reset
              </button>
              <button className="btn btn-cta btn-blue" onClick={handleApply}>
                Apply
              </button>
            </div>
          </Modal>
          <Modal className="domainDenModal"
            show={showDomainDen}
            onHide={handleCloseDomainDen}
            animation={false}
            style={{ marginTop: "50px" }}
          >
            <Modal.Header closeButton>
              <h5 className="modal-title" id="exampleModalLabel">{data.length ? data[domainKey].domain_name : ""}<font>{data.length ? "$" + data[domainKey].seller_price : ""}</font></h5>
            </Modal.Header>
            {data[domainKey] !== undefined ? (

              <div className="modal-body">
                {data[domainKey].startup_breeders_switch === "Yes" ? (
                  <div className="btnGroupView">
                    <label>Startup Breeders</label>
                    <button
                      className="btn btn-cta"
                      title="Reset"
                      onClick={(e) =>
                        generateLead(
                          e,
                          data[domainKey].startup_breeders_switch,
                          data[domainKey]
                        )
                      }
                    >
                      {data[domainKey].startup_breeders}
                    </button>
                  </div>
                ) : (
                  <div className="btnGroupView">
                    <label>Startup Breeders</label>
                    <button
                      className="btn btn-cta disable-button"
                      title="Reset"

                    >
                      Pitch to Us
                    </button>
                  </div>
                )}
                {data[domainKey].business_status !== undefined
                  && data[domainKey].business_status.trim() !== "" ? (
                  <div className="btnGroupView">

                    <label>{data[domainKey].business_status}</label>
                    <button
                      className="btn btn-cta"
                      title="Reset"
                      onClick={(e) =>
                        generateLead(
                          e,
                          data[domainKey].business_status,
                          data[domainKey]
                        )
                      }
                    >
                      {data[domainKey].business_status}
                    </button>
                  </div>
                ) : (
                  <div className="btnGroupView">
                    <label>Buy Now</label>
                    <button
                      className="btn btn-cta disable-button"
                      title="Reset"
                    >
                      Buy Now
                    </button>
                  </div>
                )}
                {data[domainKey].trade_switch === "Yes" ? (
                  <div className="btnGroupView">
                    <label>Trade Option</label>
                    {data[domainKey].trade_option === "3 Figures" ? (
                      <button
                        className="btn btn-cta"
                        title="Reset"
                        onClick={(e) =>
                          generateLead(
                            e,
                            data[domainKey].trade_option,
                            data[domainKey]
                          )
                        }
                      >
                        3 Figures
                      </button>
                    ) : (
                      <button
                        className="btn btn-cta disable-button"
                        title="Reset"
                      >
                        3 Figures
                      </button>
                    )}
                    {data[domainKey].trade_option === "4 Figures" ? (
                      <button
                        className="btn btn-cta"
                        title="Reset"
                        onClick={(e) =>
                          generateLead(
                            e,
                            data[domainKey].trade_option,
                            data[domainKey]
                          )
                        }
                      >
                        4 Figures
                      </button>
                    ) : (
                      <button
                        className="btn btn-cta disable-button"
                        title="Reset"
                      >
                        4 Figures
                      </button>
                    )}
                    {data[domainKey].trade_option === "5 Figures" ? (
                      <button
                        className="btn btn-cta"
                        title="Reset"
                        onClick={(e) =>
                          generateLead(
                            e,
                            data[domainKey].trade_option,
                            data[domainKey]
                          )
                        }
                      >
                        5 Figures
                      </button>
                    ) : (
                      <button
                        className="btn btn-cta disable-button"
                        title="Reset"
                      >
                        5 Figures
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="btnGroupView">
                    <label>Trade Option</label>
                    <button
                      className="btn btn-cta disable-button"
                      title="Reset"
                    >
                      4 Figures
                    </button>
                    <button
                      className="btn btn-cta disable-button"
                      title="Reset"
                    >
                      5 Figures
                    </button>
                    <button
                      className="btn btn-cta disable-button"
                      title="Reset"
                    >
                      6 Figures
                    </button>
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
            <div className="modal-footer">
              <button className="btnControl Previous" onClick={() => { if (domainKey > 0) { setDomainKey(domainKey - 1); } else { setDomainKey(data.length - 1); } }}><i className="fa fa-angle-left"></i>&nbsp;Previous</button>
              <button className="btnControl Next" onClick={() => { if (domainKey < data.length - 1) { setDomainKey(domainKey + 1); } else { setDomainKey(0); } }}>Next&nbsp;<i className="fa fa-angle-right"></i></button>
            </div>
          </Modal>
          <button className="btn text-uppercase searchbar" onClick={handleApply}>
            Search
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  searchResults: state.search.searchResults,
});

const mapDispatchToProps = (dispatch) => ({
  getSearchResult: (name, extensions) =>
    dispatch(getSearchResult(name, extensions, {})),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchHeader);
