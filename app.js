const express = require('express'),
          app = express(),
          pgp = require('pg-promise')(),
          bdParser = require ('body-parser'),
          method = require('method-override'),
          mustacheExpress = require('mustache-express'),
          fetch = require('node-fetch'),
          PORT = process.env.PORT || 3000;


//configuration---
  app.engine('html', mustacheExpress());
  app.set('view engine', 'html');
  app.set('views', __dirname + '/views');
  app.use('/', express.static(__dirname + '/public'));
  app.use(bdParser.urlencoded({extended:false}));
  app.use(bdParser.json());
  app.use(method('_method'));

  var db = pgp(process.env.DATABASE_URL  ||  'postgres://student_14@localhost:5432/drinks');

  var info;
  app.post('/test', function(req,res){
    info = 'http://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + req.body.data;
  });

  var name;
  var url;
  var ing1;
  var ing2;
  var ing3;
  var mes1;
  var mes2;
  var mes3;
  var ins;
  app.post('/testi',function(req,res){

    name = req.body.name;
    url = req.body.data;
    ing1 = req.body.ing1;
    ing2 = req.body.ing2;
    ing3 = req.body.ing3;
    mes1 = req.body.mes1;
    mes2 = req.body.mes2;
    mes3 = req.body.mes3;
    ins =req.body.ins;

    db.none('INSERT INTO drinks (drink_name, image, instructions, ing1, ing2, ing3, mes1, mes2, mes3) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
      [name, url, ins, ing1,ing2,ing3, mes1,mes2,mes3]);

  })

  //delete function
  var del;
  app.post('/testip', function(req,res){
    del = req.body.data;
    db.none("DELETE FROM favorites WHERE image = $1", [del]);
    db.none("DELETE FROM drinks WHERE image = $1", [del]);
  });

  var name2;
  var url2;
  var ing12;
  var ing22
  var ing32;
  var mes12;
  var mes22;
  var mes32;
  var ins2;
  var id;
  app.post('/testips', function(req,res){

    name2 = req.body.name;
    url2 = req.body.image;
    ing12 = req.body.ing1;
    ing22 = req.body.ing2;
    ing32 = req.body.ing3;
    mes12 = req.body.mes1;
    mes22 = req.body.mes2;
    mes32 = req.body.mes3;
    ins2 =req.body.ins;
    id = req.body.id;

    db.none('INSERT INTO favorites (drink_name, image, instructions, ing1, ing2, ing3, mes1, mes2, mes3, drinks_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9,$10)',[name2, url2,ins2, ing12, ing22, ing32,mes12,mes22,mes32,id]);
  });

  // app.get('/', function(req,res){
  //   res.render('index');
  // })

//load random drinks from API,  uses  user's  input to add url from API
var on = false;
app.get('/', function(req,res){

     if (on === true){

      fetch(info)
      .then(function(data){
        return data.json()
      })
      .then(function(data){
        res.render('index', {
          data: data.drinks
        });
      });

    }

    if (on === false){

      fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(function(data){
        return data.json()
      })
      .then(function(data){
        res.render('index', {
          data: data.drinks
        });
      });
      on = true;
    }

    else{

      fetch(info)
      .then(function(data){
        return data.json()
      })
      .then(function(data){
        res.render('index', {
          data: data.drinks
        });
      });

      // fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php')
      // .then(function(data){
      //   return data.json()
      // })
      // .then(function(data){
      //   res.render('index', {
      //     data: data.drinks
      //   });
      // });

    }

});


// favorites page
app.get('/favorites',function(req,res){
  db.any('SELECT * FROM drinks')
  .then(function(data){
    var drinks = {'drinks': data};
    res.render('favorites', drinks);
    on = false;
  })

})


// Sign In/ Sign UP --- classwork
app.get('/signIn',function(req,res){
  res.render('signIn')
})
app.post('/signIn',function(req, res){
  user = req.body

  db.none('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)',
    [user.name,user.email,user.password])

  res.render('signIn')
});



app.listen(PORT, function() {
  console.log('Node app is running on', PORT);
});
