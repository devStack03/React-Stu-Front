import axios from "axios";
import * as variable from "../../variables/variables";
export const SEARCH_REQUEST = 'api/SEARCH_REQUEST';
export const SEARCH_SUCCESS = 'api/SEARCH_SUCCESS';
export const SEARCH_FAILURE = 'api/SEARCH_FAILURE';

export const getSearchResult = (name, extensions, filters) => dispatch => {
  dispatch({ type: SEARCH_REQUEST });
  extensions = extensions === "" ? [] : extensions;
  localStorage.setItem('searchText', name);
  localStorage.setItem('extensions', extensions);

  return axios.get(`${variable.API_URL}/api/domains/search/?${localStorage.getItem('filters') === undefined ? {} : localStorage.getItem('filters')}`, {
    params: {
      domain_name: name,
      extensions: JSON.stringify(extensions),
      filters: JSON.stringify(filters)
    }
  })
    .then(res => {
      dispatch({
        type: SEARCH_SUCCESS,
        data: res.data,
      });
    }).catch(err => {
      dispatch({
        type: SEARCH_FAILURE,
      });
      throw (err);
    })
};

