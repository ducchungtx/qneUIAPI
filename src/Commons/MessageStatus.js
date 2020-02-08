import { ToastMessage } from 'src/Services/commons';
import { isString } from 'lodash';
import Messages from './Messages';

export default (status, message = '') => {
  switch (status) {
    case 400:
      return ToastMessage(Messages.TRUNG_DU_LIEU);
    case 401:
      return ToastMessage(Messages.HET_PHIEN_LAM_VIEC);
    case 404:
      return ToastMessage(Messages.DICH_VU_KO_TON_TAI);
    case 409:
      if (isString(message)) {
        return ToastMessage(message);
      }
      return ToastMessage(Messages.NOI_DUNG_TRUNG_LAP);
    case 417:
      return ToastMessage(Messages.DU_LIEU_KO_TON_TAI);
    case 500:
      return ToastMessage(Messages.LOI_HE_THONG);
    case 504:
      return ToastMessage(Messages.KHONG_PHAN_HOI);
    default:
      break;
  }
}
