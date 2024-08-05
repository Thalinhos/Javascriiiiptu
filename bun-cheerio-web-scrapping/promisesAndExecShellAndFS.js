const { exec } = require('child_process');
const cheerio = require('cheerio');
const fs = require('fs').promises;

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
    const data = await fetchImpDataFromUri(uri);

    if (data === null) {
        console.log('sem dados...');
        return;
    }

    const $ = cheerio.load(data);
    if (!$('.product').text() || !$('#HomeDeviceName').text() || !$('#P2').text()) {
        console.log('não é uma página válida...');
        return;
    }
    console.log('-----------------------------------');
    console.log('nome: ' + $('#HomeDeviceName').text());
    console.log('ip: ' + $('#P2').text());

    await fs.appendFile('../resImp.txt', `nome: ${$('#HomeDeviceName').text()}\nip: ${$('#P2').text()}\n`);

    for (let i = 0; i < 5; i++) {
        const cartucho = $('#SupplyName' + i).text().trim();
        const quantidade = $('#SupplyPLR' + i).text().trim();
        if (cartucho === '') { break; }
        console.log('cartucho: ' + cartucho);
        console.log('quantidade: ' + quantidade);
        await fs.appendFile('../resImp.txt', `cartucho: ${cartucho}\nquantidade: ${quantidade}\n`);
    }
    for (let i = 1; i <= 5; i++) {
        const bandeja = $('#TrayBinName_' + i).text().trim();
        const status = $('#TrayBinStatus_' + i).text().trim();
        const capacidade = $('#TrayBinCapacity_' + i).text().trim();
        if (bandeja === '') { break; }
        console.log('bandeja: ' + bandeja);
        console.log('status: ' + status);
        console.log('capacidade: ' + capacidade);
        await fs.appendFile('../resImp.txt', `bandeja: ${bandeja}\nstatus: ${status}\ncapacidade: ${capacidade}\n`);
    }
    console.log('-----------------------------------');
    await fs.appendFile("../resImp.txt", '-----------------------------------\n');
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

async function getPingResponseOk() {
    const ips = [];
    const pingPromises = []
    const ipAddressBase = '192.168';
    const ipArea = '0';

    for (let i = 120; i <= 255; i++) {
        let ip = `${ipAddressBase}.${ipArea}.${i}`;
        pingPromises.push(ping(ip))
    }

    const results = await Promise.all(pingPromises)
    results.forEach((res) => {
        if(res){
            ips.push(res)
        }
    })
    return ips; 
}

getPingResponseOk().then(ips => {
    console.log('começando o .then')
    ips.forEach(ip => {
        console.log(`to no ip: ${ip}`)
        getImpData(`http://${ip}/`)
    })
})