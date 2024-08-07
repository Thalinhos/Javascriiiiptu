import { exec } from 'child_process';
import { load } from 'cheerio';
import { createWriteStream, promises as fs } from 'fs';


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function fetchImpDataFromUri(url) {
    try {
        const response = await fetch(url);
        const data = await response.text();
        return data;
    } catch (err) {
        return null;
    }
}

async function getImpData(uri) {
    console.log('iniciando ' + uri);

    if(uri === null){
        console.log('sem url para encontrar...');
        return
    }

    const data = await fetchImpDataFromUri(uri);

    if (data === null) {
        console.log('sem dados...');
        return;
    }

    let $ = load(data);
    if (!$('.product').text() || !$('#HomeDeviceName').text() || !$('#P2').text()) {
        console.log('não é uma página válida...');
        return;
    }

    let objToWrite = {}

    console.log('-----------------------------------');
    console.log('nome: ' + $('#HomeDeviceName').text());
    console.log('ip: ' + $('#P2').text());

    // await fs.appendFile('./resImp.txt', `-----------------------------------\nnome: ${$('#HomeDeviceName').text()}\nip: ${$('#P2').text()}\n`);
    objToWrite.name = $('#HomeDeviceName').text().trim()
    objToWrite.ip = $('#P2').text().trim()

    objToWrite.cartucho = []
    for (let i = 0; i < 5; i++) {
        let cartucho = $('#SupplyName' + i).text().trim();
        let quantidade = $('#SupplyPLR' + i).text().trim();
        if (cartucho === '') { break; }
        console.log('cartucho: ' + cartucho);
        console.log('quantidade: ' + quantidade);
        // await fs.appendFile('./resImp.txt', `cartucho: ${cartucho}\nquantidade: ${quantidade}\n`);

        let cartuchoName = `cartucho ${i}`
        objToWrite.cartucho.push({[cartuchoName]: cartucho, quantidade: quantidade})

        cartucho, quantidade, cartuchoName = null
    }

    objToWrite.bandejas = []
    for (let i = 1; i <= 5; i++) {
        let bandeja = $('#TrayBinName_' + i).text().trim();
        let status = $('#TrayBinStatus_' + i).text().trim();
        let capacidade = $('#TrayBinCapacity_' + i).text().trim();
        if (bandeja === '') { break; }
        console.log('bandeja: ' + bandeja);
        console.log('status: ' + status);
        console.log('capacidade: ' + capacidade);
        // await fs.appendFile('./resImp.txt', `bandeja: ${bandeja}\nstatus: ${status}\ncapacidade: ${capacidade}\n`);

        let bandejaName = `bandeja ${i}`
        objToWrite.bandejas.push({[bandejaName]: bandeja, status: status, capacidade: capacidade})

        bandeja, status, capacidade, bandejaName = null

    }
    console.log('-----------------------------------');

    await fs.appendFile('./resImp.json', `${JSON.stringify(objToWrite)},\n`);
    objToWrite = null
    $ = null

    // const writeStream = createWriteStream('./resImp.json', {flags: 'a'})
    // writeStream.write(`${JSON.stringify(objToWrite)},\n`);
    // process.on('exit', () => {
    //     objToWrite = null
    //     $ = null
    //     writeStream.end();
    // });
}



function ping(ip) {
    return new Promise((resolve) => {
        exec(`powershell.exe ping ${ip}`, (err, stdout, stderr) => {
            if (err || stderr) {
                console.log(`erro no ip ${ip}`)
                resolve(null)
                return; 
            }
            if (stdout && (stdout.includes('TTL='))) { 
                console.log(`sucesso no ip ${ip}`);
                resolve(ip); 
            }
            else {
                resolve(null)
            }
        });
    });
}

async function getPingResponseOk(ipArea) {
    const ips = [];
    const pingPromises = []
    const ipAddressBase = '10.244';

    for (let i = 0; i <= 120; i++) {
        let ip = `${ipAddressBase}.${ipArea}.${i}`;
        pingPromises.push(ping(ip))
    }

    const results = await Promise.all(pingPromises)
    results.forEach((res) => {
        if(res === null){
            return
        }
        if(res){
            ips.push(res)
        }
    })
    return ips; 
}


// for (let i = 32; i <= 37; i++){
    getPingResponseOk(37)
    .then(ips => {
    console.log('começando o .then')
    ips.forEach(ip => {
        console.log(`to no ip: ${ip}`)
        if(ip === null) {
            return
        }
        getImpData(`http://${ip}/`)
        })
    })
// }

