class Users {
    constructor() {
        this.users = [];
    }

    addUser(id,name,room) {
        var user  = {id, name, room};
        this.users.push(user);
        return user;
    }
    removeUser(id) {
        var validUser = this.getUser(id);
        if(validUser) {
        this.users =  this.users.filter((user)=> user.id !== id);
        }
        return validUser;

    }
    getUser(id) {
        return this.users.filter((user)=> user.id === id)[0];

    }
    getUserList(room) {
      var newUsers = this.users.filter((user) => user.room === room);
    var userNames =  newUsers.map((user)=>{
        return user.name;
      });
      
      return userNames;
    }


}


module.exports = {Users};