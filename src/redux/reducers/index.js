/* eslint-disable import/no-anonymous-default-export */
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as toastr } from "react-redux-toastr";
import auth from "./auth";
import search from "./search";

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  search,
  toastr
});
