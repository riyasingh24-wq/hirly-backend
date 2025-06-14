

const options = {
      definition: {
        openapi: '3.0.0',
        info: { title: 'API', version: '1.0.0' },
        servers: [{ url: 'http://localhost:3000' }],
      },
      apis: ['./src/routes/*.js'], // Correct path for detecting route files
    };
    
    export default options;