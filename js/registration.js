document.addEventListener(
  "DOMContentLoaded",
  () => {
    const nameInput = document.querySelector(`[name="name"]`);
    const telInput = document.querySelector(`[name="tel"]`);
    const emailInput = document.querySelector(`[name="email"]`);
    const passwordInput = document.querySelector(`[name="password"]`);

    let websocketClient = new WebSocket("ws://127.0.0.1:8080");

    websocketClient.onopen = () => {
      form1.onsubmit = (e) => {
        e.preventDefault();
        const data = {
          name: nameInput.value,
          tel: telInput.value,
          email: emailInput.value,
          password: passwordInput.value,
        };

        console.log(data);
        websocketClient.send(data);
        // messageInput.value = "";
      };
    };
  },
  false
);
