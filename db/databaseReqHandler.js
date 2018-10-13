const mysql = require('mysql');

const sql = mysql.createConnection({
    user: 'root',
    password: 'root',
    database: 'newDatabase'
});

sql.connect((err) => {
    if (err) throw err;
    console.log('CONNECTED!');
});

exports.insertUser = (username) => {
    let query = `INSERT INTO Users(name) VALUES('${username}')`;
    return new Promise((resolve, reject) => {
      sql.query(query, (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
}

exports.getUsers = () => {
    return new Promise((resolve, reject) => {
      sql.query(`SELECT * from Users`, (err, result, fields) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
}