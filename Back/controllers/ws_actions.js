let sockets = []

exports.saveSocket = async (socket) => {
  if(!sockets.includes(socket)) sockets.push(socket)
  console.log('users = ', sockets.length)
}

exports.close = async (socket) => {
  try {
    sockets = sockets.filter((pSocket) => pSocket != socket)
    console.log('users = ', sockets.length)
  } catch(error) {
    console.log({error})
  }
};

exports.dataToUser = async (data) => {
  try {
    for(let socket of sockets) {
      if(socket) socket.send(JSON.stringify(data));
    }
  } catch(error) {
    console.log({error})
  }
};
