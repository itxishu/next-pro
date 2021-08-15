/*
 * @Author: starkwang
 * @Contact me: https://shudong.wang/about
 * @Date: 2019-11-21 15:25:24
 * @LastEditors: starkwang
 * @LastEditTime: 2019-11-27 18:30:56
 * @Description: file content
 */
const express = require('express');
const next = require('next');
const path = require('path');

const dev = process.env.NODE_ENV === 'development';
const app = next({ dev });

const router = require('./node/routes')(app);
const server = express();
const Cache = require('./node/cache');

// 配置静态资源
const staticPath = './public';
server.use(express.static(path.join(__dirname, staticPath)));
const handle = app.getRequestHandler();

const port = parseInt(process.env.PORT, 10) || 3000

app.prepare().then(() => {
  server.get('/check', (req, res) => {
    res.send({
      code: 1,
      msg: 'success'
    });
  });
  server.post('/clearCache', (req, res) => {
    const { url, platform = 'pc' } = req.query;
    if (url) {
      const clearUrl = `${platform}:${decodeURIComponent(url)}`;
      console.log(clearUrl, 'clearUrl');
      Cache.has(clearUrl) && Cache.del(clearUrl);
      res.send({
        code: 1,
        msg: 'success',
        data: Cache.keys()
      });
    } else {
      res.send({
        code: 0,
        msg: '请输入合法的URL'
      });
    }
  });
  server.use('', router);
  server.get('*', (req, res) => {
    return handle(req, res);
  });
  // router(server)
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
