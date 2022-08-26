import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./Layout/index";
import PublicLayout from "./Layout/public";

import Home from "./containers/Home/Home";
import DomainSearch from "./containers/Domains/Domainsearch";
import AddDomain from "./containers/Domains/AddDomain";
import LandingPage from "./containers/LandingPage";
import PowerPortfolio from "./containers/Powerportfolio/Powerportfolio";
import Stable from "./containers/Stable/Stable";
import Checkout from "./containers/Checkout/Checkout";
import Login from "./containers/Auth/Login";
import Register from "./containers/Auth/Register";
import Sponsored from "./containers/Sponsored/Sponsored";
import SponsoredHeadlines from "./containers/SponsoredHeadlines/Sponsored-Headlines";
import PrivateRoute from "./components/PrivateRoute";
import Order from "./containers/Buynow/Order";
import VideoUpload from "./containers/Domains/VideoUpload";
import VideoPitch from "./containers/VideoPitch";
import UserProfile from "./containers/Profile";
import ForgotPassword from "./containers/Auth/Forgot-password";
import HowItWorks from "./containers/HowItWorks/HowItWorks";
import MainFooter from "./containers/mainFooter/MainFooter";
import AboutUs from "./containers/AboutUs/AboutUs";
import PrivacyPolicy from "./containers/PrivacyPolicy/PrivacyPolicy";
import TermsAndConditions from "./containers/TermsAndConditions/TermsAndConditions";
import BuildYourdream from "./containers/HowItWorks/BuldYourDream";
import SponsoredPage from "./containers/Home/sponsoredPage";
import HomeSearch from "./containers/Home/HomeSearch";
import OurMission from "./containers/OurMission/OurMission";
import BrokerPage from "./containers/BrokerPage";
import PortfolioApproval from "./containers/ApprovalPage/PortfolioApproval";
import UserList from "./containers/ApprovalPage/UserList";


const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap mt-0">
      <PrivateRoute path="/landing/:id" component={LandingPage} />
      <PrivateRoute path="/video_upload/:id" component={VideoUpload} />
      <PrivateRoute path="/video-pitch" component={VideoPitch} />
      <PrivateRoute path="/portfolio" component={PowerPortfolio} />
      <PrivateRoute path="/add_domains" component={AddDomain} />
      <PrivateRoute path="/buy_order" component={Order} />
      <PrivateRoute path="/profile" component={UserProfile} />
      <PrivateRoute path="/broker-page" component={BrokerPage} />
      <PrivateRoute path="/recently-viewed-domains" component={Stable} />
      <PrivateRoute path="/traffic" component={Stable} />
      <PrivateRoute path="/market" component={Stable} />
      <PrivateRoute path="/settings" component={Stable} />
      <PrivateRoute path="/search" component={DomainSearch} />
      <PrivateRoute path="/stable" component={Stable} />
      <PrivateRoute path="/my_stable" component={Stable} />
      <PrivateRoute
        path="/order-sponsored-headlines"
        component={SponsoredHeadlines}
      />
      <PrivateRoute path="/Checkout" component={Checkout} />
    </div>
    <MainFooter />
  </div>
);

const publicRoutes = () => (
  <div>
    <PublicLayout />
    <div className="container__wrap">
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/how-it-works" component={HowItWorks} />
      <Route path="/build-your-dream" component={BuildYourdream} />
      <Route path="/about-us" component={AboutUs} />
      <Route path="/our-mission" component={OurMission} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-and-conditions" component={TermsAndConditions} />
      <Route path="/sponsored/:page" component={SponsoredPage} />
      <Route path="/homesearch" component={HomeSearch} />
      <Route path="/PortfolioApproval" component={PortfolioApproval} />
      <Route path="/UserList" component={UserList} />
    </div>
    <MainFooter />
  </div>
);

const Router = () => (
  <React.Fragment>
    <main>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route path="/login" component={publicRoutes} />
        <Route path="/register" component={publicRoutes} />
        <Route path="/forgot-password" component={publicRoutes} />
        <Route path="/sponsored-headlines" component={Sponsored} />
        <Route path="/how-it-works" component={publicRoutes} />
        <Route path="/about-us" component={publicRoutes} />
        <Route path="/our-mission" component={publicRoutes} />
        <Route path="/build-your-dream" component={publicRoutes} />
        <Route path="/privacy-policy" component={publicRoutes} />
        <Route path="/terms-and-conditions" component={publicRoutes} />
        <Route path="/sponsored/:page" component={publicRoutes} />
        <Route path="/homesearch" component={publicRoutes} />
        <Route path="/broker-page" component={wrappedRoutes} />
        <Route path="/PortfolioApproval" component={publicRoutes} />
        <Route path="/UserList" component={publicRoutes} />
        <Route path="/" component={wrappedRoutes} />
        <Route path="*" component={Home} />
      </Switch>
    </main>
  </React.Fragment>
);

export default Router;
