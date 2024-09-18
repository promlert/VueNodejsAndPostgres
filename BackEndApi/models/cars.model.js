module.exports = (sequelize, Sequelize) => {
    const Cars = sequelize.define("cars", {
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(10, 2)
      }
    });
  
    return Cars;
  };