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

var client = mqtt.connect('mqtt://m15.cloudmqtt.com', options)

app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("teste")
})

app.get("/on", (req, res) => {
  client.on('connect', function() { // When connected
    console.log('connected');
    // subscribe to a topic
    client.subscribe('message', function() {
        // when a message arrives, do something with it
        client.on('message', function(topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'")
        });

        // publish a message to a topic
        client.publish('message', 'IFSP teste', function() {
            console.log("Message is published");
            client.end(); // Close the connection when published
        });
    });    

    res.send("Sucesso TURMINHA!")
  });
})

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});