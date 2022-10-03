const login = document.getElementById("login");
login.addEventListener("click", loginUser);

async function loginUser(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const phone = document.getElementById('phone').value;

    const result = await fetch('/api/login', {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          phone
        })
     }).then((res) => res.json())
     if (result.status === 'ok') {
        console.log('Got the token: ', result.data);
        window.location.assign("./apartment.html");
     } else {
        alert(result.error)
     }
}