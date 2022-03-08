var mysql = require('mysql');


var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_new_password',
    database: 'music_sec'
});


con.connect(function(error) {
    if(!!error) {
        console.log('Error');
    }else{
        console.log('Connected');
        
    }
});


var sql = "CREATE TABLE IF NOT EXISTS Users (ID INT NOT NULL AUTO_INCREMENT, username VARCHAR(255) NOT NULL, pass VARCHAR(255) NOT NULL, admin BOOLEAN, PRIMARY KEY (ID));";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Users table created with success.");
    });

var sql = "CREATE TABLE IF NOT EXISTS Albums (ID INT NOT NULL AUTO_INCREMENT, title VARCHAR(255) NOT NULL, artist VARCHAR(255) NOT NULL, genre VARCHAR(255) NOT NULL, PRIMARY KEY (ID));";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Albums table created with success.");
    });

var sql = "CREATE TABLE IF NOT EXISTS Reviews (ID INT NOT NULL AUTO_INCREMENT, userID INT NOT NULL, albumID INT NOT NULL, title VARCHAR(1024) NOT NULL, review VARCHAR(1024) NOT NULL, PRIMARY KEY (ID), FOREIGN KEY(userID) REFERENCES Users(ID), FOREIGN KEY(albumID) REFERENCES Albums(ID));";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Reviews table created with success.");
    });
     
var sql = "INSERT INTO Users (username,pass,admin) values('admin','$2a$10$HjawWY30zt4GQS2ly2xRuOwsou2lihBIuvZEL/1QEyw4EMM6Qk1R2',true);";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Users table.");
    });

var sql = "INSERT INTO Users (username,pass,admin) values('George','$2a$10$.S7vvSYXnHToLDr8QgRzzuSqsrE4hmt0X3m1EIveUunbpv0BBKo1m',false);";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Users table.");
    });

var sql = "INSERT INTO Users (username,pass,admin) values('David','$2a$10$eNxK5Hfz/3CWI2K51UHYDuJ6kh/r2.6rgD/ajsUdtXNUczJM0CM2W',false);";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Users table.");
    });

var sql = "INSERT INTO Albums (title,artist,genre) values('Graduation','Kanye West','Hip Hop');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Albums table.");
    });

var sql = "INSERT INTO Albums (title,artist,genre) values('O Mundo Ao Contrário','Xutos & Pontapés','Rock');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Albums table.");
    });

var sql = "INSERT INTO Albums (title,artist,genre) values('The Dark Side of the Moon','Pink Floyd','Rock');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Albums table.");
    });

var sql = "INSERT INTO Albums (title,artist,genre) values('Songs For Young Lovers','Frank Sinatra','Jazz');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Albums table.");
    });

var sql = "INSERT INTO Albums (title,artist,genre) values('Blonde','Frank Ocean','R&B');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Albums table.");
    });

var sql = "INSERT INTO Albums (title,artist,genre) values('Somewhere in Time','Iron Maiden','Heavy Metal');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Albums table.");
    });

var sql = "INSERT INTO Albums (title,artist,genre) values('Bad','Michael Jackson','Pop');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Albums table.");
    });
var sql = "INSERT INTO Albums (title,artist,genre) values('Paranoid','Black Sabbath','Heavy Metal');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Albums table.");
    });

var sql = "INSERT INTO Albums (title,artist,genre) values('Arrival','ABBA','Pop');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Albums table.");
    });

var sql = "INSERT INTO Albums (title,artist,genre) values('First Impressions Of Earth','The Strokes','Indie Rock');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Albums table.");
    });

var sql = "INSERT INTO Reviews (userID,albumID,title,review) values(2,1,'Rating','10/10');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Reviews table.");
    });

var sql = "INSERT INTO Reviews (userID,albumID,title,review) values(2,7,'My Review','The 2nd track is a masterpiece!');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Reviews table.");
    });

var sql = "INSERT INTO Reviews (userID,albumID,title,review) values(3,2,'Loving the album','This type of music is timeless.');";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted  with success in Reviews table.");
      process.exit(1); //!!!!!!!!!!!
    });

    // ALTER TABLE `Albums` ADD COLUMN `id` INT AUTO_INCREMENT UNIQUE FIRST;