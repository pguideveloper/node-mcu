var mqtt = require('mqtt');
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
    console.log('connected');
    // subscribe to a topic
    client.subscribe('message', function() {
        // when a message arrives, do something with it
        client.on('message', function(topic, message, packet) {
            console.log("Received '" + message + "' on '" + topic + "'");
        });
    });

    // publish a message to a topic
    client.publish('message', 'IFSP testecle', function() {
        console.log("Message is published");
        client.end(); // Close the connection when published
    });
});