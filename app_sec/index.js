const express = require('express');

require('dotenv').config();
bcrypt = require('bcrypt')
const saltRounds = 10;

const app = express();
var session = require('express-session');
var cors = require('cors')
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({ resave: true ,
                  secret: process.env.SESSION_SECRET,
                  saveUninitialized: true}));
var mysql = require('mysql');
app.use(cors())
var connection = mysql.createConnection({
    host:  process.env.DBHOST,
    user:  process.env.DBUSER,
    password: process.env.DBPASS,
    database: 'music_sec'
});

app.set("view engine","jade");

connection.connect(function(error) {
    if(error) {
        console.log('Error on connection');
    }else{
        console.log('Connected');
    }
    
});


app.get('/', (req ,res ) => {
    var dataU;
    var dataA;
    connection.query("SELECT COUNT(*) as count FROM Users;" ,function(err,result,fields){  // get userid
        if (err) {

            throw err;
        }
        else {
            dataU = result[0].count;

            connection.query("SELECT COUNT(*) as count FROM Albums;" ,function(err,result,fields){  // get userid
                if (err) {

                    throw err;
                }
                else {
                    dataA = result[0].count;
                    res.render('root' , {dataA  , dataU });
                }
            })
        }
    })
   
})

app.post('/auth/', function(request, response) {
    
  var username = request.body.username;
	var pass = request.body.password;

  
	if (username && pass) {

		connection.query('SELECT pass FROM Users WHERE username = ?',username, function(error, results, fields) {
			if (results.length > 0) {
        bcrypt.compare(request.body.password, results[0].pass, function(err, result) {
          
            if (result)
            {
              request.session.loggedin = true;
              request.session.username = username;
              response.redirect(`/home/${username}`);
            }
            else {
              response.send('Incorrect Username and/or Password!');
            }	
        });
			}
      else {
        response.send('Incorrect Username and/or Password!');
      }	
     		
		});
	} 
  
  else {
		response.send('Please enter Username and Password!');
		response.end();
	}

});

app.get('/auth', function(request, response) {  

    response.render('login');

});

app.post('/auth/changepw', function(request, response) {  

  // still need to bcrypt it
  
        if(request.session.username){
          // check for the previous password 

          connection.query("SELECT pass FROM Users WHERE username = ?;" ,request.session.username ,function(err,result,fields){  // get userid
            if (err) {
                throw err;
            }
            else {
              bcrypt.compare(request.body.oldpassword, result[0].pass, function(err, result) {

                if(result) // old password is correct
                {
                        if (request.body.confirmpassword==request.body.newpassword)
                        {
                          if(CheckPassword(request.body.newpassword))
                          {
                              bcrypt.hash(request.body.confirmpassword, saltRounds, function(err, hash) {
                                if(hash){
                                connection.query("UPDATE Users SET pass = ? WHERE username = ?;" ,[hash,request.session.username] ,function(err,result,fields){  // get userid
                                  if (err) {
                                      throw err;
                                  }
                                  else {
                                    //  response.send("Change was a success!!")
                                      response.render('changesucc')
                                  }
                              })
                            }
                            else{
                              response.send('error')
                            }
                              })
                          }
                          else{
                              response.send('Password must be between 6 and 20 characters, must contain atleast one number and one UpperCase letter. ')
                          }

                        }
                        else {
                          response.send("Passwords dont match!!")
                        }
                }
                else  
                {
                  response.send("Incorrect current Password")
                }
              })
            }
        })

    }

    else // if session expired
    {
        response.redirect('/auth')
    }
   

});

app.get('/auth/changepw', function(request, response) {  
    response.render('changepw')
})


app.get('/commentAdded', function(request, response) {  

    response.render('commentsuccess');

});

app.get('/regSucess', function(request, response) {  
    // just a simple page to confirm to the user he was able to register.
    //if register was not sucefull user will get redirected to / page
    response.render('regSucess');

});
app.post('/add_comment/:id', function(request, response) {  
    $id = request.params.id;
    
    if(request.session.username)
    {

    var username = request.session.username;


    connection.query("SELECT ID FROM Users WHERE username = ?;" ,username , function(err,result,fields){  // get userid
        if (err) {
            //response.redirect('/');
            throw err;
        }
        else {
            var userid = result[0].ID;
            connection.query("INSERT INTO Reviews (userID,albumID,title,review) values(?,?,?,?);" ,[userid ,request.params.id, request.body.title ,request.body.comment] ,function(err,result,fields){  // get userid
                if (err) {
                    throw err;
                }
                else {
                    console.log('1 review added');
                    response.redirect(`/shop/${request.params.id}`);
                    
          
                }
            })
        }
    })


    }

    else // user not logged in 
    {
        response.redirect('/auth'); // redirect to please login page
    }


});

app.post('/add_album', function(request, response) {  

    var title = request.body.title;
    var artist =request.body.artist;
    var genre =request.body.genre;


    // admin check

    if(request.session.username) // are we logged in to any acc ? 
    {
        var username = request.session.username;
        connection.query( "SELECT admin FROM Users WHERE username = ?;" , username,function(err, result, fields){
            if (err) {    
                onsole.log('here');
                throw err;
           }
            else {
                console.log(result[0].admin);

                if (result[0].admin) // are we admin ? 
                {
                connection.query( "INSERT INTO Albums (title,artist,genre) values(?,?,?);" , [title, artist,genre],function(err, result, fields){
                    if (err) {
                        throw err;
                   }
                    else {
                        console.log("1 record inserted  with success in Albums table.");
                        response.redirect('/shop');
                    }
                });
            }

            else{
                response.send('logged in but not admin status');
            }
                
            }
        });
    }

    else{
        response.send('You session expired, please log in again');
    }
    
});

app.post('/reg', function(request, response) {  


    var username = request.body.username;
    var password =request.body.password;

    if (username && password) {
    if(!CheckPassword(password))
    {
      response.send('Password must be between 6 and 20 characters, must contain atleast one number and one UpperCase letter. ')
    }
    // hash the password
    else 
    {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      // Store hash in your password DB.
      if(hash)
       {
          connection.query( "INSERT INTO Users (username,pass,admin) VALUES (?,?,false)" , [username, hash],function(err, result, fields){
            if (err) {      // not admin by befault
                response.redirect('/');
                throw err;
          }
            else {
                console.log("1 record inserted  with success in Users table.");
                response.redirect('/regSucess');
            }
        });
       }
       else {
        throw err;
       }


    });

    }
  }
});


app.get('/reg', function(request, response) {

    response.render('reg');
})

app.get('/home/:user', function(request, response) {
    var username = request.session.username;
    connection.query("SELECT * FROM Users WHERE username = ?",username, function(err, result, fields){
        console.log(result);
    $user = request.session.username;
	response.render('home',{user : result});
    })
});

// testing purposes - display all albums from db in a rudumentar pug "interface" 
app.get('/shop',function(req, res) {
    connection.query("SELECT * FROM Albums", function(err, result, fields){
        
        if(err) console.log('Error in the query');
        else {
            console.log(result);
            res.render('newshop',{albums : result});
        }
    });
});
//
app.get('/cart',function(req, res) {
   
            res.render('cart');
});
//




//detailed view of an item


app.get('/shop/:id',function(req, res) {
    $id = req.params.id;
    //
    connection.query("SELECT * FROM Albums WHERE ID =?;" , req.params.id, function(err, result, fields){
      
        if(err) console.log('Error in the query');
        else {

            album =result  //TODO do join query instead
            connection.query("SELECT * FROM Reviews WHERE albumID = ?;",req.params.id, function(err, result, fields){
                
                if(err) console.log('Error in the query');
                else {      
                    reviews=result
                    res.render('newdetailed',{albums : album , reviews : reviews});
                    
                }
            });



        }
    });
});

app.get('/search', function(req,res) {

    connection.query(`SELECT * FROM Albums WHERE title LIKE "%${req.query.query}%";`, function(err, result, fields){
        if(err){ console.log('Error in the query');
                    res.send("No matches")}       
        else {             
                    albums=result;
                    res.render('search',{searched: req.query.query, albums : albums});
                    
        }
    });

    

})

function CheckPassword(input) 
{ 
  var check = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  return(input.match(check)) 

}


const port = process.env.PORT 
app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`);
})
