const addApartment = document.getElementById("addApartment");
addApartment.addEventListener("click", addRoom);

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result); 
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

async function addRoom(event) {
    event.preventDefault();
    const apartmentID = document.getElementById("iApartmentID").value;

    let image = document.getElementById("iImage").files[0];
    image = await getBase64(image);

    const lightOne = document.getElementById("iLOne").value;
    const lightTwo = document.getElementById("iLTwo").value;
    const lightThree = document.getElementById("iLThree").value;

    console.log(apartmentID, image, lightOne, lightTwo, lightThree)

    const result = await fetch('/api/addApartment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apartmentID,
            image,
            lightOne,
            lightTwo,
            lightThree
            })
        }).then((res) => res.json())
        if (result.status === 'ok') {
            alert("Apartment added");
            location.reload();
        } else {
            alert(result.error)
        }
}

const addUser = document.getElementById("addUser");
addUser.addEventListener("click", addPerson);

async function addPerson(event) {
    event.preventDefault();
    const clientID = document.getElementById("iUClientID").value;
    const apartmentID = document.getElementById("iUApartmentID").value;
    const firstname = document.getElementById("iUFirstname").value;
    const lastname = document.getElementById("iULastname").value;
    const username = document.getElementById("iUsername").value;
    const phone = document.getElementById("iUPhone").value;

    console.log(apartmentID, clientID, firstname, lastname, username, phone);

    const result = await fetch('/api/addPerson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clientID,
            apartmentID,
            firstname,
            lastname,
            username,
            phone
            })
        }).then((res) => res.json())
        if (result.status === 'ok') {
            alert("User added");
            location.reload();
        } else {
            alert(result.error)
        }
}

const updateA = document.getElementById("updateApartment");
updateA.addEventListener("click", updateApartment);

async function updateApartment(event) {
    event.preventDefault();
    const apartmentID = document.getElementById("uApartmentID").value;

    let image = document.getElementById("uImage").files[0];
    image = await getBase64(image);

    const lightOne = document.getElementById("uLOne").value;
    const lightTwo = document.getElementById("uLTwo").value;
    const lightThree = document.getElementById("uLThree").value;

    console.log(apartmentID, image, lightOne, lightTwo, lightThree)

    const result = await fetch('/api/updateApartment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            apartmentID,
            image,
            lightOne,
            lightTwo,
            lightThree
            })
        }).then((res) => res.json())
        if (result.status === 'ok') {
            alert("Apartment added");
            location.reload();
        } else {
            alert(result.error)
        }
}

const updateU = document.getElementById("updateUser");
updateU.addEventListener("click", updateUser);

async function updateUser(event) {
    event.preventDefault();
    const apartmentID = document.getElementById("uuApartmentID").value;
    const clientID = document.getElementById("uuClientID").value;
    const firstname = document.getElementById("uuFirstname").value;
    const lastname = document.getElementById("uuLastname").value;
    const username = document.getElementById("uuUsername").value;
    const phone = document.getElementById("uuPhone").value;

    console.log(apartmentID, clientID, firstname, lastname, username, phone);

    const result = await fetch('/api/updatePerson', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            clientID,
            apartmentID,
            firstname,
            lastname,
            username,
            phone
            })
        }).then((res) => res.json())
        if (result.status === 'ok') {
            alert("User added");
            location.reload();
        } else {
            alert(result.error)
        }
}