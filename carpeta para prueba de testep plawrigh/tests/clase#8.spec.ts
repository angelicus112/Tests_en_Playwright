// @ts-check
import { test, expect } from '@playwright/test';
import { constants } from 'buffer';
 import { LoginPage } from './pageobjects/loginpages';




//clase 8 screenshot y video
//agrege la funcionalidad de screenshot en los metodos expectLocator y expectRol
//ademas de agregar la carpeta evidencia para guardar las capturas de pantalla
//y en el metodo loginWithCredentials para capturar la pantalla al iniciar sesion
test('captura de evidencias', async ({ page },testInfo) => {


  await page.goto('https://saucedemo.com')



  // Importar la clase LoginPage
  const login = new LoginPage(page)

  await login.loginWithCredentials('standard_user', 'secret_sauce', testInfo);

  //verificar que ingresamos a la pagina correctamente con una screenshot
  //las capturas ya las hace solas, y las muestra en el reporte
  //pero para que se guarden en la carpeta evidencia, lo hago manualmente agregando este codigo
  //si no lo hago asi, solo se guardan en el reporte, las cuales igual se pueden descargar
  //pero si quiero tenerlas en la carpeta evidencia, debo hacerlo de esta forma
  await login.expectLocator('.title', testInfo)
  

  const itemContainer = await page.locator('#inventory_container .inventory_item').all()



  // Utilizar la función randomIndex de la clase LoginPage para obtener un índice aleatorio
  const randomIndice =  login.randomIndex(itemContainer)

  const randomItem = itemContainer[randomIndice]
 
  const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
  const expectedName = await randomItem.locator('.inventory_item_name').innerText()
  const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()


  // Utilizar la funcion propiedades de la clase LoginPage para imprimir las propiedades del artículo  
  await login.propiedades(expectedName, expectedDescription, expectedPrice)


  await randomItem.getByRole('button',{name:"Add to cart"}).click()


  await login.clickLocator('a.shopping_cart_link');

  await login.expectRol('button', 'Checkout', testInfo)

  console.log(`Articulo Dentro Del Carrito:\n`)

  const actualName = await page.locator('.inventory_item_name').innerText()
  const actualDescription = await page.locator('.inventory_item_desc').innerText()
  const actualPrice = await page.locator('.inventory_item_price').innerText()

  expect(actualName).toBe(expectedName)
  expect(actualDescription).toBe(expectedDescription)
  expect(actualPrice).toBe(expectedPrice)


  await login.propiedades(actualName, actualDescription, actualPrice)


  await login.clickButton('checkout');

  

 //funcion de relleno automatico

 await login.expectRol('textbox', 'First Name', testInfo)
  await login.rellenarPorRol('textbox', 'First Name', 'lautaro')
  await login.rellenarPorRol('textbox', 'Last Name', 'martinez')
  await login.rellenarPorRol('textbox', 'Postal Code', 'bbb1621')



   await login.clickButton('continue');

  //verificar que estamos en la pagina de checkout overview
    await login.expectLocator('.title', testInfo)
    await login.expectLocator('.summary_total_label', testInfo)

    await login.clickButton('finish');


  //verificar que estamos en la pagina de checkout complete
    await login.expectRol('heading', 'Thank you for your order!', testInfo)
  console.log(`Compra Realizada Con Exito\n`)
  console.log(`---------------------------------\n`)
  console.log(`Volviendo Al Inicio\n`) 

    await login.clickButton('Back Home');

  //verificar que estamos en la pagina de inicio
  await login.expectLocator('.title', testInfo)
  console.log(`Estamos En La Pagina De Inicio\n`)
  console.log(`---------------------------------\n`)

  await page.pause()


});