export const sendWebSocketMessage = (message, socket) => {
  //console.log("**********")
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    //console.log("++++++++++++++")
  } else {
    //console.log("////////////")
    console.warn('WebSocket is not open. Message not sent:', message);
  }
};

export const closeWebSocket = (socket) => {
  if (socket) {
    socket.close();
    console.log('WebSocket connection closed manually');
  }
};
