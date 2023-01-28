const puppeteer = require('puppeteer');
const jsdom = require('jsdom');

(async () => {
  try {
    // Abrimos una instancia del puppeteer y accedemos a la url de google
    const browser = await puppeteer.launch() ;
    const page = await browser.newPage();
    const response = await page.goto('https://siat.sat.gob.mx/app/qr/faces/pages/mobile/validadorqr.jsf?D1=10&D2=1&D3=17050077097_EEMM840802DL3');
    const body = await response.text();    
    const { window: { document } } = new jsdom.JSDOM(body);     
    // Seleccionamos los títulos y lo mostramos en consola
    let elementos =[];
    document.querySelectorAll('.ui-datatable')
                     .forEach(element => {
                        if (element.textContent.includes('Régimen')){
                            elementos.push(element.textContent)
                        }                        
                     });    
    console.log(elementos);
    // Cerramos el puppeteer
    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
