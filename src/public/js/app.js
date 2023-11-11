console.log('a');

const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");

// 프론트의 소켓
const socket = new WebSocket(`ws://${window.location.host}`);

function makeMessage(type, payload){
  const msg = {type, payload};
  return JSON.stringify(msg);
}

// open : 서버연결
socket.addEventListener("open", () => {
  console.log('Connected to Server!!!💚')
});

// message : 메세지받음
socket.addEventListener("message", (message) => {
  const li = document.createElement("li");
  li.innerText = message.data;
  messageList.append(li);
  console.log("Just got this: ", message.data, " from the server")
});

// close : 서버끊김
socket.addEventListener("close", () => {
  console.log('Disconnect from server 🚥')
}) 

// send : 메세지 보냄
// setTimeout(() => {
//   socket.send('hello!! I sended message to backend');
// }, 10000);

function handleSubmit(event) {
  event.preventDefault();
  const Input = messageForm.querySelector("input");
  socket.send(makeMessage("new_message", Input.value));
  console.log(Input.value);
  Input.value = "";
}

function handleNickSubmit(event){
  event.preventDefault();
  const Input = nickForm.querySelector("input");
  socket.send(makeMessage("nickname", Input.value));
  Input.value = "";
}

messageForm.addEventListener("submit", handleSubmit);
nickForm.addEventListener("submit", handleNickSubmit);