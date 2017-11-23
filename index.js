const Koa = require('koa');
const Router = require('koa-router');
const json = require('koa-json');
const cors = require('kcors');
const app = new Koa();
//导入数据模型
let models = require('./models');
models.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const router = new Router();

router.get('/', function(ctx, next) {
    return ctx.body = 'hello world'
});
router.get('/getCards', async(ctx, next) => {
    let data = await models.Magic.findAll({
        'limit': 10,
        'offset': 0
    });
    ctx.body = data;
});
app
    .use(cors())
    .use(router.routes())
    .use(router.allowedMethods())
    .use(json());

app.listen(4000, '0.0.0.0');