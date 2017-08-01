// 소켓을 생성
var socket = io();

// 서버정보 수신 설정
socket.on('connect', function () {
  console.log('Conneted to server');
});

socket.on('disconnect', function () {
  console.log('Disconnect from server');
});

socket.on('newMessage', function(message) {
  console.log('newMessage', message);
});
