var mysql = require('mysql');

var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_new_password',
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    con.query("CREATE DATABASE music", function (err, result) {
      if (err) throw err;
      console.log("Database created");
      process.exit(1);
    });
});