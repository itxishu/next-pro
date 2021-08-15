const { isPc } = require('./index');
const Cache = require('../cache');
// koa路由渲染
const render = async ({ app, ctx, component, data }) => {
  const seoData = data || {};
  const pcFlag = isPc(ctx.req.headers['user-agent']);
  const cacheFlag = isPc(ctx.req.headers['user-agent']) ? 'pc' : 'h5';
  ctx.req.seoData = seoData;
  ctx.req.pcFlag = pcFlag;
  ctx.req.params = ctx.req.params || {};
  console.log('===', 'render');
  const currentUrl = `${cacheFlag}:${ctx.req.url}`;
  // return app.render(ctx.req, ctx.res, component, ctx.query);
  // 获取缓存
  if (Cache.has(currentUrl)) {
    // 缓存
    console.log('===', '命中缓存');
    ctx.type = 'html';
    ctx.res.setHeader('Content-Type', 'text/html');
    // ctx.append('Content-Type', 'text/html;charset=utf-8');
    // ctx.response.headers['Content-Type'] = 'text/html';
    ctx.res.send(Cache.get(currentUrl));
    // ctx.res
    return false;
  }

  console.log('===', '实时', ctx.req.query);
  const oldEnd = ctx.res.end;
  ctx.res.end = payload => {
    // 预览页面不能缓存
    if (currentUrl.indexOf('/preview') === -1) {
      payload && Cache.set(currentUrl, payload);
    }

    // oldEnd(payload);
    ctx.res.end = oldEnd;
    ctx.res.setHeader('Content-Type', 'text/html');
    ctx.res.send(payload);
  };
  const htmlStr = await app.render(
    ctx.req,
    ctx.res,
    component,
    ctx.req.query || {}
  );
};

module.exports = { render };
