// Include library files
const system = require('./system');
const config = system.config;

// Config settings
const basePath = process.cwd();
const allowedOrigins = config.ALLOWED_ORIGINS;
const nodeApiVersion = config.NODE_API_VERSION;

const getValidationMessages = (messages) => {
    let { errors } = messages;
    var msgs = [];
    for (let column in errors) {
        if(errors[column].message) {
            msgs.push({[column]: errors[column].message});
        }
    }
    return msgs;
}


const getBulkValidationMessages = (messages) => {
    let errorMsg=[]
    for (let error of messages) {
        errorMsg.push(getValidationMessages(error));
        console.log(errorMsg);
    }
    return errorMsg;
}

module.exports = {
    config,
    basePath,
    allowedOrigins,
    nodeApiVersion,
    system,
    getValidationMessages,
    getBulkValidationMessages
};
