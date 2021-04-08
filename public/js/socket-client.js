const socket = io();

const spanOnline = document.querySelector("#spanOnline");
const spanOffline = document.querySelector("#spanOffline");
const txtMensaje = document.querySelector("#txtMensaje");
const btnEnviar = document.querySelector("#btnEnviar");

socket.on("connect", () => {
    console.log("Conectado");
    spanOffline.style.display = "none";
    spanOnline.style.display = "";
});

socket.on("disconnect", () => {
    console.log("Desconectado del servidor");
    spanOffline.style.display = "";
    spanOnline.style.display = "none";
});

socket.on("enviar-mensaje", (payload) => {
    console.log(payload);
});

btnEnviar.addEventListener("click", () => {
    const mensaje = txtMensaje.value;
    const payload = {
        id: "123asd",
        mensaje,
        fecha: new Date().getTime(),
    };

    socket.emit("enviar-mensaje", payload, (data) => {
        // Callback que será ejectuado solo con el permiso del back-end
        console.log("Desde el server", data);
    });
});