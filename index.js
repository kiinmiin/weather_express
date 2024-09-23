const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

const key = 'd9d9aceeb82d442e82280102242309';
let city = 'Tallinn'

app.get('/', function (req, res) {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&agi=no`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        let condition = data.current.condition.text
        let city = data.location.name
        let temp = data.current.temp_c
        res.render('index', {
            condition: condition,
            city: city,
            temp: temp
        })
    })
})

app.post('/', function(req, res) {
    let city = req.body.cityname
    fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&agi=no`)
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        let condition = data.current.condition.text
        let city = data.location.name
        let temp = data.current.temp_c
        res.render('index', {
            condition: condition,
            city: city,
            temp: temp
        })
    })
})

app.listen(3000)