const { INIT_ENV = 'dev' } = process.env
const isDev = INIT_ENV === 'dev'
const cacheConfig = {
  time: 1000 * 60 * 30, // 缓存时间毫秒数
  cacheRoutes: [
    '/about'
  ],
}
module.exports = {
  reactStrictMode: true,
  cacheConfig: isDev ? false : cacheConfig,
}
