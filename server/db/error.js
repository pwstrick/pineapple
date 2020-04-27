const model = require('./libs/model');
const MyModel = new model('error', {
    type: Number,
    desc: String,
    stack: String,
    created: Number
});

class Mongodb {
    //查询
    query () {
        return MyModel.query();
    }
    //保存
    save (obj) {
        return MyModel.save(obj);
    }
}
module.exports = new Mongodb();

