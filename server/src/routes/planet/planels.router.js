const express = require('express')
const planets = express.Router();

const {getPlanets} = require('./planels.controller')

planets.get('/',getPlanets)
module.exports ={
    planets
}