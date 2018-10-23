const expect = require('expect');

const {generateMessage} = require('./message');


describe('check generate message', () =>{
it('should return correct object', ()=>{
    var from = 'azhar';
    var text = 'hi how are you';
    var response  = generateMessage(from, text);

    expect(response.createdAt).toBeA('number');
    expect(response).toInclude({from, text});

});
});