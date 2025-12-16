const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
    
  app.get("/api/test/all" // #swagger.tags = ['Api']
      , controller.allAccess);
   
  app.get(
    "/api/test/user" // #swagger.tags = ['Api']
    ,[authJwt.verifyToken],
    controller.userBoard
  );
   
  app.get(
    "/api/test/mod" // #swagger.tags = ['Api']
    ,[authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );
    
  app.get(
    "/api/test/admin" // #swagger.tags = ['Api']
    ,[authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );
};