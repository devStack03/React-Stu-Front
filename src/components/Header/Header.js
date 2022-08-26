import React, { Component } from "react";
import "./Header.css";
import LogoImage from "../../assets/img/logo.png";
import { Link } from "react-router-dom";
import toggleimg from "../../assets/img/toggle.png";
import Navimg from "../../assets/img/nav.png";
import N2img from "../../assets/img/n2.png";
import N3img from "../../assets/img/n3.png";
import N4img from "../../assets/img/n4.png";
import N5img from "../../assets/img/n5.png";
import $ from "jquery";

class Header extends Component {
  componentDidMount = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("one").style.display = "";
    document.getElementById("two").style.display = "none";

    $(".a-toggle").click(function () {
      $(".social-m").slideToggle();
    });
  };

  openNav = () => {
    document.getElementById("mySidenav").style.width = "280px";
    document.getElementById("one").style.display = "none";
    document.getElementById("two").style.display = "";
  };

  closeNav = () => {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("one").style.display = "";
    document.getElementById("two").style.display = "none";
  };

  render() {
    return (
      <React.Fragment>
        <div className="stb">
          <header style={{ backgroundColor: "#eaeaea" }}>
            <div className="container-fluid">
              <nav className="navbar navbar-expand-lg">
                <Link to="#" className="default-toggle">
                  <div className="mobile_menu">
                    <Link to="#" id="one" onClick={() => this.openNav()}>
                      <Link to="#" className="default-toggle">
                        <img src={toggleimg} alt="icon" width="30" />
                      </Link>
                    </Link>
                    <Link to="#" id="two" onClick={() => this.closeNav()}>
                      &times;
                    </Link>
                  </div>
                  <div className="nav_menu_content">
                    <div id="mySidenav" className="sidenav">
                      <ul id="main-menu" className="sm sm-clean">
                        <li>
                          <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                          {" "}
                          <Link to="/add_domains">Add Domains</Link>
                        </li>
                        <li>
                          <Link to="/my_stable">My Stable</Link>
                        </li>
                        <li>
                          <Link to="/portfolio">Portfolio Power</Link>
                        </li>
                        <li>
                          <Link to="/settings">Settings</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Link>
                <Link className="navbar-brand" to="/">
                  <img src={LogoImage} alt="logo" />
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-toggle="collapse"
                  data-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <img src={Navimg} alt="icon" width="20" />
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav m-auto pt-1 menubar">
                    <li className="nav-item">
                      <Link className="nav-link" to="/domainsearch">
                        buy domains
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/domainlead">
                        sell domains
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/stable">
                        my stable
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/enquire">
                        startup breeders
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/getprice">
                        thoroughbreds
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/videopitch2">
                        sponsored headlines
                      </Link>
                    </li>
                  </ul>
                  <div className="d-toggle">
                    <Link to="#" className="a-toggle">
                      <img src={Navimg} alt="icon" width="25" />
                    </Link>
                    <div className="social social-m">
                      <Link to="#">
                        <img src={N2img} alt="icon" width="25" />
                      </Link>
                      <Link to="#">
                        <img src={N3img} alt="icon" width="25" />
                      </Link>
                      <Link to="#">
                        <img src={N4img} alt="icon" width="25" />
                      </Link>
                      <Link to="#">
                        <img src={N5img} alt="icon" width="25" />
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </header>
        </div>
      </React.Fragment>
    );
  }
}

export default Header;
