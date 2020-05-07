

// const sayHello = () => console.log('Hello');


// arrow call backs
const users = ['nathan', 'john', 'William'];
const nameLengths = users.map(function(name){
    return name.length;
});

console.log(nameLengths);