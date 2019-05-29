var express = require('express');
var twig = require('twig');
var app = express();

app.use(express.static(__dirname+'/views/assets'));
app.set('view engine','twig');

BMI=[];
/*app.use(express.cookieParser())
app.use(express.session({secret: 'BMI'}))
.use(express.bodyParser());*/

/*app.use(function(req, res, next){
if (typeof(req.session.BMI) == 'undefined') {
req.session.BMI = [];
} next();
})*/

app.get('/acceuil', function(req, res) {
res.render('acceuil.html.twig');
})

.use(function(req, res, next){
res.redirect('/acceuil');
})
.listen(8080);