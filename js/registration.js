document.addEventListener(
  "DOMContentLoaded",
  function () {
    const form = document.getElementById("regForm");

    let websocketClient = new WebSocket("ws://127.0.0.1:8080");

    websocketClient.onopen = () => {
      form.addEventListener(
        "submit",
        (e) => {
          e.preventDefault();

          const formData = new FormData(form);

          const data = {
            name: formData.get("name"),
            tel: formData.get("tel"),
            email: formData.get("email"),
            password: formData.get("password"),
          };

          console.log(data);
          websocketClient.send(JSON.stringify(data));
        },
        false
      );
    };
  },
  false
);
