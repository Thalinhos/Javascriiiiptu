const puppeteer = require('puppeteer');
const readlineSync = require('readline-sync');


console.log("Bem vindo ao Bot Conversor");


async function robot() {
    const browser = await puppeteer.launch({headless: 'new'}); // para não abrir navegador, pode mudar headless para 'new' com aspas.
    const page = await browser.newPage();

    const moedaBase = readlineSync.question('Qual moeda voce gostaria de converter? ');
    const moedaFinal = readlineSync.question('Digite a moeda desejada: ');


    const url = `https://www.google.com/search?q=${moedaBase}+para+${moedaFinal}&rlz=1C1ONGR_pt-PTBR1063BR1063&sxsrf=APwXEdf9NW1QmYnENC_FVtTDoyWJ5af79A%3A1687993648570&ei=ML2cZJOrIpvQ1sQPwLyv4AE&ved=0ahUKEwiTg7muiuf_AhUbqJUCHUDeCxwQ4dUDCA8&uact=5&oq=${moedaBase}+para+${moedaFinal}&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzINCAAQigUQsQMQgwEQQzILCAAQgAQQsQMQgwEyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDIFCAAQgAQyBQgAEIAEMgUIABCABDoECCMQJzoHCCMQigUQJzoHCAAQigUQQ0oECEEYAFAAWNgLYOgMaABwAXgDgAGTA4gB0RSSAQkwLjIuNi4xLjGYAQCgAQHAAQE&sclient=gws-wiz-serp`;

    await page.goto(url);
    //await page.screenshot({ path: 'example.png' }); aqui vc pode tirar print da pagina em si.

    const resultado = await page.evaluate(function() {
        return  document.querySelector('.lWzCpb.a61j6').value;
    });

    console.log(`O valor de 1 ${moedaBase} em ${moedaFinal} é igual a ${resultado}`)

    //await browser.close();

};

robot();