import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { getSearchResult } from "../../redux/actions/search";
import "./SearchHeader.css";

const SearchHeader = (props) => {
  const history = useHistory();
  const [searchText, setSearchText] = useState("");

  const handleApply = () => {
    props?.getSearchResult(searchText, [], {})
      .then(
        history.push(`/homeSearch?search=${searchText}`)
      )
      .catch((err) => {
        console.log(err.data);
      });
  };

  return (
    <React.Fragment>
      <div style={{ textAlign: "center", backgroundColor: "#000" }}>
        <Container
          className="header-bottom home-b search-global"
          style={{ position: "sticky", top: "120px", zIndex: "11" }}
        >
          <Row>
            <Col className="d-flex m-0">
              <Form.Control
                type="search"
                placeholder="Search here..."
                className="form-control me-2"
                value={searchText}
                aria-label="Search"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleApply()
                  }
                }}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button
                className="text-uppercase"
                onClick={handleApply}
                style={{ "borderColor": "#ff5301" }}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Container>
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
