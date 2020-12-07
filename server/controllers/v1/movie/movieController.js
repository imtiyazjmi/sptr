const common = require('../../../../common');
const { Query } = require('mongoose');
const mongoDB = require(common.basePath + '/system/mongoDB');
const mongoDBModel = require(common.basePath + '/server/models/movie');

module.exports = {
    get(req, res) {

        let { query } = req.query;
        let queryParams = {
            name: query
        }
        mongoDB.find(mongoDBModel, queryParams, req, (response) => {
            if(!(response.results && response.results.length > 0)) {
                response.results = `No movie with the name '${query}' found`
            }
            res.send(response)
        });
    },

    // Method to save data into database
    post(req, res) {
        mongoDB.save(mongoDBModel, req, (response) => {
            let { success } = response 
            if(success) {
                return res.send(response);
            }
            return res.send({ success: success, error: common.getValidationMessages(response) });
        });
    },
    bulkInsert(req, res) {
        mongoDB.insertMany(mongoDBModel, req, (response) => {
            console.log(JSON.stringify(response));
            if(response.result && response.result.mongoose && response.result.mongoose.validationErrors 
                && response.result.mongoose.validationErrors.length > 0) {
                return res.send({...common.getBulkValidationMessages(response.result.mongoose.validationErrors)});
            }
            return res.send(response);
        });
    }
}