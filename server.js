const express = require("express")
const app = express()
app.set('view engine', 'ejs')


app.use(express.static('public'));
app.use(express.static('audiomedia'))
const homeRouter = require('./routes/homeroutes')
app.use('/', homeRouter)

app.listen(3000)