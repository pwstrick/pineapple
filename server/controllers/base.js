class baseController {
    setJson({code=0, msg="success", data=null} = {}) {
        return JSON.stringify({code, msg, data});
    }
}

module.exports = baseController;