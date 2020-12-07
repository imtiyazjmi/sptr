const common = require('../../../common');
const movie = require(common.basePath + '/server/controllers/v1/movie/movieController');

module.exports = (app) => {
    app.get('/v1/movies', movie.get);
    app.post('/v1/movie', movie.post);
    app.post('/v1/movies', movie.bulkInsert);

    app.all('/v1/movie/:?', (req, res) =>
        res.status(405).send({ message: 'Method Not Allowed' }));
};
