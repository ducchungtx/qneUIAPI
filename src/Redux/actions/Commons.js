import { CallApi } from 'src/Services';
import { FETCH_START, FETCH_SUCCESS, FETCH_ERROR, FETCH_RESET, FETCH_RESET_ITEM } from 'src/redux/type';

/* Get List */
const fetchStart = (urlData, method, typeData, apiType, getName = '') => async (dispatch, getState) => {
  dispatch(getListContent());
  const result = await CallApi.apiService(method, urlData, typeData);
  if (result && result.data || (result.status === 200 || result.status === 201 || result.status === 204)) {
    return dispatch(getListContentSuccess(result.data, typeData, result.status, apiType, getName));
  }
  return dispatch(getListContentFail(result.data, result.status));
};

const getListContent = () => {
  return { type: FETCH_START };
};
const getListContentSuccess = (data, typeData, status, apiType, getName = '') => {
  return { type: FETCH_SUCCESS, payload: { data, typeData, status, getName, apiType } };
};
const getListContentFail = (data, status) => {
  return { type: FETCH_ERROR, payload: { data, status } };
};

// Reset List Item
const fetchReset = () => dispatch => {
  return dispatch(fetchResetCall());
}
const fetchResetCall = () => {
  return { type: FETCH_RESET }
}

// Reset Item by key
const fetchResetItem = (key) => dispatch => {
  return dispatch(fetchResetItemCall(key));
}
const fetchResetItemCall = (key) => {
  return { type: FETCH_RESET_ITEM, payload: { key } }
}

export default {
  fetchStart,
  fetchReset,
  fetchResetItem
};
