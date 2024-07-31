const fs = require('fs')
const uri = 'index.txt'

// const data = 'new data inserted'
// const dataArrayFormat = data.split(" ")

// const writeStream = fs.createWriteStream(uri, {flags: 'a'});
// dataArrayFormat.forEach(item => {
//     writeStream.write(`${item}\n`)
//     console.log(item + '\n')
// })
// writeStream.end()

const readStream = fs.createReadStream(uri)
let newString = ''

readStream.on('data', (chunk) => {
    newString+=chunk;
})
readStream.on('end', () => {
    const myArray = newString.split('\n')
    console.log(myArray)
})








