const exec = require('child_process').exec;
const load = require('cheerio').load;
const fs = require('fs/promises')
const os = require('os');

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

async function getImpData(uri, timeToStamp) {
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

    // let objToWrite = {}

    console.log('-----------------------------------');
    console.log('nome: ' + $('#HomeDeviceName').text());
    console.log('ip: ' + $('#P2').text());

    await fs.appendFile('./resImp.txt', `-----------------------------------\nnome: ${$('#HomeDeviceName').text()}\nip: ${$('#P2').text()}\n`);
    // objToWrite.name = $('#HomeDeviceName').text().trim()
    // objToWrite.ip = $('#P2').text().trim()

    // objToWrite.cartucho = []
    for (let i = 0; i < 5; i++) {
        let cartucho = $('#SupplyName' + i).text().trim();
        let quantidade = $('#SupplyPLR' + i).text().trim();
        if (cartucho === '') { break; }
        console.log('cartucho: ' + cartucho);
        console.log('quantidade: ' + quantidade);
        await fs.appendFile('./resImp.txt', `cartucho: ${cartucho}\nquantidade: ${quantidade}\n`);

        // let cartuchoName = `cartucho ${i}`
        // objToWrite.cartucho.push({[cartuchoName]: cartucho, quantidade: quantidade})

        // cartucho, quantidade, cartuchoName = null
    }

    // objToWrite.bandejas = []
    for (let i = 1; i <= 5; i++) {
        let bandeja = $('#TrayBinName_' + i).text().trim();
        let status = $('#TrayBinStatus_' + i).text().trim();
        let capacidade = $('#TrayBinCapacity_' + i).text().trim();
        if (bandeja === '') { break; }
        console.log('bandeja: ' + bandeja);
        console.log('status: ' + status);
        console.log('capacidade: ' + capacidade);
        await fs.appendFile('./resImp.txt', `bandeja: ${bandeja}\nstatus: ${status}\ncapacidade: ${capacidade}\n`);

        // let bandejaName = `bandeja ${i}`
        // objToWrite.bandejas.push({[bandejaName]: bandeja, status: status, capacidade: capacidade})

        // bandeja, status, capacidade, bandejaName = null

    }
    console.log('-----------------------------------');

    // await fs.appendFile(`./${timeToStamp}.txt`, `${JSON.stringify(objToWrite)},\n`);
    // objToWrite = null
    // $ = null
}

function getLocalIp() {
    const networkInterfaces = os.networkInterfaces();
    for (const interfaceName in networkInterfaces) {
        for (const iface of networkInterfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                let ip = iface.address.toString().split('.')[2]
                return ip
            }
        }
    }
    return 'IP não encontrado';
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

    for (let i = 0; i <= 255; i++) {
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

const timeElapsed = Date.now();
let today = new Date(timeElapsed).toISOString().split('T')[0].split('-');
today = `${today[2]}-${today[1]}-${today[0]}`;

(async () => {
    const localIp = getLocalIp();
    const ips = await getPingResponseOk(localIp);

    const promises = ips.map(async (ip) => {
        console.log(`to no ip: ${ip}`);
        if (ip === null) {
            return;
        }
        return await getImpData(`http://${ip}/`, today);
    });

    await Promise.all(promises)
        .then(async () => {
            await fs.appendFile('./resImp.txt', `-----------------------------------\n`);
        });
})();



    

   


