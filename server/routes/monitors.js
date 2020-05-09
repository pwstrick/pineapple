const router = require('koa-router')()
const monitorController = require("../controllers/monitor");
const ctr = new monitorController();

router.prefix('/monitor');

router.get('/queryTime', async (ctx, next) => {
    await ctr.queryTime(ctx);
});

module.exports = router
