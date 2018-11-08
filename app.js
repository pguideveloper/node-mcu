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
var client = mqtt.connect('mqtt://m15.cloudmqtt.com', options);
client.on('connect', function() { // When connected
  console.log('Connect on cloud mqtt');
  // subscribe to a topic
  client.subscribe('action', function() {
      // when a message arrives, do something with it
      client.on('message', function(topic, message, packet) {
          console.log("Received '" + message + "' on '" + topic + "'");
      });
  });
});

const port = process.env.PORT || 8080

app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("teste")
})

app.get("/on", (req, res) => {
  // publish a message to a topic
  client.publish('action', 'on', function() {
    console.log("Message is published");
    client.end(); // Close the connection when published
  });
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});