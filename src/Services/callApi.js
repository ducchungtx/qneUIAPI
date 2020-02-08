import axios from 'axios';
import { AppConfig } from 'src/Commons';

class CallApi {
  /**
   * Hàm gọi api public
   * @param {string} type loại đường dẫn sub
   * @param {string} method loại method
   * @param {string} endpoint path
   * @param {object} body nội dung
   *
   * @static
   * @memberof CallApi
   */
  static apiServicePublic = async (method = 'GET', endpoint, body) => {
    const apiAddress = AppConfig.MAIN_URL;
    let url = `${apiAddress}/${endpoint}`;
    if (type) {
      url = `${apiAddress}/${type}/${endpoint}`;
    }
    let contentType = 'application/json;charset=utf-8';
    return axios({
      headers: {
        'Content-Type': contentType
      },
      method,
      url,
      data: body
    });
  };
}

export default CallApi;