const Sequelize = require('sequelize');

const sequelize = new Sequelize('stringconnection', {
    dialect: 'postgres'
})

sequelize.authenticate()
.then(() => {
    console.log('Authentication successful')
})
.catch((err) => {
    console.log(err.message)
})

module.exports = sequelize;