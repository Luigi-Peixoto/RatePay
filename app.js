const express = require('express')
const path = require('path')
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const jwt = require('jsonwebtoken')

const PORT = 3000;
const app = express()

connectDB();

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/auth', userRoutes);

app.listen(PORT, () => {
    console.log("App Running")
})