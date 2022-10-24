const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger_output.json'
const endpointsFiles = ['./server.js'] // default index.js
const doc={
  "host": "localhost:3001",
  "basePath": "/",
  "schemes": [
    "http"
  ]
}
swaggerAutogen(outputFile, endpointsFiles,doc)