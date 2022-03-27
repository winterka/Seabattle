document.addEventListener(
  "DOMContentLoaded",
  function () {
    const form = document.getElementById("regForm");

    let websocketClient = new WebSocket("ws://127.0.0.1:8080");

    websocketClient.onopen = () => {
      form.addEventListener(
        "submit",
        (e) => {
          // e.preventDefault();

          const arrData = [];
          const formData = new FormData(form);

          for (const pair of formData.entries()) {
            arrData.push([pair[0], pair[1]]);
          }

          const data = Object.fromEntries(arrData);

          console.log(data);
          websocketClient.send(JSON.stringify(data));

          // location.reload();
        },
        false
      );
    };
  },
  false
);
