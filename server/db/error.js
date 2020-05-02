const { model } = require('./libs/model');
const myModel = new model('error', {
    type: Number,
    desc: String,
    stack: String,
    created: Number,
    token: String,
    agent: {
        ua: String,
        browser: {
            name: String,
		    version: String,
		    major: String
        },
        engine: {
            name: String,
            version: String
        },
        os: {
            name: String,
            version: String
        },
        device: {
            vendor: String,
            model: String,
            type: String
        },
        cpu: {
            architecture: String
        }
    },
    url: String
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

