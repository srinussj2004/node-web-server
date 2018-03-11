const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now} : ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (error) => {
    console.log('not able to append the server logs');
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintaince.hbs');
// });

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) =>{
  //res.send('<h1>Hello Express</h1>');
  res.render('home.hbs',{
    pageTitle: 'This is my Home Page',
    pageHeader: 'This is my node express practice Page',
    pageContent: 'Welcome to My first Express hbs Example on Home Page'
  });
  // res.send({
  //   name: 'Sreenivas',
  //   state: 'Telangana',
  //   like: ['politics', ' business', 'career', 'life']
  // });
});

app.get('/about', (req,res) =>{
  //res.send('About Page !');
  res.render('about.hbs',{
    pageTitle: 'This is my About Page',
    pageHeader: 'This is my node express practice Page',
    pageContent: 'Welcome to My first Express hbs Example'
  });
});

app.get('/projects', (req,res) =>{
  //res.send('About Page !');
  res.render('projects.hbs',{
    pageTitle: 'This is my Projects Page',
    pageHeader: 'This is my node express Projects Page',
    pageContent: 'Welcome to My Heroku Projects page'
  });
});

app.get('/bad', (req,res) =>{
  res.send({
    errorMessage: 'Not able to llaod the page',
    errorCode: 404,
    errorDescription: 'Not able to find the requestesd resource'
});
});

app.listen(port, () => {
  console.log(`Server is up and running on the port numner ${port}`);
});
