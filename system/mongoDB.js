const common = require('../common.js');

const find = (model, searchParam, req, callback) => {
    model.find(searchParam).exec((err, results) => {
        if (err) {
            callback({ 'success': false, 'message': 'Some Error', model: model.collection.collectionName, 'error': err});
        }
        callback({ 'success': true, 'message': 'data fetched successfully', model: model.collection.collectionName, results });
    });
}

const save = (model, req, callback) => {
    const modelObj = new model(req.body);
    modelObj.save((err, result) => {
        if (err) {
            return callback({ 'success': false, ...err});
        } 
        callback({ 'success': true, 'message': 'data added successfully', model: model.collection.collectionName, result });
    });
}

const insertMany = (model, req, callback) => {
    model.insertMany(req.body, { ordered: false, rawResult: true }, (err, result) => {
        if (err) {
            return callback({ 'success': false, ...err});
        } 
        callback({ 'success': true, 'message': 'data added successfully', model: model.collection.collectionName, result });
    });
}

module.exports = {
    find,
    save,
    insertMany
}
