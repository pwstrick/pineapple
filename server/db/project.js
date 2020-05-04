const { model } = require('./libs/model');
const myModel = new model('project', {
    name: {
       type: String,
       unique: true
    },
    created: Number,
    token: String,
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

