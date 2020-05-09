const { model } = require('./libs/model');
const myModel = new model('project', {
    name: {
       type: String,
       unique: true,
       required: true
    },
    created: String,
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
    //查询
    getRowByName (name) {
        return myModel.findOne({name});
    }
}
module.exports = new Mongodb();

