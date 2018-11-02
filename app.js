const path = require('path')
const express = require('express')
const app = express()


app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("teste")
})

var port = process.env.PORT || 8080

app.listen(port, function () {
    console.log(`Example app listening on port ${port}`);
});