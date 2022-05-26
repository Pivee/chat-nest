const socket = io('http://localhost:3000');

socket.on('message', ({ data }) => {
  console.log('Data Received', data);
  handleNewMessage(data);
});

/**
 * Used in `index.html`
 */
function handleSubmitNewMessage(message) {
  const messageElement = document.getElementById('message');

  if (!message) message = messageElement.value;

  socket.emit('message', { data: message });
}

function handleNewMessage(message) {
  const messagesList = document.getElementById('messages');

  messagesList.appendChild(buildNewMessage(message));
}

function buildNewMessage(message) {
  const li = document.createElement('li');

  li.appendChild(document.createTextNode(message));

  return li;
}
