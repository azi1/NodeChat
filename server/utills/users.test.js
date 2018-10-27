const expect  = require('expect');
const {Users} = require('./users');

describe('testing user class', () => {
    var users;
    beforeEach(()=>{
        users = new Users();
        users.users = [{
            id: 1,
            name: 'Azhar',
            room: "node course",
        },{
            id: 2,
            name: 'Zohaib',
            room: "node course",
        },{
            id: 3,
            name: 'Abdulrehman',
            room: "react course",
        }];
    });

it('testing add user function' , () => {

    var user = {
        name: 'azhar',
        id: 123,
        room: 'bang',
    };
    var newUser = new Users();
     newUser.addUser(user.id,user.name,user.room);
    expect(newUser.users).toEqual([user]);

});

it('getting user list by room' , () => {

var response = users.getUserList('node course');
    expect(response).toEqual(['Azhar', 'Zohaib']);

});

it('get user by id' , () => {

    var userId = 1;
    var user = users.getUser(userId);
        expect(user).toExist();
    
    });
});