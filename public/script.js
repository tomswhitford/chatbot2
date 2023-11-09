const chatMessages = document.getElementById('chat-messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Function to append a message to the chat messages container
function appendMessage(message, sender) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(sender);
  messageElement.innerText = message;
  chatMessages.appendChild(messageElement);
}
const dialoguedata  = [{Question : "---" , Answer : "---"}];
function convertArrayToCSV(data) { 
  const keys = Object.keys(data[0]);
  const csv = [
    keys.join(','), // Header row
    ...data.map(item => keys.map(key => item[key]).join(','))
  ].join('\n');
  return csv;
}
// Function to send a message to the server
async function sendMessageToServer(message) {
  console.log('sent');
  const response = await fetch('/api/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ message })
  });
  console.log('receive');
  const data = await response.json();
  dialoguedata.push({Question : message , Answer : data.message});
  // console.log(data)
  return data.message;
}

function download(){
  const csv = convertArrayToCSV(dialoguedata);
  const blob = new Blob([csv], { type: 'text/csv' });
      
  // Create a link element to trigger the download
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'dialogue.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}