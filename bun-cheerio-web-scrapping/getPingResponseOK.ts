const { exec } = require('child_process')
const  fs  = require('fs')

const ipAddressBase = '10.244.36.'
const getPing = `ping ${ipAddressBase}`

for(let i = 0; i < 255; i++){
    exec(`powershell.exe ${getPing}${i}`, (err, stdout, stderr) => {
        if (err){
            return
        }
        if(stderr){
            return
        }
        if(stdout){
            if(stdout[82] == 3 && stdout[83] == 2 || stdout[84] == 3 && stdout[85] == 2){
                fs.appendFile('pings.txt', `${ipAddressBase}${i} - OK` + '\n', (err) => {
                    if(err){
                        console.log(err)
                    }
                })
            }
        }
    })
}



