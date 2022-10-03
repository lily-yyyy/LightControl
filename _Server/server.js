const express = require('express');
const app = express();
const mongoose = require('mongoose');
const socket = require('socket.io');
const server = app.listen(3000);
const jwt = require('jsonwebtoken');
const Apartment = require('./models/apartment');
const Client = require('./models/client');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

// Variables for user login, for sockets
let user;
let apartment;
let apartmentID
let image;

let token;
let io = socket(server);
var options = {index: "operator.html"}

mongoose.connect("mongodb+srv://lily:12345@controllight.mbpeuwv.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true  });

app.use('/', express.static('../client', options));
app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({limit: '25mb'}));

app.post('/api/addApartment', async (req, res) => {
    const {apartmentID, image, lightOne, lightTwo, lightThree} = req.body;
    try {
        const response = await Apartment.create({
            apartmentID,
            image,
            lightOne,
            lightTwo,
            lightThree
        });
    } catch (error) {
        throw error;
    }
    res.json({status: "ok"})
});

app.post('/api/addPerson', async (req, res) => {
    const {clientID, apartmentID, firstname, lastname, username, phone} = req.body;
    try {
        const response = await Client.create({
            clientID,
            apartmentID,
            firstname,
            lastname,
            username,
            phone
        });
    } catch (error) {
        throw error;
    }
    res.json({status: "ok"})
});

app.post('/api/updateApartment', async (req, res) => {
    const {apartmentID, clientID, image, lightOne, lightTwo, lightThree} = req.body;
    let conditions = {'apartmentID': apartmentID}
    Apartment.updateOne(conditions, req.body).then(
        doc => {
            if (!doc) {return res.status(404).end();}
            return res.status(200).json(doc);
        })
        .catch(err => next(err))
});

app.post('/api/updatePerson', async (req, res) => {
    const {clientID, apartmentID, firstname, lastname, username, phone} = req.body;
    console.log(req.body);
    let conditions = {'clientID': clientID}
    Client.updateOne(conditions, req.body).then(
        doc => {
            if (!doc) {return res.status(404).end();}
            return res.status(200).json(doc);
        })
        .catch(err => next(err))
});

app.post('/api/login', async (req, res) => {
    const {username, phone} = req.body;
    user = await Client.findOne({ username }).lean();
    apartmentID = user.apartmentID;
    apartment = await Apartment.findOne({ apartmentID }).lean();
    image = apartment.image;

    if(!user) {
        return res.json({ status: 'error', error: 'Inavlid Username' });
    }
    if (user.phone != phone)
    {
        return res.json({ status: 'error', error: 'Inavlid Phone' });
    }
    if (user && user.phone) {
        token = jwt.sign({
                user: user.username,
                phone: phone.phone
            }, JWT_SECRET
        );
        console.log(token);
        return res.json({ status: 'ok', data: token });
    }
    res.json({ status: 'error', data: 'error' });
});

io.sockets.on('connection', newConnection)
function newConnection(socket) {
    console.log('new connection: ' + socket.id);
    io.sockets.emit("image", image)
    socket.on("l1", function(data) {
        console.log("light One: ", data);
        let change = String(data);
        Apartment.updateOne({apartmentID: apartmentID}, {lightOne: change}, (err, data) => {
            if (err){
                console.log(err);
            }
            //console.log(data)
        });
    })
    socket.on("l2", function(data) {
        console.log("light Two: ", data);
        let change = String(data);
        Apartment.updateOne({apartmentID: apartmentID}, {lightTwo: change}, (err, data) => {
            if (err){
                console.log(err);
            }
            //console.log(data)
        });
    })
    socket.on("l3", function(data) {
        console.log("light Three: ", data);
        let change = String(data);
        Apartment.updateOne({apartmentID: apartmentID}, {lightThree: change}, (err, data) => {
            if (err){
                console.log(err);
            }
            //console.log(data)
        });
    })
}