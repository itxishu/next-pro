import request from '../utils/request';
import { BASE_URL } from '../utils/config';

export const stark = () => {
  return request.get(`${BASE_URL}/stark`);
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getCateList,
  getCateDetail,
  getMainCate,
  getExampleDetail
};
