const ws = require('ws');
const ws_actions = require('./controllers/ws_actions')

const ws_server = new ws.Server({ noServer: true });

ws_server.on('connection', socket => {

  ws_actions.saveSocket(socket)
  console.log("Client connecté !")

  socket.on('message', data => {
    //ws_actions.message(data)
  })

  socket.on('close', (msg) => {
    console.log("Client déconnecté !")
    ws_actions.close(socket)
  })
})

module.exports = ws_server;
