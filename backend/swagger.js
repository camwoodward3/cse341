const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'API for managing contacts with firstName, lastName, email, favoriteColor, and birthday.',
    version: '1.0.0'
  },
  host: 'localhost:8080',
  schemes: ['http', 'https'],
  definitions: {
    Contact: {
      firstName: "Desirre",
      lastName: "Holman",
      email: "des@example.com",
      favoriteColor: "Black",
      birthday: "2007-06-12"
    }
  }
};

const outputFile = `./swagger.json`;
const endpointsFiles = ['./routes/contacts.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);