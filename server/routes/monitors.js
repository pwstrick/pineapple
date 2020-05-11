const router = require('koa-router')()
const monitorController = require("../controllers/monitor");
const ctr = new monitorController();

router.prefix('/monitor');

router.get('/queryTime', async (ctx, next) => {
    await ctr.queryTime(ctx);
});
router.get('/queryTimeList', async (ctx, next) => {
    await ctr.queryTimeList(ctx);
});


module.exports = router
