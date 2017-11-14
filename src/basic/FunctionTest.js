let name = 'node js';
let user = {name:'user'};
sayName();
sayName.call(user);
sayName.apply(user);
let userSayName = sayName.bind(user);
userSayName();
function sayName() {
    console.log(this.name);
}
