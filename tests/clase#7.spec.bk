// @ts-check
import { test, expect } from '@playwright/test';
import { constants } from 'buffer';
 import { LoginPage } from './pageobjects/loginpages';




//clase 7 TRABAJANDO CON TABLAS (solo funciona en .ts)
//usando interfaces para definir la estructura de los datos
//y tipos de datos que se esperan en la tabla

test('TEST WEB TABLE', async ({ page }) => {

    const login = new LoginPage(page)

    await page.goto('https://cosmocode.io/automation-practice-webtable/');

    const tableContainer = await page.locator("xpath=//table[@id='countries']");

    const rows = await tableContainer.locator("xpath=.//tr").all();

    

    console.log(`Total de filas en la tabla: ${rows.length}`);

    const row1 = rows.at(1);
    
    const countries: Country[] = [];



    for (let row of rows) {

    let Country: Country = 
        {
          country: await row.locator('xpath=.//td[2]').innerText() ,
          capital: await row.locator("xpath=.//td[3]").innerText(),
          currency: await row.locator("xpath=.//td[4]").innerText(),
          primaryLanguage: await row.locator("xpath=.//td[5]").innerText(),
        }
      countries.push(Country);


        for(let country of countries) {
        console.log(country);
        }



    }



    interface Country {
      country: string;
      capital: string;
      currency: string;
      primaryLanguage: string;

    
  }




    await page.pause()

});


