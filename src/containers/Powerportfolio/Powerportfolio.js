/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useMemo } from "react";
// import { Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import ApiHelper from "../../helpers/apiHelper";
import EditPortfolioModal from "./EditPortfolioModal";
import { confirm } from "../../helpers/commonHelper";
import * as variable from "../../variables/variables";
// import {  ColumnDirective, ColumnsDirective, GridComponent, Inject, Sort, Page, Search, Toolbar } from '@syncfusion/ej2-react-grids';
import ToolkitProvider from "react-bootstrap-table2-toolkit";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import { DataGrid } from '@mui/x-data-grid';
import Modal from '@mui/material/Modal';
import styled from "styled-components";
import { Card, Container, Row, Col } from 'react-bootstrap';
import {
  useTable,
  useFilters,
  useGlobalFilter
  
} from "react-table";
import "./portfolio.css";

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid rgb(29, 31, 37);
    width: 100%;
    background: #3F4046;
    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }
    tr:nth-child(1) {
      display: none;
    }
    tr:nth-child(3) {
      display: none;
    }
    th {
      font-size: 0.7vw;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 10px solid rgb(29, 31, 37);
      border-right: 2px solid rgb(29, 31, 37);
      :last-child {
        border-right: 0;
      }
    }
    td {
      margin: 0;
      padding: 0.5rem;
      font-size: 14px;
      font-family: poppins-semibold;
      border-bottom: 10px solid rgb(29, 31, 37);
      border-right: 2px solid rgb(29, 31, 37);
      :last-child {
        border-right: 0;
      }
    }
  }
`;


function Table({ columns, data }) {
  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
              .toLowerCase()
              .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  const firstPageRows = rows.slice(0, 10);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  {column.render("Header")}
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
          <tr>
            <th
              colSpan={visibleColumns.length}
              style={{
                textAlign: "left"
              }}
            >
            </th>
          </tr>
        </thead>
        <tbody {...getTableBodyProps()}>
          {firstPageRows.map((row, _i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div className="breed">Showing the first 20 results of {rows.length} rows</div>
      <div>
        <pre>
          <code>{JSON.stringify(state.filters, null, 2)}</code>
        </pre>
      </div>
    </>
  );
}

function fuzzyTextFilterFn(_rows, _id, _filterValue) {
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      style={{width: '100%',background: "#3f4046" }}
      className="defaultColumn"
      placeholder={`Search ${count} records...`}
    />
  );
}


const PowerPortfolio = () => {
  const [domainList, setDomainList] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [paginationVal, setpaginationVal] = useState(200);

  useEffect(() => {
    getDomainList();
  }, []);

  const getDomainList = () => {
    ApiHelper.get(variable.API_URL + '/api/domains/?page=1&limit=1000').then(res => {
      setDomainList(res.data.domains);
    });
  }


  const openEditModal = (e, data) => {
    e.stopPropagation();
    setShowEditModal(true);
    setSelectedDomain(data);
  };

  const handleEditDomain = domain => {
    getDomainList();
    setShowEditModal(false);
  };

  const handleDeleteDomain = (e, domainID) => {
    e.stopPropagation();
    confirm('Are you sure you want to delete this domain?', {
      title: 'Delete Domain'
    }).then(() => {
      ApiHelper.delete(`${variable.API_URL}/api/domains/${domainID}/`)
        .then(res => {
          getDomainList()

          toastr.success('Success!', 'Domain was successfully deleted.');
        }).catch(err => {
          console.log(err);
          toastr.error('Fail!', 'Failed to delete domain.');
        });
    });
  };


  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const columns = useMemo(
    () => [
      {
        Header: "Powerportfolio",
        columns: [
          {
            Header: "Domain Names",
            accessor: "domain_name",
          },
          {
            Header: "Business Status",
            accessor: "business_status",
          },
          {
            Header: "Price",
            accessor: "seller_price",
          },
          {
            Header: "Min Offer",
            accessor: "min_offer"
          },
          {
            Header: "Trade Option",
            accessor: "trade_option"
          },
          {
            Header: "Visits",
            accessor: "visits"
          },
          {
            Header: "Video Pitch Leads",
            accessor: "video_pitch_leads"
          },
          {
            Header: "Startup Breeders",
            accessor: "startup_breeders"
          },
          {
            Header: "Actions",
            accessor: "id",
            Cell: row => (
              <div style={{ textAlign: "center" }}>
                <button className="viewBtn butn-1" onClick={(e) => openEditModal(e, row)}>
                  <i className="fa fa-edit fa-lg" ></i>
                </button>
                <button className="viewBtn butn-1" onClick={e => handleDeleteDomain(e, row.id)} >
                  <i className="fa fa-trash fa-lg"></i>
                </button>
              </div>
            )
          }
        ]
      }
    ]
  )


  const column1 = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'domain_name', headerName: 'Domain Name', width: 120 },
    { field: 'visits', headerName: 'Visits', width: 70, align: "center" },
    {
      field: 'detail', headerName: 'Actions', width: 70, align: "center", renderCell: (params) => {
        return (
          <>
            <button className="viewBtn butn" onClick={(e) => openEditModal(e, params.row)}>
              <i className="fa fa-edit fa-lg" ></i>
            </button>
            <button className="viewBtn butn" onClick={e => handleDeleteDomain(e, params.row.id)} >
              <i className="fa fa-trash fa-lg"></i>
            </button>
          </>
        );
      },
    }
  ];

  
  return (
    <React.Fragment>

      <Container className="custom-data-table mt-5">
        <Card
          border="light"
          className="shadow-sm p-3 custom-card column-visibility-table items-table"
        >
          <Card.Header className="d-flex justify-content-between algrn-items-center flex-column flex-md-row">
            <h2>Power Portfolio</h2>
          </Card.Header>
          <ToolkitProvider
            keyField="id"
            data={domainList}
            columns={columns}
            search
          >
            {(props) => (
              <>
                <div className="pagination-wrapper">
                  <Styles>
                    <Container fluid style={{background: "#1D1F25", borderRadius: "15px" }}>
                      <Row>
                        <Col xs='12'>
                          <Table columns={columns} data={domainList} style={{ width: "100%!important" }} />
                        </Col>
                      </Row>
                    </Container>
                  </Styles>
                </div>
                <div className="table-control">
                  <DataGrid
                    rows={domainList}
                    columns={column1}
                    pageSize={25}
                    rowsPerPageOptions={[25]}
                    checkboxSelection
                  // onCellClick={(e) => currentlySelected(e)}
                  />
                  <div style={{ position: "absolute", bottom: "33px", left: "20px" }}>
                    <span>Results page :</span>&nbsp;
                    <select name="pageValue" id="pagination" style={{ width: "60px" }} value={paginationVal} onChange={e => setpaginationVal(e.target.value)}>
                      <option value={25}>25</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                      <option value={200}>200</option>
                    </select>
                  </div>
                </div>
              </>
            )}
          </ToolkitProvider>
        </Card>
        {showEditModal ?
          <EditPortfolioModal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            domain={selectedDomain}
            onSubmit={handleEditDomain}
          /> : <React.Fragment></React.Fragment>
        }
      </Container>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
      </Modal>
    </React.Fragment>
  )
}
export default PowerPortfolio;