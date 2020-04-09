const { countries, languages } = require('countries-list');

const routes = app => {
    app.get('/', (request, response) => {
        response.send('Hola');
    });

    app.get('/info', (request, response) => {
        response.send('Info');
    });

    app.get('/country', (request, response) => {
        console.log('request.query: ', request.query);
        response.json(countries[request.query.code]);
    });

    app.get('/languages/:lang', (request, response) => {
        console.log('request.params: ', request.params);
        const lang = languages[request.params.lang];
        if (lang) {
            response.json({ status: "Ok", data: lang });
        } else {
            response.status(404).json({
                status: 'NOT_FOUND ',
                message: 'Language' +
                    request.params.lang + ' Not Found'
            });
        }
    });

    app.get('*', (request, response) => {
        response.status(404).send('Error 404 Pagina no encontrada');
    });
};


module.exports.routes = routes;