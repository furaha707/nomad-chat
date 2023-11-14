// 소켓을 프론트랑 연결
const socket = io();

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");

function handleRoomSubmit(event){
  event.preventDefault();
  const input = form.querySelector("input");
  // 소켓의 장점: 이벤트 커스텀, 객체 바로 전송 가능 다른타입도, 콜백함수 프론트에서 실행
  // 마지막 인자로 함수를 받았을 때는 서버 응답을 받는 것으로 사용하면 되겠네
  socket.emit("enter_room", {payload: input.value}, () => {
    console.log('server is done@@@');
  });
  console.log(input.value);
  input.value = ""
}

form.addEventListener("submit", handleRoomSubmit);