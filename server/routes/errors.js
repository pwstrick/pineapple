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
router.get('/queryErrorBrowser', async (ctx, next) => {
    await ctr.queryErrorBrowser(ctx);
});
router.get('/queryErrorBrowserVersion', async (ctx, next) => {
    await ctr.queryErrorBrowserVersion(ctx);
});

module.exports = router
