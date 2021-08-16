const nextConfig =  require('../../next.config')

const cacheConfig = nextConfig.openCache || {
    cacheTime: 0,
    cacheRoutes: []
}
module.exports = {
    cacheConfig
}



