const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://gauchodoaeroporto.com.br/');

    await page.waitForSelector('.titulo');

    const datos = await page.evaluate(() => {
        const elementos = document.querySelectorAll('.titulo');
        return Array.from(elementos).map(elemento => elemento.textContent.trim());
    });

    console.log(datos);

    await browser.close();
})();