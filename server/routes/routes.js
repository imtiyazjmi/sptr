const common = require('../../common');
const movieRoutes = require(common.basePath + '/server/routes/v1/movieRoutes');

module.exports = (app) => {
    movieRoutes(app)
};