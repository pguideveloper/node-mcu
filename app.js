const path = require('path')
const express = require('express')
const app = express()
const mqtt = require('mqtt')
const client  = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function (callback) {
    console.log(callback)
  console.log("teste")
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt from IFSPCARAGUATAUBA')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})



// const port = process.env.PORT || 8080

// app.set('views', path.join(__dirname, 'views'))
// app.set("view engine", "ejs")

// app.get("/", (req, res) => {
//     res.render("teste")
// })

// app.listen(port, function () {
//     console.log(`Example app listening on port ${port}`);
// });