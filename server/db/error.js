const { model } = require('./libs/model');
const myModel = new model('error', {
    type: Number,
    desc: String,
    stack: String,
    created: Number
});

class Mongodb {
    //查询
    query () {
        return myModel.query();
    }
    //保存
    save (obj) {
        return myModel.save(obj);
    }
}
module.exports = new Mongodb();

