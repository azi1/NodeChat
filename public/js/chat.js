var socket = io();

function scrollToBottom () {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
  
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
  }
socket.on('connect', function() {
    console.log('connected to server');
const params = jQuery.deparam(window.location.search);
    socket.emit('join',params,function(err) {
        if(err) {
                alert(err);
                window.location.href = '/';
        } else {
                console.log('no error');
        }
    });


    socket.on('newMessage', function(data){
        console.log(data);
        var formatedTime = moment(data.createdAt).format('h:mm:a')
      
        var template = jQuery('#message-template').html();
        var html = Mustache.render(template,{
            text: data.text,
            from: data.from,
            createdAt: formatedTime
        });

        jQuery('#messages').append(html);
        scrollToBottom();
    });

    socket.on('newLocationMessage', function(message){
        console.log(message,"message");
        var formatedTime = moment(message.createdAt).format('h:mm:a');
      
        var template = jQuery('#location-message-template').html();
        var html = Mustache.render(template,{
            url: message.url,
            from: message.from,
            createdAt: formatedTime
        });

        jQuery('#messages').append(html);
        scrollToBottom();
    });
});
socket.on('disconnect', function() {
    console.log('disconnected from server');
});
socket.on('updateUserList', function(users) {
    console.log(users);
    var ol = jQuery('<ol></ol>');
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol); 
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
var textBoxvalue = jQuery('[name=message]');
    socket.emit('createMessage',{
        text: textBoxvalue.val()
    },function(){
        textBoxvalue.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation) {
        return alert('geolocation not supported by browser');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location...');;
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('sendUserLocation', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });
    },function(){
        alert('unable to fetch location');
        locationButton.removeAttr('disabled').text('Send location');
    });
});

