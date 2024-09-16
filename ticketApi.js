const express = require('express');
const morgan = require('morgan');
const {connectToMongoDb}=require('./connection');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const Ticket = require('./models/ticket');
const bodyParser = require('body-parser');
const cors = require('cors');
const moment = require('moment');
const router = require('./routes/ticket');

const app = express();
const port = 3000;

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'LOGS', 'access.log'), {
    flags: 'a'
});

app.use(morgan(':remote-addr - :remote-user :method :url :status :date[web] :response-time ms ', { stream: accessLogStream }));

connectToMongoDb('mongodb://localhost:27017/allTickets');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send("TICKET API");
});

app.use('/ticket',router);

app.listen(port, () => {
    console.log(`Server is running on port http://192.168.1.7:${port}`);
});
