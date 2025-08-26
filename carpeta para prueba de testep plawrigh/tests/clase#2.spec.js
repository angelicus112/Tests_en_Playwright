// @ts-check
import { test, expect } from '@playwright/test';
import { constants } from 'buffer';
 import { LoginPage } from './pageobjects/loginpages';



//CLASE 2
test('busqueda de arituclo y semi simulacion de compra con CodeGen', async ({ page }) => {

  // Esta prueba fue realizada con el CodeGen de Playwright

  await page.goto('https://www.mercadolibre.com/');
  ///la funcion .getByRole() permite buscar elementos por su rol, en este caso el rol es "textbox" y el nombre es "Buscar productos, marcas y más"
  ///mientras que .locator() permite buscar elementos por su selector CSS
  await page.getByRole('link', { name: 'Argentina' }).click();
  await page.getByRole('combobox', { name: 'Ingresá lo que quieras' }).click();
  await page.getByRole('combobox', { name: 'Ingresá lo que quieras' }).fill('playstation 4');
  await page.getByRole('button', { name: 'Buscar' }).click();
  await page.getByRole('link', { name: 'Sony PlayStation 4 500GB Call' }).click();
  await page.getByRole('button', { name: 'Comprar ahora' }).first().click();
  await page.getByRole('link', { name: 'Mercado Libre' }).click();
  await page.pause();
});
