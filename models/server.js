require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { socketController } = require("../controllers/sockets");

class Server {
    constructor() {
        this.app = express();
        this.server = require("http").createServer(this.app);
        this.io = require("socket.io")(this.server);
        this.port = process.env.PORT;
        this.paths = {};
        // Middlewares
        this.middlewares();
        // Routes
        this.routes();
        // Sockets
        this.sockets();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Directorio Público
        this.app.use(express.static("public"));
    }

    routes() {
        // this.app.use(this.paths.auth, require("../routes/auth"));
    }

    sockets() {
        this.io.on("connection", socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

module.exports = Server;