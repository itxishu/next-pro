import request from '../utils/request';
import { BASE_URL } from '../consts/config';

export const getCateList = () => {
  return request.get(`${BASE_URL}/v1/service/lesson/menuList`);
};
export const getCateDetail = payload => {
  return request.post(`${BASE_URL}/v1/service/lesson/lessonList`, payload);
};
export const getMainCate = payload => {
  return request.post(`${BASE_URL}/v1/service/lesson/navList`, payload);
};
export const getDetail = payload => {
  return request.post(`${BASE_URL}/v1/service/lesson/detail`, payload);
};
export const search = payload => {
  return request.post(`${BASE_URL}/v1/service/lesson/search`, payload);
};
export const getExampleDetail = payload => {
  return request.post(`${BASE_URL}/v1/service/example/detail`, payload);
};

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
  getCateList,
  getCateDetail,
  getMainCate,
  getExampleDetail
};
