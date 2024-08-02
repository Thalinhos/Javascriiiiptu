const uris = require('../ips') //take from an external txt or js/ts file
const cheerio = require('cheerio')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

async function fetchImpDataFromUri(url: string){
    const data = await fetch(url);
    const res = await data.text();
    return res
}

async function getImpData(uri: string) {
    const data = await fetchImpDataFromUri(uri)
    const $ = cheerio.load(data)

    console.log('nome: ' + $('#HomeDeviceName').text())
    console.log('ip: ' + $('#P2').text())

    for(let i = 0; i < 5; i++){
        const cartucho = $('#SupplyName'+i).text().trim()
        const quantidade = $('#SupplyPLR'+i).text().trim()
        if(cartucho === ''){ break }
        console.log('cartucho: ' + cartucho)
        console.log('quantidade: ' + quantidade)
    }

    for(let i = 1; i <= 5; i++){
        const bandeja = $('#TrayBinName_'+i).text().trim()
        const status = $('#TrayBinStatus_'+i).text().trim()
        const capacidade = $('#TrayBinCapacity_'+i).text().trim()
        if(bandeja === ''){ break; }
        console.log('bandeja: ' + bandeja)
        console.log('status: ' + status)
        console.log('capacidade: ' + capacidade)
    }
    console.log('-----------------------------------');
}

for(let i in uris){
    if(Number(i) === 0){
        console.log('-----------------------------------');
    }
    getImpData(uris[i])
}   



