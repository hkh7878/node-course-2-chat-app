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
  var li = jQuery('<li></li>');
  li.text(`${message.from} : ${message.text}`);

  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
