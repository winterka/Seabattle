document.addEventListener(
  "DOMContentLoaded",
  function () {
    const messagesContainer = document.querySelector("#container");
    const messageInput = document.querySelector("[name=message_input]");
    const sendMessageButton = document.querySelector("[name=send]");

    let websocketClient = new WebSocket("ws://127.0.0.1:8080");

    websocketClient.onopen = () => {
      sendMessageButton.onclick = () => {
        websocketClient.send(messageInput.value);
        messageInput.value = "";
      };
    };

    websocketClient.onmessage = (message) => {
      let newMessage = document.createElement("div");
      newMessage.classList.add("test");
      newMessage.innerHTML = message.data;
      messagesContainer.appendChild(newMessage);
    };
  },
  false
);
