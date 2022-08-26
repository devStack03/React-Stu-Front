import React, { Component } from "react";
import LogoImage from "../../assets/img/logo.svg";
import UserImage from "../../assets/img/avatar.png";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import $ from "jquery";
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import "./Header.css";
import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import notificationIcon from "../../assets/img/notification.svg";

class CommonHeader extends Component {
  state = {
    user: "",
  };

  constructor(props) {
    super(props);
    // Menu items definition
    this.menuItems = [
      {
        text: "How it works?",
      },
      {
        items: [
          { text: "Menu 2.1", url: "/my_stable" },
          { text: "Menu 2.2", url: "/my_stable" },
        ],
        text: "Find talent",
      },
      {
        items: [
          { text: "Menu 3.1", url: "/my_stable" },
          { text: "Menu 3.2", url: "/my_stable" },
        ],
        text: "Find jobs",
      },
      { separator: true },
    ];

    if (this.props.isAuthenticated) {
      this.menuItems.push({
        items: [
          { text: "Profile", url: "/profile", iconCss: "fa-solid fa-user" },
          { text: "Logout", url: "#", iconCss: "fa-solid fa-user" },
        ],
        text: this.props?.user?.email,
        iconCss: "fa-solid fa-user",
      });
    } else {
      this.menuItems.push({ text: "Login", url: "/login" });
      this.menuItems.push({ text: "Join", url: "/register" });
    }
  }

  componentDidMount = () => {
    $("#main-menu>li>a").click(function () {
      $("#mySidenav").css("left", "-280px");
      document.getElementById("one").style.display = "";
      document.getElementById("two").style.display = "none";
    });

    $("#mySidenav").css("left", "-280px");
    document.getElementById("one").style.display = "";
    document.getElementById("two").style.display = "none";

    $(".a-toggle").click(function () {
      $(".social-m").slideToggle();
    });

    this.setState({ user: localStorage.getItem("user") });
  };

  openNav = () => {
    $("#mySidenav").css("left", "0");
    $("#mySidenav").css("width", "300px");
    document.getElementById("one").style.display = "none";
    document.getElementById("two").style.display = "";
  };

  closeNav = () => {
    $("#mySidenav").css("left", "-280px");
    document.getElementById("one").style.display = "";
    document.getElementById("two").style.display = "none";
  };

  render() {
    return (
      <React.Fragment>
        <section className="default-toggle">
          <div className="mobile_menu">
            <Link to="#" id="one" onClick={() => this.openNav()}>
              <i className="fa fa-bars" style={{ color: "white", padding: "10px" }}></i>
            </Link>
            <Link to="#" id="two" onClick={() => this.closeNav()}>
              <i className="fa fa-times"></i>
            </Link>
          </div>
          <div className="nav_menu_content">
            <div id="mySidenav" className="sidenav">
              <ul id="main-menu" className="sm sm-clean">
                {this.props.isAuthenticated ? (
                  <>
                    <li>
                      <Link to="/profile">Profile</Link>
                    </li>
                    <li className="mt-2">
                      <Link to="/my_stable">Home</Link>
                    </li>
                    <li className="mt-2">
                      <Link to="/add_domains">Add Domains</Link>
                    </li>
                    <li>
                      <Link to="/my_stable">My Stable</Link>
                    </li>
                    <li>
                      <Link to="/portfolio">Power Portfolio</Link>
                    </li>
                    <li className="d-flex d-lg-none">
                      <Link to="/how-it-works"> How it works?</Link>
                    </li>
                    <li className="d-flex d-lg-none">
                      <Link to="/build-your-dream"> Build Your dream</Link>
                    </li>
                    <li className="d-flex d-lg-none">
                      <Link to="/about-us"> About Us</Link>
                    </li>
                    <li className="d-flex d-lg-none">
                      <Link to="/our-mission"> Our Mission</Link>
                    </li>
                    <li className="d-flex d-lg-none">
                      <Link to="/order-sponsored-headlines">
                        Sponsored Headlines
                      </Link>
                    </li>

                    <li>
                      <Link to="/settings">Settings</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link title="How it works?" to="/how-it-works">
                        How it works?
                      </Link>
                    </li>
                    <li>
                      <Link title="Build Your dream" to="/build-your-dream">
                        Build Your dream
                      </Link>
                    </li>

                    <li>
                      <Link title="About Us" to="/about-us">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link title="Our Mission" to="/our-mission">
                        Our Mission
                      </Link>
                    </li>
                    <li>
                      <Link
                        title="Sponsored Headlines"
                        to="/order-sponsored-headlines"
                      >
                        Sponsored Headlines
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </section>

        {/* React nav  */}
        <Navbar bg="light" expand="lg" className="w-100" fixed="top">
          <Container fluid>
            <Link className="navbar-brand" to="/">
              <img src={LogoImage} alt="logo" className="logoImage" />
            </Link>
            {process.env.NODE_ENV === 'production' ? <Badge
              className="ms-4 px-3 custom-badge"
              bg="warning"
            >
              Beta Version
              <span className="animate-flicker">
                (No Trading &amp; Communication)
              </span>
            </Badge> : <></>}



            {this.props.isAuthenticated ? (
              <>

                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                    <NavLink
                      exact
                      activeClassName="active"
                      title="  My Stable"
                      className="nav-link "
                      to="/my_stable"
                    >
                      My Stable
                    </NavLink>
                    <NavLink
                      exact
                      activeClassName="active"
                      title="How it works?"
                      className="nav-link "
                      to="/how-it-works"
                    >
                      How it works?
                    </NavLink>

                    <NavLink
                      exact
                      activeClassName="active"
                      title="Build Your dream"
                      className="nav-link "
                      to="/build-your-dream"
                    >
                      Build Your dream
                    </NavLink>

                    <NavLink
                      exact
                      activeClassName="active"
                      title=" About Us"
                      className="nav-link "
                      to="/about-us"
                    >
                      About Us
                    </NavLink>
                    <NavLink
                      exact
                      activeClassName="active"
                      title=" Our Mission"
                      className="nav-link "
                      to="/our-mission"
                    >
                      Our Mission
                    </NavLink>
                    <NavLink
                      exact
                      activeClassName="active"
                      title="  Sponsored Headlines"
                      className="nav-link "
                      to="/order-sponsored-headlines"
                    >
                      Sponsored Headlines
                    </NavLink>
                    <NavLink
                      exact
                      activeClassName="active"
                      title="Broker Page"
                      className="nav-link "
                      to="/broker-page"
                    >
                      Admin Panel
                    </NavLink>
                  </Nav>
                  <div className="d-flex">
                    <div className="notification d-lg-flex d-none">
                      <Button variant="link">
                        <Image src={notificationIcon} />
                        <span className="notification-count">3</span>
                      </Button>
                    </div>

                    <div className="d-lg-flex d-none align-items-center">
                      <Image
                        className="img-rounded user-profile-pic"
                        src={UserImage}
                        roundedCircle="true"
                        alt="user-image"
                      />
                      <NavDropdown
                        title={this.props?.user?.user?.first_name}
                        id="basic-nav-dropdown"
                      >
                        <NavLink to="/profile">
                          Profile
                        </NavLink>
                        <NavLink to="/settings">Settings</NavLink>
                        <NavDropdown.Item onClick={() => this.props.logout()}>
                          Log Out
                        </NavDropdown.Item>
                      </NavDropdown>
                    </div>
                  </div>
                </Navbar.Collapse>
              </>
            ) : (
              <>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="ms-auto">
                    <NavLink
                      exact
                      activeClassName="active"
                      title="How it works?"
                      className="nav-link "
                      to="/how-it-works"
                    >
                      How it works?
                    </NavLink>
                    <NavLink
                      exact
                      activeClassName="active"
                      title="How it works?"
                      className="nav-link "
                      to="/build-your-dream"
                    >
                      Build Your dream
                    </NavLink>
                    <NavLink
                      exact
                      activeClassName="active"
                      title="About Us"
                      className="nav-link "
                      to="/about-us"
                    >
                      About Us
                    </NavLink>
                    <NavLink
                      exact
                      activeClassName="active"
                      title=" Our Mission"
                      className="nav-link "
                      to="/our-mission"
                    >
                      Our Mission
                    </NavLink>
                    <NavLink
                      exact
                      activeClassName="active"
                      title="  Sponsored Headlines"
                      className="nav-link "
                      to="/order-sponsored-headlines"
                    >
                      Sponsored Headlines
                    </NavLink>
                  </Nav>
                </Navbar.Collapse>
                <div className="authbutton">
                  <div className="form-inline my-2 my-lg-0 nav-btns">
                    <Link to="/login">
                      <button className="btn p-bg p-purple my-2 my-sm-0 text-uppercase">
                        Log in
                      </button>
                    </Link>
                  </div>
                  <div className="form-inline my-2 my-lg-0 nav-btns">
                    <Link to="/register" className="join-btn">
                      <button className="btn p-bg p-purple my-2 my-sm-0 text-uppercase">
                        Join
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
            {this.props.isAuthenticated ? (
              <div className="d-flex d-lg-none align-items-center ipad-shown">
                <div className="notification">
                  <Button variant="link">
                    <Image src={notificationIcon} />
                    <span className="notification-count">2</span>
                  </Button>
                </div>
                <Image
                  className="img-rounded user-profile-pic"
                  src={UserImage}
                  roundedCircle="true"
                  alt="user-image"
                />

                <NavDropdown
                  title={this.props.user?.user?.first_name}
                  id="basic-nav-dropdown"
                >
                  <NavLink to="/profile">Profile</NavLink>
                  <NavLink to="/settings">Settings</NavLink>
                  <NavDropdown.Item onClick={() => this.props.logout()}>
                    Log Out
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            ) : (
              ""
            )}
          </Container>
        </Navbar>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
  };
};

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(CommonHeader);
