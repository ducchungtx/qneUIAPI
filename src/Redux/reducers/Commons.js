import isEmpty from 'lodash/isEmpty';
import {
  FETCH_ERROR,
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_RESET,
  FETCH_RESET_ITEM
} from '../type';
import { ToastMessage, MessageStatus } from 'src/Services/commons';
import { Messages } from 'src/Commons';

const INIT_STATE = {
  error: "",
  loading: false,
  message: '',
  data: [],
  item: {},
  getName: "",
  loadingSave: false,
  customMessage: ''
};

export default (state = INIT_STATE, action) => {
  const apiType = action.payload ? action.payload.apiType : {};
  switch (action.type) {
    case FETCH_START: {
      if (apiType === 'ADD' || apiType === 'EDIT') {
        return { ...state, error: '', message: '', loading: true, getName: '', loadingSave: true };
      }
      return { ...state, error: '', message: '', loading: true, getName: '' };
    }
    case FETCH_SUCCESS: {
      /**
       * Thông báo (action.payload.apiType) ---
       * LIST: Fetch danh sách
       * ADD: Thêm mới
       * EDIT: Sửa
       * DELETE: Xoá
       * DETAIL: Chi tiết
       * Status trả về (action.payload.status) ---
       * 400: Trùng
       * 404: Dịch vụ không tồn tại
       * 417: Dữ liệu không tồn tại
       * 500: Lỗi dữ liệu
       * 504: Gateway Time-out
       */
      const responseStatus = action.payload.status;
      if (responseStatus === 200 || responseStatus === 201 || responseStatus === 204) {
        if (apiType === 'LIST') {
          if (action.payload.getName) {
            state[action.payload.getName] = {};
            state[action.payload.getName] = action.payload.data;
            state.getName = action.payload.getName;
          } else {
            state.data = action.payload.data;
          }
          return { ...state, error: '', message: '', loading: false };
        }
        let customMessage;
        if (!isEmpty(action.payload.data) && typeof action.payload.data === 'string') {
          customMessage = action.payload.data;
        }
        if (apiType === 'ADD') {
          // Message thêm mới
          if (!isEmpty(customMessage)) ToastMessage(customMessage);
          else ToastMessage(Messages.THEM_THANH_CONG);
          return { ...state, error: '', message: Messages.THEM_THANH_CONG, customMessage: customMessage, loading: false, loadingSave: false };
        }
        if (apiType === 'DELETE') {
          // Message xoá thành công
          if (customMessage) Helper.alertSuccessMessage(customMessage);
          else Helper.alertSuccessMessage(Messages.XOA_THANH_CONG);
          return { ...state, error: '', message: Messages.XOA_THANH_CONG, customMessage: customMessage, loading: false };
        }
        if (apiType === 'EDIT') {
          if (!isEmpty(customMessage)) ToastMessage(customMessage);
          else ToastMessage(Messages.CAP_NHAT_THANH_CONG);
          return { ...state, error: '', message: Messages.CAP_NHAT_THANH_CONG, customMessage: customMessage, loading: false, loadingSave: false };
        }
        if (apiType === 'DETAIL') {
          return { ...state, error: '', message: '', loading: false, item: action.payload.data };
        }
      } else {
        MessageStatus(responseStatus, action.payload.data);
        return { ...state, error: '', message: '', loading: false, loadingSave: false };
      }
      return { ...state };
    }
    case FETCH_ERROR: {
      return { ...state, error: true, message: '', loading: false };
    }
    case FETCH_RESET: {
      return INIT_STATE;
    }
    case FETCH_RESET_ITEM: {
      state[action.payload] = INIT_STATE[action.payload];
      return { ...state }
    }
    default:
      return state;
  }
}