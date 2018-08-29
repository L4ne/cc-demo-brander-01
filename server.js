const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3001;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/default'));


hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website'
  });
});

app.get('/css/global.css', (req, res) => {
  res.setHeader('Content-Type', 'text/css');
  res.render('global.hbs',
   {
    ccdemo_Id:                  '00000001',
    ccdemo_name:                'Northern Trail Outfitters',
    ccdemo_colour_grey1:        '#f9f9f9',
    ccdemo_colour_grey2:        '#eeeeee',
    ccdemo_colour_grey3:        '#cccccc',
    ccdemo_colour_grey4:        '#999999',
    ccdemo_colour_grey5:        '#666666',
    ccdemo_colour_grey6:        '#444444',
    ccdemo_colour_grey7:        '#222222',
    ccdemo_colour_greytrans1:   'rgba(0,0,0,0.65)',
    ccdemo_colour_greytrans2:   'rgba(0,0,0,0.25)',
    ccdemo_colour_brandold:     '#59ba00',
    ccdemo_colour_brandnew:     '#00a1e0',
    ccdemo_colour_brandnewdark: '#0070d2',
    ccdemo_colour_success:      '#008827',
    ccdemo_colour_warning:      '#ffb75d',
    ccdemo_colour_danger:       '#cc0000',
    
    pageTitle: 'Home Page',
    welcomeMessage: '#ffcc33',
    siteId: req.query.siteid
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
