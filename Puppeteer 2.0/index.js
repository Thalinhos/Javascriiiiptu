const puppeteer = require('puppeteer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

(async () => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    args: [ '--ignore-certificate-errors' ] //ignore ssl erros to non certificate or https web
  });

  const page = await browser.newPage();

  await page.setViewport({ width: 1920, height: 1080 }); //ensure the future screenshot d'have a full view

  await page.goto('https://10.244.37.70', {
    waitUntil: 'networkidle2', //wait till site to be full loaded
  });


  await page.screenshot({
    path: 'C:\\Users\\thalisson-vieira\\Desktop\\newPrintScreen.png', 
    fullPage: true,
  });

  await browser.close();
})();
