const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const reviewRoutes = require('./routes/reviews')




// Links the environment file to be used
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

//Connects to the database
connectDB()

//Sets the path to the view folder, sets the filesize to ejs
app.set('view engine', 'ejs')
//Sets the static folder to public
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
// app.use('/todos', todoRoutes)
app.use('/reviews', reviewRoutes)

 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    