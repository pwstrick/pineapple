const router = require('koa-router')()
const projectController = require("../controllers/project");
const ctr = new projectController();

router.prefix('/project')

router.get('/create', async (ctx, next) => {
    await ctr.create(ctx);
});

router.get('/all', async (ctx, next) => {
    await ctr.all(ctx);
});

module.exports = router
