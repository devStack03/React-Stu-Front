/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable default-case */
import React, { useEffect, useState } from "react";
import "../../assets/sass/theme.scss";
import "../../assets/sass/responsive.scss";
import "../../assets/sass/bootstrap.min.css";
import "../../assets/sass/range.scss";
import ApiHelper from "../../helpers/apiHelper";
import * as variable from "../../variables/variables";
import { useParams } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import {
  Form,
  FormControl,
  FormLabel,
} from "react-bootstrap";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import { Card } from "react-bootstrap";

export default function DomainleadNegotiation(props) {
  let { id } = useParams();
  const [domainLeads, setDomainLeads] = useState([]);
  const [showEdit, setShowEdit] = useState(0);
  const [amount, setAmount] = useState(0);
  useEffect(() => {
    getDomainLeads();
  }, []);

  const getDomainLeads = () => {
    ApiHelper.get(
      `${variable.API_URL}/api/domains/negotiation/?domain_id=${id}`
    ).then((res) => {
      setDomainLeads(res.data);
    });
  };

  const submitNegotation = (e, negotation) => {
    e.preventDefault();

    ApiHelper.post(
      variable.API_URL + "/api/domains/negotiation/",
      {
        domain_lead_id: id,
        amount: amount,
        status: negotation,
      },
      {},
      true
    ).then((res) => {
      switch (negotation) {
        case 2:
          toastr.success(
            "Success",
            "Your offer has been submitted successfully"
          );
          break;
        case 5:
          toastr.success(
            "Success",
            "This negotiation has been submitted to our Broker Team. You will be contacted soon"
          );
          break;
        case 6:
          toastr.success(
            "Success",
            "Sponsored headlines has been chosen to upload the domain to the home page and our entire advertising network and previous bidders will be contacted. Thank you"
          );
          break;
        case 7:
          toastr.success(
            "Success",
            "Your offer has been submitted successfully"
          );
          break;
        case 4:
          toastr.success("Success", "Your request is submitted succefully");
          break;
      }

      getDomainLeads();
    });
  };

  const { SearchBar, ClearSearchButton } = Search;
  const columns = [
    {
      dataField: "status_label",
      text: "Negotiation",
      sort: true,
      attrs: {
        "data-title": "Negotiation",
      },
    },
    {
      dataField: "amount",
      text: "Offer",
      sort: true,
      attrs: {
        "data-title": "Offer",
      },
    },
    {
      dataField: "created_at",
      text: "Date of bid",
      sort: true,
      attrs: {
        "data-title": "Date of bid",
      },
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
        value: domainLeads.length,
      },
    ],
  };

  return (
    <React.Fragment>
      <div className="container mainTitle">
        <span className="h3">
          {domainLeads.length > 0 ? domainLeads[0].domain_name : ""}
        </span>
      </div>
      <div className="main bg-dark">
        <div className="container d-lead custom-data-table">
          <Card
            border="light"
            className="shadow-sm p-3 custom-card column-visibility-table items-table"
          >
            <Card.Header className="d-flex justify-content-between algrn-items-center flex-column flex-md-row">
              <h2>Negotiations</h2>
              <div className="filterControls d-flex justify-content-md-between align-items-md-center flex-column flex-md-row "></div>
            </Card.Header>

            <ToolkitProvider
              keyField="id"
              data={domainLeads}
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
                      keyField="Item"
                      data={domainLeads}
                      dataColumn={domainLeads.title}
                      columns={columns}
                      defaultSorted={defaultSorted}
                    />
                  </div>
                </>
              )}
            </ToolkitProvider>
          </Card>

        </div>
        <div className="container d-lead mb-10 ">
          <button
            className="greenButton floatRight"
            onClick={(e) => {
              setShowEdit(0);
              submitNegotation(e, 4);
            }}
          >
            Accept
          </button>
          <button className="viewBtn butn1" onClick={(e) => setShowEdit(2)}>
            Counter Offer
          </button>
          <button
            className="viewBtn butn1"
            onClick={(e) => {
              setShowEdit(0);
              submitNegotation(e, 5);
            }}
          >
            Assign Broker
          </button>
          <button
            className="viewBtn butn1"
            onClick={(e) => {
              setShowEdit(0);
              submitNegotation(e, 6);
            }}
          >
            Bidding War
          </button>
          <button className="viewBtn butn1" onClick={(e) => setShowEdit(7)}>
            Startup Breeder Budget
          </button>
        </div>
        {showEdit ? (
          <div className="container d-lead">
            <Form>
              <div className="row marginBottom-10 col-md-3 submitNegotiation">
                <div className="">
                  <FormLabel>
                    Your Offer<span className="star">*</span>
                  </FormLabel>
                </div>
                <div className="row">
                  <div className="col-md-1">$</div>
                  <div className="col-md-8">
                    <FormControl
                      placeholder="Your Offer"
                      type="number"
                      name="amount"
                      onChange={(e) => {
                        setAmount(e.target.value);
                      }}
                    />
                  </div>
                </div>
                <div className="info">Your offer expires in 7 days</div>
                <div className="">
                  <button
                    className="viewBtn butn"
                    type="button"
                    onClick={(e) => submitNegotation(e, showEdit)}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </Form>
          </div>
        ) : (
          ""
        )}
      </div>
    </React.Fragment>
  );
}
