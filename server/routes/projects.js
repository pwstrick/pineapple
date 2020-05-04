const router = require('koa-router')()
const projectController = require("../controllers/project");

router.prefix('/project')

router.get('/create', async (ctx, next) => {
    const ctr = new projectController();
    await ctr.create(ctx);
});


module.exports = router
