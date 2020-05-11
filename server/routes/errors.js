const router = require('koa-router')()
const errorController = require("../controllers/error");
const ctr = new errorController();

router.prefix('/error');

router.get('/queryError', async (ctx, next) => {
    await ctr.queryError(ctx);
});
router.get('/queryErrorList', async (ctx, next) => {
    await ctr.queryErrorList(ctx);
});


module.exports = router
