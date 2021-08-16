const { isPc } = require('./index')
const Cache = require('../cache')
const cacheConfig = require('../config')
// koa路由渲染
const render = async ({ app, ctx, component, data }) => {
  const seoData = data || {}
  const pcFlag = isPc(ctx.req.headers['user-agent'])
  const cacheFlag = pcFlag ? 'pc' : 'h5'
  ctx.req.seoData = seoData
  ctx.req.pcFlag = pcFlag
  ctx.req.params = ctx.req.params || {}
  const currentUrl = `${cacheFlag}:${ctx.req.url}`
  console.log('===render', currentUrl)

  // return app.render(ctx.req, ctx.res, component, ctx.query);
  // 获取缓存
  if (cacheConfig.cacheTime && Cache.has(currentUrl)) {
    // 缓存
    console.log('===命中缓存', currentUrl)
    ctx.res.setHeader('Content-Type', 'text/html')
    // ctx.append('Content-Type', 'text/html;charset=utf-8');
    ctx.res.send(Cache.get(currentUrl))
    return false
  }

  console.log('===', '实时', ctx.req.query)
  ctx.res.setHeader('author', 'HANK')
  try {
    const htmlStr = await app.renderToHTML(
      ctx.req,
      ctx.res,
      component,
      ctx.req.query || {}
    )
    if (cacheConfig.cacheTime && htmlStr) {
      Cache.set(currentUrl, htmlStr)
    }
    ctx.res.setHeader('Content-Type', 'text/html')
    ctx.res.send(htmlStr)
  } catch (err) {
    console.log('===render Error', err)
    app.render(ctx.req, ctx.res, component, ctx.req.query || {})
  }

  // console.log('===', htmlStr, 'htmlStr')
}

module.exports = { render }
