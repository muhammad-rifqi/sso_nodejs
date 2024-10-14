require('dotenv').config();
const express = require('express');
const apps = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const port = process.env.PORT;
const path = require('path');
const cookieParser = require("cookie-parser");
const db = require('./db/query');

apps.use(cookieParser());
apps.use(bodyParser.json())
apps.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
apps.use(cors());
apps.use(express.static('public'));

apps.get('/', (req, res) => {
    res.status(200).json({ "success": true })
})

apps.get('/login', (req, res) => {
    res.sendFile(path.resolve('./views/login.html'));
})

apps.get('/register', (req, res) => {
    res.sendFile(path.resolve('./views/register.html'));
})


apps.post('/insertusers', db.user_register);

apps.post('/act_login', db.do_login);

apps.get("/logout", db.do_logout);

apps.listen(3005);