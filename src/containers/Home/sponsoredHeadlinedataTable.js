import React, { Component, useEffect, useState } from "react";
import "../../assets/sass/theme.scss";
import "../../assets/sass/responsive.scss";
import "../../assets/sass/bootstrap.min.css";
import "../../assets/sass/range.scss";
import { Link } from "react-router-dom";
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
import { Card, Container } from "react-bootstrap";
import axios from "axios";

const SponsoredHeadlines = () => {
  const [sponsoredHeadlines, setSponsoredHeadlines] = useState([]);
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
        let startupBreeders = res.data?.filter((item) => {
          return item.category_obj.name === "Startup Breeders";
        });
        let tradeDomains = res.data?.filter((item) => {
          return item.category_obj.name === "Trade Domains";
        });
        scrollToSponsored();
        let maxLenth = Math.max(
          buyNowList.length,
          startupBreeders.length,
          tradeDomains.length
        );
        // if (maxLenth > 5) {
        //   maxLenth = 5;
        // }
        let sponsoredDomains = [];
        for (let index = 0; index < maxLenth; index++) {
          let buyNow = buyNowList[index];
          let startupBreedersDomain = startupBreeders[index];
          let tradeDomain = tradeDomains[index];
          let sponsoredDomain = { buynow: "", startup: "", trade: "" };
          if (buyNow) {
            sponsoredDomain.buynow = buyNow.domain_obj.domain_name;
          }
          if (startupBreedersDomain) {
            sponsoredDomain.startup =
              startupBreedersDomain.domain_obj.domain_name;
          }
          if (tradeDomain) {
            sponsoredDomain.trade = tradeDomain.domain_obj.domain_name;
          }
          sponsoredDomains.push(sponsoredDomain);
        }
        console.log(sponsoredDomains);
        setSponsoredHeadlines(sponsoredDomains);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getSponsored();
  }, []);

  const [SelectedRow, setSelectedRow] = useState([]);

  const { SearchBar, ClearSearchButton } = Search;
  const columns = [
    {
      dataField: "trade",
      text: "Domain trade",
      sort: true,
      attrs: {
        "data-title": "Domain trade",
      },
    },
    {
      dataField: "buynow",
      text: "Buy Now",
      sort: true,
      attrs: {
        "data-title": "Buy Now",
      },
    },
    {
      dataField: "startup",
      text: "Startup Breeders",
      sort: true,
      attrs: {
        "data-title": "Startup Breeders",
      },
    },
  ];

  const defaultSorted = [
    {
      dataField: "name",
      order: "desc",
    },
  ];
  const selectRow = {
    mode: "checkbox",
    clickToSelect: false,
    onSelect: (row, isSelect) => {
      if (isSelect) {
        setSelectedRow((prev) => [...prev, row]);
      } else {
        setSelectedRow(SelectedRow.filter((i) => i.id !== row.id));
      }
    },
    onSelectAll: (isSelect, rows) => {
      if (isSelect) {
        setSelectedRow(rows);
      } else {
        setSelectedRow([]);
      }
    },
  };

  const cellEdit = {
    mode: "click",
  };

  const customTotal = (from, to, size) => (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} Enteries
    </span>
  );
  const options = {
    paginationSize: 4,
    pageStartIndex: 1,
    // alwaysShowAllBtns: false, // Always show next and previous button
    withFirstAndLast: false, // Hide the going to First and Last page button
    // hideSizePerPage: true, // Hide the sizePerPage dropdown always
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
        value: itemsTable.length,
      },
    ],
  };
  return (
    <React.Fragment>
      {/* <Header />
                <SearchHeader /> */}
      <Container className="custom-data-table mt-5">
        <Card
          border="light"
          className="shadow-sm p-3 custom-card column-visibility-table items-table no-checkbox"
        >
          <Card.Header className="d-flex justify-content-between alirn-items-center">
            <h2>Sponsored Headlines</h2>
          </Card.Header>

          <ToolkitProvider
            keyField="id"
            data={sponsoredHeadlines}
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
                    bootstrap4
                    striped
                    hover
                    condensed
                    // selectRow={selectRow}
                    // selectRow={{ mode: "checkbox" }}
                    headerClasses="table-header"
                    pagination={paginationFactory(options)}
                    noDataIndication={() => (
                      <div className="empty-data">No records to display</div>
                    )}
                    keyField="trade"
                    data={sponsoredHeadlines}
                    dataColumn={sponsoredHeadlines.title}
                    columns={columns}
                    defaultSorted={defaultSorted}
                  />
                </div>
              </>
            )}
          </ToolkitProvider>
        </Card>
      </Container>
    </React.Fragment>
  );
};
export default SponsoredHeadlines;
