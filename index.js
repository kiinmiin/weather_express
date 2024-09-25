const express = require('express')
const app = express()
const path = require('path')
const fetch = require('node-fetch')

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({extended : true}))

const key = 'd9d9aceeb82d442e82280102242309'
city = 'Tallinn'

const getWeatherDataPromise = (url) => {
    return new Promise((resolve, reject) => {
        fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            let condition = data.current.condition.text
            let city = data.location.name
            let temp = data.current.temp_c
            let result = {
                condition: condition,
                city: city,
                temp: temp,
                error: null
            }
            resolve(result) 
        })
        .catch(error => {
            reject(error)
        })
    })
} 

app.all('/', function (req, res) {
    let city
    if(req.method == 'GET'){
        city = 'Dorpat'
    }
    if (req.method == 'POST') {
        city = req.body.cityname
    }
    let url = `http://api.weatherapi.com/v1/current.json?key=${key}&q=${city}&agi=no`
    getWeatherDataPromise(url)
    .then(data => {
        res.render('index', data)
    })
    .catch(error => {
        res.render('index', {error: 'Problem with getting data, try again'})
    }) 
})


app.listen(3000)