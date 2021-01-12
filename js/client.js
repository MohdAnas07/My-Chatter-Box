const socket = io.connect('http://localhost:8000');

// get DOM element in js Variable respectively
const form = document.getElementById('send-containt');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');

// Audio that play when you get a message
var audio = new Audio('tone.mp3');

//function which append containt in chatter container ----->
const append = (message, position) =>{
    const messageElement = document.createElement('div');
    messageElement.innerText =message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);

    if(position == 'left'){
        audio.play();
    }
}


// This prompt fire when you join the Chat RooM
const name = prompt('Enter your name to join the Chat');
socket.emit('new-user-joined', name);

//If new user join, recieve his/her name from the server 
socket.on('user-joined', name => {
    append(`${name} join the chat`, 'left');
});

// If server sends a message, recieve it
socket.on('recive', data => {
    append(`${data.name}: ${data.message}`, 'left');
});

// If anyone left the Chat room, append info to chat container
socket.on('left', name => {
    append(`${name} left the Chat`, 'left');
}); 

//If the form gets submitted, send to the server
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    if(message.length >0){
        append(`You: ${message}`, 'right');
        socket.emit('send', message);
        messageInput.value = '';

        //this only scroll the message container automatically 
        var elem = document.getElementById('data');
        elem.scrollTop = elem.scrollHeight;
    }
});




// window.setInterval(function() {
//     var elem = document.getElementById('data');
//     elem.scrollTop = elem.scrollHeight;
//   }, 1000);