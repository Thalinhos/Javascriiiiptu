const sequelize = require('./db')
const User = require('./user')

// only one time to sync database and models
// sequelize.sync() 
// .then(() => {
//     console.log('Sincronizado')
// })
// .catch((err) => {
//     console.log(err.message)
// })

// const thalisson = {
//     name: 'carolina',
//     lastName: 'bertolo'
// }

// User.create(thalisson)
// .then(()=>{
//     console.log('user created')
// })
// .catch((err) => {
//     console.log(err.message)
// })

// User.findAll()
// .then(users => users)
// .then(usersTotals => {console.log(usersTotals)})

// async function update(){
//     const user = await User.findByPk(1)
//     user.name = 'thalinhos'
//     const userSave = await user.save()
//     console.log(userSave)
// }
// update()

// async function deleteField() {
//     const user = await User.findByPk(2)
//     user.destroy()
// }
// deleteField()



