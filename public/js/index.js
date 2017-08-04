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
  var formattedTime = moment(message.createdAt).format('h:mm a');
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocation', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  console.log('newLocaion', message);

  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from} ${formattedTime}: `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by you browser.')
  }

  locationButton.attr('disabled', 'disabled').text('Sending...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function (positionError) {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
