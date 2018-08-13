let orm = require('./_orm');
let sequelize = orm.sequelize;

let insert = async function (user) {
    try {
        let result = await orm.User.create(user);
        console.log(result.toJSON());
    } catch (e) {
        console.error(e);
    }
};// 增

let deleteById = async function (uid) {
    try {
        let n = await orm.User.destroy({where: {id: uid}});
        console.log('destroy :', n);
    } catch (e) {
        console.error(e);
    }
};// 删


let updateById = async function (user) {
    try {
        let result = await orm.User.update(user, {where: {id: user.id}});
        console.log('updateById result = ', result);
    } catch (e) {
        console.error(e);
    }
};// 改

class UserProxy {
    constructor(name, pwd) {
        this.name = name;
        this.pwd = pwd;
    }
}

async function test() {
    for (let i = 1; i < 5; i++) {
        await insert(new UserProxy('user' + i, 'pwd' + i));
    }

    await deleteById(4);

    await updateById({
        id: 1,
        name: 'root',
        pwd: 'root'
    });

    await updateById({
        id: 2,
        name: 'admin',
        pwd: 'admin'
    });

    await updateById({
        id: 3,
        name: 'lzh',
        pwd: '666666'
    });

    orm.User.findAll()
        .then(users => console.log("findAll:", users.length));
}

async function test2() {
    let user = orm.User.build(new UserProxy("user000", "pwd000"));
    user.save()
        .then(() => {
            console.log('save success');
            return orm.User.findOne({where: {name: 'user000'}});
        })
        .then(findUser => {
            if (findUser) {
                console.log('findOne success', findUser);
                return user.update({name: 'user111'},{field:['name']});
            } else {
                throw new Error("findUser is null");
            }
        })
        .then(updateResult => {
            console.log('update success', updateResult);
            // return user.destroy();
        })
        // .then(destroyResult => {
        //     console.log('destroy success', destroyResult);
        // })
        .catch(err => console.error(err));
}

test2().then(function () {
    console.log("Test completed.");
}).catch(function (err) {
    console.log(err);
});