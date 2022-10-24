const express = require('express')
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const app = express()
var bcrypt = require("bcryptjs");
const port = process.env.PORT || 3000;
var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
//app.use(cors())
const users = require('./db.json')

const routerCar = require('./routers/cars')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = require("./models");
const Role = db.role;
const User = db.user;
// auto create db
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});
function initial() {
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
const swaggerFile = require('./swagger_output.json')
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.listen(port, () => {
    console.log("Starting node.js at port " + port);
  });