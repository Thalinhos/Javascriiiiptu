const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://facebook.com', {
    waitUntil: 'networkidle2',
  });


  await page.pdf({
    path: 'C:\\Users\\thalisson-vieira\\Desktop\\pages-screen\\newPrintScreen.pdf', 
    fullPage: true,
  });

//   await page.screenshot({
//     path: 'C:\\Users\\thalisson-vieira\\Desktop\\pages-screen\\newPrintScreen.png', 
//     fullPage: true,
//   });

  await browser.close();
})();
