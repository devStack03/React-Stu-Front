import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ApiHelper from "../../helpers/apiHelper";
import * as variable from "../../variables/variables";
import { Link } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import {
  useTable,
  useFilters,
  useGlobalFilter,
  useAsyncDebounce
} from "react-table";
import './addDomain.css';
// A great library for fuzzy filtering/sorting items
// import matchSorter from 'match-sorter'

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
      font-size: 1vw;
      margin: 0;
      padding: 0.5rem;
      border-bottom: 20px solid rgb(29, 31, 37);
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
      border-bottom: 20px solid rgb(29, 31, 37);
      border-right: 2px solid rgb(29, 31, 37);
      :last-child {
        border-right: 0;
      }
    }
  }
`;

// Define a default UI for filtering
function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span style={{display: "flex"}}>
      <span className="search-label">

      Search:
      </span>
      <input
        className="searchInput"
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0",
          width: "100%",
          background: "#3F4046"
        }}
      />
    </span>
  );
}

// Define a default UI for filtering
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

function fuzzyTextFilterFn(_rows, _id, _filterValue) {
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val) => !val;

// Our table component
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
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
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
              <GlobalFilter
                preGlobalFilteredRows={preGlobalFilteredRows}
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
              />
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

// Define a custom filter filter function!
function filterGreaterThan(rows, id, filterValue) {
  return rows.filter((row) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = (val) => typeof val !== "number";

function Domainlead() {
  const columns = React.useMemo(
    () => [
      {
        Header: "Domains",
        columns: [
          {
            Header: "Domain Names",
            accessor: "domain_name"
          },
          {
            Header: "Total Inquiries",
            accessor: "total_inquiries",
            // Use our custom `fuzzyText` filter on this column
          },
          {
            Header: "Last Bid",
            accessor: "last_bid_date",
          },
          {
            Header: "Status",
            accessor: "status_label",
            filter: "fuzzyText"
          },
          {
            accessor: "startup_breeders",
            Header: "Action",
            Cell: row => (
              <div style={{textAlign: "center"}}>
                <Link
                  to={`/my_stable/domain-leads/negotiation/${row.domain_id}`}
                >
                  <button className="viewBtn butn">VIEW</button>
                </Link>
              </div>
            )
          },
        ]
      },
    ],
    []
  );
  const [domainLeads, setDomainLeads] = useState([]);
  useEffect(() => {
    ApiHelper.get(`${variable.API_URL}/api/domains/domain-leads-summary/`).then(
      (res) => {
        setDomainLeads(res.data);
      }
    );
  }, []);

  return (
    <Styles>
      <Container fluid style={{marginTop: "3%", padding: "2%", background: "#1D1F25", borderRadius: "15px"}}>
        <Row>
          <Col xs='12'>
            <h4 className="breed">
              Domains
            </h4>
            <Table columns={columns} data={domainLeads} style={{ width: "100%!important" }} />
          </Col>
        </Row>
      </Container>
    </Styles>
  );
}

export default Domainlead;
