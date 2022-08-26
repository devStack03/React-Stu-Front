import * as search from "../actions/search";

const initialState = {
  isFetching: false,
  searchResults: [],
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = initialState, action) => {
  switch (action.type) {
    case search.SEARCH_SUCCESS:
      return {
        ...state,
        searchResults: action.data
      };

    case search.SEARCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };

    case search.SEARCH_FAILURE:
      return initialState;

    default:
      return state
  }
}