const config = require('config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(config.get('mysql.database'),
    config.get('mysql.user'), config.get('mysql.password'), {
        host: config.get('mysql.host'),
        dialect: 'mysql',
        timezone: '+08:00',
        timestamps: false,// true by default
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },

        // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
        operatorsAliases: false
    });

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const User = sequelize.define('user', {
    id: {type: Sequelize.DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {field: 'name', type: Sequelize.DataTypes.STRING, primaryKey: true},
    pwd: {field: 'password', type: Sequelize.DataTypes.STRING, allowNull: false}
});

module.exports = {
    sequelize: sequelize,
    User
};