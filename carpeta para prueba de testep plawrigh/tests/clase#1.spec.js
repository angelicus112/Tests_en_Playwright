// @ts-check
import { test, expect } from '@playwright/test';
import { constants } from 'buffer';
 import { LoginPage } from './pageobjects/loginpages';

//conceptos basicos de playwright
test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


//CLASE 1
test('web scraping con playwright', async ({ page }) => {
  //web scraping con playwright

  // #1 : confirmar el sitio web al que quiero acceder 
  await page.goto('https://www.mercadolibre.com.ar/');
  // #2 : buscar el elemento de la barra de busqueda con el locator y .fill() ingresar el texto a buscar
  await page.locator('input[id=\'cb1-edit\']').fill('Iphone');
  // #3 : hacer click en el boton de buscar
  await page.keyboard.press('Enter');
  // #4 : esperar que se cargue el contenedor de resultados
  await expect(page.locator('//ol[contains(@class,\'ui-search-layout \') ]')).toBeVisible();

  // #5 : obtener los titulos de los resultados guardandolos en un array/variable "titles"
  const titles = await page.locator('//ol[contains(@class, \'ui-search-layout\') ]//li//h3').allInnerTexts();

  // #6 : imprimir el total de resultados
  console.log('EL TOTAL DE RESULTADOS SON:', titles.length);

  // #7 : recorrer el array de titulos e imprimirlos iterando con un for
  for(let title of titles) {
    console.log('EL TITULO ES:', title);
  } 

  // #8 : pausar la ejecucion para ver los resultados
  await page.pause();
});


