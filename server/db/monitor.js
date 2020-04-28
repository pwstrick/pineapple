const mongoose = require('./libs/model')
const Schema = mongoose.Schema;

const monitorSchema = new Schema({
  title: String,
  body: String,
  date: Date
});

const MyModel = mongoose.model('monitor', monitorSchema);

class Mongodb {

    //保存
    save (obj) {
       const m = new MyModel(obj)
       return new Promise((resolve, reject)=> {
         m.save((err, res) => {
           if (err) {
             reject(err)
           }
           resolve(res)
           console.log(res)
         })
       })
    }
  }
  module.exports = new Mongodb();
