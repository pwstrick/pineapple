const moment = require('moment');
const mongoose = require('./db');

class Mongodb {
    constructor (name, schema, options={}) { 
        const mySchema = new mongoose.Schema(schema, options);    //声明结构
        this.model = mongoose.model(name, mySchema);
    }
    //保存
    save (obj) {
        obj.created = obj.created || moment().format('YYYY-MM-DD HH:mm:ss');         //日期
        // obj.created = new Date();         //日期
        const doc = new this.model(obj);
        return new Promise((resolve, reject)=> {
            doc.save((err, row) => {
              if (err) {
                reject(err);
                return;
              }
              resolve(row);
            });
        });
     }
    //查询
    query (conditions={}, fields={}, order={}, number=0, offset=0) {
        return new Promise((resolve, reject) => {
            this.model.find(conditions, fields).sort(order).skip(offset).limit(number).exec((err, rows) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(rows);
            })
        });
    }
    //查询一条数据
    findOne (conditions={}, fields={}) {
        return new Promise((resolve, reject) => {
            this.model.findOne(conditions, fields).exec((err, row) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(row);
            })
        });
    }
    //读取记录数量
    count (conditions={}) {
        return new Promise((resolve, reject) => {
            this.model.count(conditions).exec((err, number) => {
                if(err) {
                    reject(err);
                    return;
                }
                resolve(number);
            })
        });
    }
    //计算平均值
    avg (field, group, conditions={}, order={}) {
        // console.log(conditions)
        return new Promise((resolve, reject) => {
            this.model.aggregate([
                { $match: conditions },
                { $group: { _id: group,  [field]: {$avg: `$time.${field}`} } },
                { $sort: order }
            ]).exec((err, rows) => {
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
    mongoose
};

