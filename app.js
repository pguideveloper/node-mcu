const express = require('express')
const app = express()

app.get("/", (req, res) => {
    res.send("Teste")
})

var port = process.env.PORT || 8080

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});