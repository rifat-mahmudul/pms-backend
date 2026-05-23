import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',

    info: {
      title: 'MPMS API',
      version: '1.0.0',
      description: 'Minimal Project Management System API',
    },

    servers: [
      {
        url: 'http://localhost:5000/api/v1',
      },
    ],
  },

  apis: ['./src/app/modules/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;