"use strict";
function sumOfAge(user1, use2) {
    return user1.age + use2.age;
}
const age = sumOfAge({
    name: 'Srijit', age: 20
}, { name: 'kamalika', age: 30 });
console.log(age);
