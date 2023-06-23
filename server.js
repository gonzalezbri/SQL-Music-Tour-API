// DEPENDENCIES
const express = require('express')
const { Sequelize } = require('sequelize')

//Controllers
const bandsController = require('./controllers/bands_controller');
const eventsController = require('./controllers/events_controller');
const stagesController = require('./controllers/stages_controller');

const app = express()

// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//controller setup

app.use('/bands',bandsController);
app.use('./events',eventsController);
app.use('./stages',stagesController);


// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
})

