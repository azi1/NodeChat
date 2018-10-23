var socket = io();
socket.on('connect', function() {
    console.log('connected to server');

    socket.on('newMessage', function(data){
        console.log(data);
        var li =  jQuery('<li></li>');
        li.text(`${data.from}: ${data.text}`);

        jQuery('#messages').append(li);
    });

    socket.on('newLocationMessage', function(message){
        console.log(message,"message");
        var li = jQuery('<li></li>');
        var a  = jQuery('<a target="_blank">my current location</a>');
        li.text(`${message.from}:`);
        a.attr('href', message.url);
        li.append(a);
        jQuery('#messages').append(li); 
    });
});
socket.on('disconnect', function() {
    console.log('disconnected from server');
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function(){
    if(!navigator.geolocation) {
        return alert('geolocation not supported by browser');
    }
    navigator.geolocation.getCurrentPosition(function(position){
        console.log(position);
        socket.emit('sendUserLocation', {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude
        });
    },function(){
        alert('unable to fetch location');
    });
});

