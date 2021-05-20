let mysql = require('mysql');
let config = require('./config.js');
var data;
let connection = mysql.createConnection(config);

let sql = `SELECT * FROM waters`;
connection.query(sql, (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  }
  console.log(results);
  data = results;
});

connection.end(); 

console.log("Test to see if the results are still valid... " + data);

function get_data() {
    return data;
}

