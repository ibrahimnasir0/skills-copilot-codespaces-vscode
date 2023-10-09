//create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mysql = require('mysql');
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0000',
    database: 'test'
});
db.connect();