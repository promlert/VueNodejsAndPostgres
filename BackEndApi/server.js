const express = require('express')
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
// const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();
const app = express()
var bcrypt = require("bcryptjs");
const port = process.env.PORT || 3000;
var corsOptions = {
  origin: process.env.CORS_ORIGIN || "http://localhost:8086"
};

//app.use(cors(corsOptions));
app.use(cors())
const users = require('./db.json')

const routerCar = require('./routers/cars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require("./models");
const Role = db.role;
const User = db.user;
const cars = db.cars;
// auto create db
const forceSync = process.env.DB_FORCE_SYNC === 'true';
db.sequelize.sync({ force: forceSync }).then(() => {
  console.log(forceSync ? 'Drop and Resync Db' : 'Database synced');
  if (forceSync) {
    initial();
  }
});
function initial() {
  cars.create({
    "name": "Toyota Camry",
    "price": 24000,
    "type": "Sedan"});
  cars.create({
    "name": "Honda CR-V"});
  
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "moderator"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });

  User.create({
    username : "admin",
    email:"admin@project.com",
    password: bcrypt.hashSync("1234567890", 8)
   }).then(User => {

   User.setRoles([3]);
   })

   User.create({
    "username": "mod",
    "email": "mod@test.com",
    password: bcrypt.hashSync("1234567890", 8)
   }).then(User => {

   User.setRoles([2,1]);
   })

   User.create({
    "username": "user",
  "email": "user@test.com",
    password: bcrypt.hashSync("1234567890", 8)
   }).then(User => {

   User.setRoles([1]);
   })
}

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/healthz', (req, res) => {
  res.json({ status: 'ok' })
})




app.get('/users', (req, res) => {
 
    res.json(users)
})

app.get('/users/:id', (req, res) => {
    res.json(users.find(user => user.id === Number(req.params.id)))
})


app.post('/users', (req, res) => {
  users.push(req.body)
  let json = req.body
  res.send(`Add new user '${json.username}' completed.`)
})
 
app.use('/cars', routerCar);
 // routes
require('./routers/auth.routes')(app);
require('./routers/user.routes')(app);
const swaggerFile = require('./swagger_output.json') //npm run swagger to generate the file
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
// // Swagger options definition
// const swaggerOptions = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'My API',
//       version: '1.0.0',
//       description: 'API documentation using Swagger and Express',
//     },
//     servers: [
//       {
//         url: `http://localhost:${port}`,
//       },
//     ],
//   },
//   apis: ['./routers/auth.routes.js', './routers/user.routes.js'], // Path to the API route files
// };

// const swaggerDocs = swaggerJSDoc(swaggerOptions);

// // Serve the Swagger UI at a specific route (e.g., /api-docs)
// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.listen(port, () => {
    console.log("Starting node.js at port " + port);
  });