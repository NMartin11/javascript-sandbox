// sets - store unique vlaues

const set1 = new Set();

const obj = {name: 'John'};
//add values to set
set1.add(100);
set1.add('a string');
set1.add(obj);
set1.add(true);
set1.add(100);


// get count
// console.log(set1.size);


// iterate
// set1.forEach(function(value){
//     console.log(value);
// });
// for(let item of set1) {
//     console.log(item);
// }

// convert sets

const setArr = Array.from(set1);
console.log(setArr);