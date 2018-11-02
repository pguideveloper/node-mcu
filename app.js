const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("Teste")
})

app.listen(8080, function () {
    console.log('Example app listening on port 3000!');
});