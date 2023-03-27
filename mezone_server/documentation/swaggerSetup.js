const swaggerJsDoc = require('swagger-jsdoc');

const apiBaseUrl = 'http://localhost:3030';
const options = {
  apis: ['./documentation/doc.yaml'],
  definition: {
    swagger: '2.0',
    info: {
      title: 'Live Auctions API',
      version: '1.0.0',
      desciption: 'REST api for conducting live auctions.',
      host: apiBaseUrl,
      basePath: '/',
      consumes: 'application/json',
      produces: 'application/json',
    },
  },
  server: [
    {
      url: apiBaseUrl,
    },
  ],
};

const spec = swaggerJsDoc(options);
module.exports = spec;
