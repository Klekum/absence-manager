var express = require('express')
var app = express()
var cors = require('cors')
var fs = require('fs')
var path = require('path')

const ABSENCES_PATH = path.join(__dirname, 'json_files', 'absences.json');
const MEMBERS_PATH = path.join(__dirname, 'json_files', 'members.json');

const readJsonFile = (path) => new Promise((resolve) => fs.readFile(path, 'utf8', (_, data) => resolve(data)))
  .then((data) => JSON.parse(data))
  .then((data) => data.payload);

const members = () => readJsonFile(MEMBERS_PATH);
const absences = () => readJsonFile(ABSENCES_PATH);


app.get('/api/v1/members.json', (req, res) => { res.send(members()) })
app.get('/api/v1/absences.json', (req, res) => { res.send(absences()) })

var server = app.listen(8000, '0.0.0.0', function () {})
