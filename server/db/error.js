const { model } = require('./libs/model');
const myModel = new model('error', {
    type: Number,
    desc: String,
    stack: String,
    created: String,
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
            vendor: { type: String, default: undefined },
            model: { type: String, default: undefined },
            type: { type: String, default: undefined }
        },
        cpu: {
            architecture: { type: String, default: undefined }
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

