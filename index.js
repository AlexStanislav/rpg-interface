const app = require("./api/app")
const { v4: uuidv4 } = require("uuid")

const server = app.listen(8000, () => {
    console.log(`Server started on http://localhost:${8000}`);
})
const io = require("socket.io")(server, {
    cors: {
        origin: 'http://localhost:8080'
    }
})


let ioConnections = []

io.on('connection', (socket) => {
    console.log('Client connected');

    socket.id = uuidv4()
    ioConnections[socket.id] = socket

    socket.emit('connectionId', socket.id)

    socket.on('disconnect', () => {
        delete ioConnections[socket.id]
        console.log('Client disconnected')
    })
    console.log(Object.keys(ioConnections));
})