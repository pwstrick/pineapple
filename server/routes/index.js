const router = require('koa-router')();
const path = require('path');
const fs = require('fs');
const indexController = require("../controllers/index");

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
});

router.get('/pa.gif', async (ctx, next) => {
  const ctr = new indexController();
  ctr.collect(ctx);
  const url = path.resolve(__dirname, "../public/images/blank.gif");
  ctx.body = fs.readFileSync(url);    //空白gif图
});

module.exports = router
