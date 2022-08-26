import React, { Component } from "react";
import Profileimg from "../../assets/img/profile.png";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import "../../assets/sass/bootstrap.min.css";
import "../../assets/sass/responsive.scss";
import "../../assets/sass/theme.scss";
import SearchHeader from "../../components/SearchHeader/SearchHeader";

class Account extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <SearchHeader />
        <div className="main bg-dark">
          <div className="account">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3">
                  <div className="breeder-table text-uppercase text-center">
                    <p>
                      <Link to="/breeders" style={{ textDecoration: "none" }}>
                        <img
                          src={Profileimg}
                          width="15"
                          alt="icon"
                          style={{ marginRight: "20px" }}
                        />
                        Profile
                      </Link>
                    </p>
                    <p>
                      <Link to="/stable" style={{ textDecoration: "none" }}>
                        my stable
                      </Link>
                    </p>
                    <p>
                      <Link to="/powerport" style={{ textDecoration: "none" }}>
                        portfolio power
                      </Link>
                    </p>
                    <p>
                      <Link to="/enquire" style={{ textDecoration: "none" }}>
                        my contacts
                      </Link>
                    </p>
                    <p>
                      <Link to="/getprice" style={{ textDecoration: "none" }}>
                        sales
                      </Link>
                    </p>
                    <p>
                      <Link
                        to="/videopitch2"
                        style={{ textDecoration: "none" }}
                      >
                        setting
                      </Link>
                    </p>
                  </div>
                </div>
                <div className="col-md-9"></div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ backgroundColor: "#eaeaea", padding: "69px" }}></div>
      </React.Fragment>
    );
  }
}
export default Account;
