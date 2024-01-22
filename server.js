const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const profile = require('./Controllers/profile');
const image = require ('./Controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DB_HOST,
    port: 5432,
    user : process.env.DB_USER,
    password : process.env.DB_PW,
    database : process.env.DB_NAME
  }
});

const app = express();

app.use(cors())
app.use(express.json()); 

app.post('/signin', signin.handleSignin(db, bcrypt))//dependcy injection
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) }) 
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db,) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res,) }) 

app.listen(process.env.PORT || 3001, ()=> {
  console.log(`pp is running on port ${process.env.PORT}`);
})
