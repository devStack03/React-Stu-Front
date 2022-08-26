import React from "react";
import SearchHeader from "../components/SearchHeader/SearchHeader";
import CommonHeader from "../components/Header/CommonHeader";

class Layout extends React.Component {
  render() {
    return (
      <React.Fragment>
        <CommonHeader></CommonHeader>
        <SearchHeader></SearchHeader>
        <main>{this.props.children}</main>       
      </React.Fragment>
    );
  }
}
export default Layout;
