console.log('process.env.INIT_ENV: ', process.env.INIT_ENV);
export const currentEnv = process.env.INIT_ENV;
const isProd = process.env.INIT_ENV === 'prod';

const defualtUrl = 'https://api.devland.cn';

const urlEnv = {
  prod: 'https://api.devland.cn',
  dev: 'http://testapi.devland.cn',
  test: 'http://testapi.devland.cn'
};

export default {
  baseUrl: urlEnv[currentEnv] || defualtUrl
};
export const BASE_URL = urlEnv[currentEnv] || defualtUrl;
export const QINIU_IMG_HOST = `https://img.kaikeba.com/`;
