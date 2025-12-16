const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["./server.js"]; // default index.js
const doc = {
  host: "localhost:3000",
  basePath: "/",
  schemes: ["http"],
  // Define JWT as a security scheme in the generated spec
  components: {
    securitySchemes: {
      AccessTokenAuth: {
        type: "apiKey",
        in: "header",
        name: "x-access-token",
      },
    },
  },
};
swaggerAutogen(outputFile, endpointsFiles, doc);
