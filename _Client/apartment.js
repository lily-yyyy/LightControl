var socket;
socket = io.connect();
socket.on("image", getImage);

function getImage(data) {
    let image = new Image();
    image.src = data;
    document.getElementById("apartment").src = data;
    console.log(data);
}

let lightOneStatus
let lightTwoStatus
let lightThreeStatus

const lightOne = document.getElementById("l1");
lightOne.addEventListener('change', one)

async function one(event)
{
    if(lightOne.checked == true){
        lightOneStatus = 1;
        console.log(lightOneStatus);
        socket.emit("l1", lightOneStatus);
    }
    
    if(lightOne.checked == false) {
        lightOneStatus = 0;
        console.log(lightOneStatus);
        socket.emit("l1", lightOneStatus);
    }
}

const lightTwo = document.getElementById("l2");
lightTwo.addEventListener('change', two)

async function two(event)
{
    if(lightTwo.checked == true){
        lightTwoStatus = 1;
        console.log(lightTwoStatus);
        socket.emit("l2", lightTwoStatus);
    }
    if(lightTwo.checked == false) {
        lightTwoStatus = 0;
        console.log(lightTwoStatus);
        socket.emit("l2", lightTwoStatus);
    }
}

const lightThree = document.getElementById("l3");
lightThree.addEventListener('change', three)

async function three(event)
{
    if(lightThree.checked == true){
        lightThreeStatus = 1;
        console.log(lightThreeStatus);
        socket.emit("l3", lightThreeStatus);
    }
    if(lightThree.checked == false) {
        lightThreeStatus = 0;
        console.log(lightThreeStatus);
        socket.emit("l3", lightThreeStatus);
    }
}