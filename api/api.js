var express = require('express')
var app = express()
var cors = require('cors')
var fs = require('fs')
var path = require('path')

const ABSENCES_PATH = path.join(__dirname, 'json_files', 'absences.json');
const MEMBERS_PATH = path.join(__dirname, 'json_files', 'members.json');

var members = fs.readFileSync(MEMBERS_PATH, 'utf8')
var absences = fs.readFileSync(ABSENCES_PATH, 'utf8')

app.use(cors())
app.get('/api/v1/members', (req, res) => { res.send(JSON.parse(members)) })
app.get('/api/v1/absences', (req, res) => { res.send(JSON.parse(absences)) })

var server = app.listen(8000, '0.0.0.0', function () {})
