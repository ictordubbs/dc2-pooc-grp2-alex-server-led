const express = require('express')
const app = express ()
const port = 3000


const os = require("os");
const mustacheExpress = require('mustache-express');

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use(express.static('public'))

app.get('/on', (request, response) => {
const Gpio = require('onoff').Gpio;
const sleep = require('sleep');

const led = new Gpio(17, 'out');

console.log('Led On');

led.writeSync(1);

response.render('on');
})
app.get('/off', (request, response) => {
const Gpio = require('onoff').Gpio;
const sleep = require('sleep');

const led = new Gpio(17, 'out');

console.log('Led Off');

led.writeSync(0);


response.render('off');
})
  
app.listen(port, (err) => {
    if (err) {
      return console.log('Erreur du serveur : ', err)
    }
    console.log('Le serveur écoute sur le port '+port+'\nRendez vous sur http://'+os.hostname()+'.local:'+port);})

process.on('SIGINT', () => {
  led.unexport();
});
