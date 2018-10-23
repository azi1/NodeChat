var socket = io();
socket.on('connect', function() {
    console.log('connected to server');

    socket.on('newMessage', function(data){
        console.log(data);
        var li =  jQuery('<li></li>');
        li.text(`${data.from}: ${data.text}`);

        jQuery('#messages').append(li);
    });
    // socket.on('Welcome', function(data) {
    //     console.log(data);
    // });
    
    // socket.on('newUser', function(data) {
    //     console.log(data);
    // });
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
