// db/index.js
const mongoose = require('./db')

class Mongodb {
    constructor (name, schema) { 
        this.model = mongoose.model(name, schema);
    }
    //保存
    save (obj) {
        obj.created = Date.now();       //日期
        const doc = new this.model(obj);
        return new Promise((resolve, reject)=> {
            doc.save((err, row) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(row);
            })
        });
     }
    //查询
    query (conditions = {}, fields  ={}) {
        return new Promise((resolve, reject) => {
            this.model.find(conditions, fields,(err, rows) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            })
        });
    }
}
module.exports = {
    model: Mongodb,
    mongoose: mongoose
} ;

