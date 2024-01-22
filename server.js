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
    host : 'dpg-cmn84hn109ks739dd23g-a',
    port: 5432,
    user : 'brainodb_v7cl_user',
    password : '0pvoOI4ZMXNHOQjIA4WQSF4r7v83FfBe',
    database : 'brainodb_v7cl'
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
