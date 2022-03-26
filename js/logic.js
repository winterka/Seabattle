document.addEventListener('DOMContentLoaded', function(){

    const messagesContainer = document.querySelector("#container");
    const messageInput = document.querySelector('[name=message_input]')
    const sendMessageButton = document.querySelector('[name=send]')

    let websocketClient = new WebSocket("31.31.196.220:12345")

    websocketClient.onopen=() => {
         sendMessageButton.onclick=()=>{
            websocketClient.send(messageInput.value);
            messageInput.value = "";
         };

    };

    websocketClient.onmessage = (message)=> {

        let newMessage = document.createElement('div');
        newMessage.classList.add('test');
        newMessage.innerHTML = message.data;
        messagesContainer.appendChild(newMessage);
    };
}, false);