const path = require('path')
const express = require('express')
const app = express()
const mqtt = require('mqtt')

var options = {
  port: 12131,
  host: 'mqtt://m15.cloudmqtt.com',
  clientId: 'mqttjs_' + Math.random().toString(16).substr(2, 8),
  username: 'woittipk',
  password: 'TTa4plzNwzBE',
  keepalive: 60,
  reconnectPeriod: 1000,
  clean: true,
  encoding: 'utf8'
};

const port = process.env.PORT || 8080



app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("teste")
})

app.get("/on", (req, res) => {

  var client = mqtt.connect('mqtt://m15.cloudmqtt.com', options)

  client.on('connect', function() { // When connected

    console.log('connected');

    client.publish('message', 'IFSP teste', function() {
      console.log("Message is published");
      client.end(); // Close the connection when published
    });
    
    res.redirect("/")
  });
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});