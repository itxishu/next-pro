const Router = require('koa-router');
const KoaStatic = require('koa-static');
const proxyMiddleware = require('http-proxy-middleware');
const c2k = require('koa2-connect');
const proxyTable = require('../config/proxy.js');
const { isPc } = require('../utils');
const { koaRender } = require('../utils/koaRender');
const { routeData } = require('./routeData');

const router = new Router();

module.exports = function(app) {
  const handle = app.getRequestHandler();

  routeData.forEach(item => {
    router.get(item.path, async ctx => {
      item.redirect && ctx.response.redirect(item.redirect);

      let newComponent = item.component;
      if (!newComponent) {
        const pcFlag = isPc(ctx.req.headers['user-agent']);
        newComponent = pcFlag ? item.componentPc : item.componentH5;
      }
      await koaRender({
        app,
        ctx,
        component: newComponent,
        data: item
      });
      ctx.respond = false;
    });
  });

  Object.keys(proxyTable).forEach(context => {
    let options = proxyTable[context];
    if (typeof options === 'string') {
      options = { target: options };
    }
    router.get('*', c2k(proxyMiddleware(options.filter || context, options)));
  });
  // router.get('/guide/:id?/:uniqueId?', async ctx => {
  //   // console.log('ctx.params', ctx.params);
  //   await app.render(ctx.req, ctx.res, '/pc/tools/KnowledgeBase', ctx.params);
  //   // ctx.respond = false;
  // });

  // router.get('/links', async ctx => {
  //   console.log('ctx.query', ctx);
  //   await app.render(ctx.req, ctx.res, '/pc/links', ctx.query);
  //   // ctx.respond = false;
  // });
  // router.get('/snippet', async ctx => {
  //   console.log('ctx.query', ctx);
  //   await app.render(ctx.req, ctx.res, '/pc/snippet', ctx.query);
  //   // ctx.respond = false;
  // });
  // router.get('/api/snippet', async ctx => {
  //   await app.render(ctx.req, ctx.res, '/a', ctx.query);
  //   ctx.respond = false;
  // });
  // router.get('/', async ctx => {
  //   await app.render(ctx.req, ctx.res, '/pc/tools', ctx.query);
  //   ctx.respond = false;
  // });
  // router.get('/tools/*', async ctx => {
  //   const pcUrlData = {
  //     '/tools/qrbtf': '/pc/tools/qrbtf',
  //     '/tools/time': '/pc/tools/TimeStamp',
  //     '/tools/rand': '/pc/tools/RandomPW',
  //     '/tools/trimark': '/pc/tools/CssTrimark',
  //     '/tools/imgbase': '/pc/tools/ImgTransBase',
  //     '/tools/json': '/pc/tools/JsonFormat'
  //   };
  //   await app.render(ctx.req, ctx.res, pcUrlData[ctx.url], ctx.query);
  //   ctx.respond = false;
  // });
  // router.get('/timestamp', async ctx => {
  //   await app.render(ctx.req, ctx.res, '/pc/timestamp', ctx.query);
  //   ctx.respond = false;
  // });
  // router.get('/demo', async ctx => {
  //   await app.render(ctx.req, ctx.res, '/pc/tools/RandomPW', ctx.query);
  //   ctx.respond = false;
  // });
  router.get('/links', async ctx => {
    console.log('ctx.query', ctx);
    await app.render(ctx.req, ctx.res, '/pc/links', ctx.query);
    // ctx.respond = false;
  });
  router.get('/snippet', async ctx => {
    console.log('ctx.query', ctx);
    await app.render(ctx.req, ctx.res, '/pc/snippet', ctx.query);
    // ctx.respond = false;
  });
  router.get('/api/snippet', async ctx => {
    await app.render(ctx.req, ctx.res, '/a', ctx.query);
    ctx.respond = false;
  });
  router.get('/ua', async ctx => {
    console.log('ctx.query', ctx);
    await app.render(ctx.req, ctx.res, '/pc/ua', ctx.query);
    // ctx.respond = false;
  });

  router.all('*', async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });
  return router;
};
