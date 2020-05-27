import express from 'express';
import cors from 'cors'
import routes from './routes'
// const express = require('express');
// const cors = require('cors')
// const routes = require('./routes')

const app = express()

const dotenv = require('dotenv');
dotenv.config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/api', routes)

app.use('/', (req,res) => {
  console.log('API ready...');
  res.send('API ready')
})

app.listen(process.env.PORT || 3000, function() {
  console.log('Express app started on port ' + process.env.PORT || 3000);
});
