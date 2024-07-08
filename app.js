const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const connectDB = require('./src/config/db');
const userRoutes = require('./src/routes/userRoutes');
const productRoutes = require('./src/routes/productRoutes');
require('dotenv').config();

const PORT = 3000;
const app = express();

connectDB();

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'views'));
app.use('/public', express.static(path.join(__dirname , 'src', 'public')));

app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
  
app.use('/auth', userRoutes);
app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.listen(PORT, () => {
    console.log("App Running");
});