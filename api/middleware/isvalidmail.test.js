const isvalid = require('./isvalidmail');

test('checks if mail is valid',()=>{
    expect(isvalid('google@google.com')).toBe(true)
});


test('checks if mail is invalid',()=>{
    expect(isvalid('googlegoogle.com')).toBe(false)
})