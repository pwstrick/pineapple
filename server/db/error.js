const {mongoose, model} = require('./libs/model')
const Schema = mongoose.Schema;
const errorSchema = new Schema({
    type: Number,
    desc: String,
    stack: String,
    created: Number
});
const MyModel = new model('error', errorSchema);

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

