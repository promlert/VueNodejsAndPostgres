const db = require('../db');


async function getAll() {
   
    const rows = await db.query(
      'SELECT * FROM cars ' );
  //  const data = helper.emptyOrRows(rows);
   
    return {
        rows
    }
  }
  async function get(req) {
   
    console.info(req);
    const rows = await db.query(
      'SELECT * FROM cars where id=$1',[req.id ]);
  //  const data = helper.emptyOrRows(rows);
   
    return {
        rows
    }
  }
async function create(cars)
{
    console.info(cars)
    const result = await db.query(
        'INSERT INTO cars (name, price) VALUES($1, $2) RETURNING *',
        [cars.name, cars.price]
      );
      let message = 'Error in creating cars';
    
      if (result.length) {
        message = 'Car created successfully';
      }
    
      return {message};
}
async function update(cars)
{
    console.info(cars)
    const result = await db.query(
        'update cars set name=$2 , price=$3 where id=$1 RETURNING *',
        [cars.id,cars.name, cars.price]
      );
      let message = 'Error in update cars';
    
      if (result.length) {
        message = 'Car update successfully';
      }
    
      return {message};
}
async function delecar (req) {
   
    console.info(req);
    const rows = await db.query(
      'delete from cars where id=$1',[req.id ]);
  //  const data = helper.emptyOrRows(rows);
  console.log('User deleted');
    return {
        rows
    }
  }
  async function getByName(req) {
   
    console.info(req);
    const rows = await db.query(
      'SELECT * FROM cars where name = $1',[req.name ]);
  //  const data = helper.emptyOrRows(rows);
   
    return {
        rows
    }
  }

  module.exports = {
    getAll,
    get,
    create,
    update,
    delecar,
    getByName 
  }