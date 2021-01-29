const socket = io();

const messages = document.getElementById('messages');
const form = document.getElementById('form');
const input = document.getElementById('input');

// get nickname
const name = prompt("your name");
socket.emit('new-connection', {username: name});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value !== '') {
        let newMessage = input.value;
        socket.emit('new-message', {user: socket.id, message: newMessage});
        addMessage({message: newMessage}, 'my');
        //reset input
        input.value = '';
    }
});

socket.on('welcome', function (data) {
    console.log(data);
    addMessage(data, 'server');
});

socket.on('broadcast-message', (data) => {
    console.log('broadcast message event');
    addMessage(data, 'others');
});

// removes error class from input
input.addEventListener('keyup', (e) => {
    input.classList.remove('error');
});

function addMessage(data, type){
    const messageElement = document.createElement('li');
    const spanElement = document.createElement('span');
    const pElement = document.createElement('p');

    spanElement.classList.add('span-custom');
    pElement.classList.add('p-custom');

    if(type === 'my'){
        messageElement.classList.add('my-message');
        // spanElement.innerHTML = `${name}:&nbsp`
        pElement.innerHTML = `${data.message}`;
        // messageElement.append(spanElement, pElement)
        messageElement.append(pElement);
    }else if(type === 'others'){
        messageElement.classList.add('my-message2');
        spanElement.innerHTML = `${data.user}:&nbsp`;
        pElement.innerHTML = `${data.message}`;
        messageElement.append(spanElement, pElement);

    }else{
        messageElement.classList.add('welcome-text');
        messageElement.innerText = `${data.message}`;

    }
    // adds the new div to the message container div
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight;

}


