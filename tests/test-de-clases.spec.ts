// import { test, expect } from '@playwright/test';
// import {  LoginPage } from './pageobjects/loginpages';

// //clase 9 verificaciones basicas "Ingreso de usuario"
// //en este test ya tenemos el ingreso de secion realizado en el autentificador, 
// test('captura de evidencias con usuario ya registrado', async ({ page },testInfo) => {
  
//   // Importar la clase LoginPage
//   const login = new LoginPage(page)
  
//   await page.goto('https://saucedemo.com/inventory.html')
  
  
  
//   //   await login.loginWithCredentials('standard_user', 'secret_sauce', testInfo);
  
//   //   //verificar que ingresamos a la pagina correctamente con una screenshot
//   //   //las capturas ya las hace solas, y las muestra en el reporte
//   //   //pero para que se guarden en la carpeta evidencia, lo hago manualmente agregando este codigo
//   //   //si no lo hago asi, solo se guardan en el reporte, las cuales igual se pueden descargar
//   //   //pero si quiero tenerlas en la carpeta evidencia, debo hacerlo de esta forma
//   //   await login.expectLocator('.title', testInfo)
  
  
//   const itemContainer = await page.locator('#inventory_container .inventory_item').all()
  
  
  
//   // Utilizar la función randomIndex de la clase LoginPage para obtener un índice aleatorio
//   const randomIndice =  login.randomIndex(itemContainer)
  
//   const randomItem = itemContainer[randomIndice]
  
//   const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
//   const expectedName = await randomItem.locator('.inventory_item_name').innerText()
//   const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()
  
  
//   // Utilizar la funcion propiedades de la clase LoginPage para imprimir las propiedades del artículo  
//   await login.propiedades(expectedName, expectedDescription, expectedPrice)
  
  
//   await randomItem.getByRole('button',{name:"Add to cart"}).click()
  
  
//   await login.clickLocator('a.shopping_cart_link');
  
//   await login.expectRol('button', 'Checkout', testInfo)
  
//   console.log(`Articulo Dentro Del Carrito:\n`)
  
//   const actualName = await page.locator('.inventory_item_name').innerText()
//   const actualDescription = await page.locator('.inventory_item_desc').innerText()
//   const actualPrice = await page.locator('.inventory_item_price').innerText()
  
//   expect(actualName).toBe(expectedName)
//   expect(actualDescription).toBe(expectedDescription)
//   expect(actualPrice).toBe(expectedPrice)
  
  
//   await login.propiedades(actualName, actualDescription, actualPrice)
  
  
//   await login.clickButton('checkout');
  
  
  
//   //funcion de relleno automatico
  
//   await login.expectRol('textbox', 'First Name', testInfo)
//   await login.rellenarPorRol('textbox', 'First Name', 'lautaro')
//   await login.rellenarPorRol('textbox', 'Last Name', 'martinez')
//   await login.rellenarPorRol('textbox', 'Postal Code', 'bbb1621')
  
  
  
//   await login.clickButton('continue');
  
//   //verificar que estamos en la pagina de checkout overview
//   await login.expectLocator('.title', testInfo)
//   await login.expectLocator('.summary_total_label', testInfo)
  
//   await login.clickButton('finish');
  
  
//   //verificar que estamos en la pagina de checkout complete
//   await login.expectRol('heading', 'Thank you for your order!', testInfo)
//   console.log(`Compra Realizada Con Exito\n`)
//   console.log(`---------------------------------\n`)
//   console.log(`Volviendo Al Inicio\n`) 
  
//   await login.clickButton('Back Home');
  
//   //verificar que estamos en la pagina de inicio
//   await login.expectLocator('.title', testInfo)
//   console.log(`Estamos En La Pagina De Inicio\n`)
//   console.log(`---------------------------------\n`)
  
//   await page.pause()
  
  
  
// });

// //pero si queremos que no todos los test que ejecutemos usen el miso usuario
// //podemos usar lo siguiente

// /* test.use({storageState: {cookies:[], origins:[]}})*/
// //no se pueden usar los dos en el mismo archivo de pruebas si se sigue dependiendo de la creacion de un 
// // nuevo usuario, porque cuando detecta esta linea de codigo, borra todos los valores almacenado y 
// // el setup se realiza ultimo no dando lugar a la creacion del usuario para uso del test


// test('captura de evidencias con usuario registrado manual', async ({ page },testInfo) => {
  
  
//   await page.goto('https://saucedemo.com')
  


//   // Importar la clase LoginPage
//   const login = new LoginPage(page)

//   await login.loginWithCredentials('standard_user', 'secret_sauce', testInfo);

//   //verificar que ingresamos a la pagina correctamente con una screenshot
//   //las capturas ya las hace solas, y las muestra en el reporte
//   //pero para que se guarden en la carpeta evidencia, lo hago manualmente agregando este codigo
//   //si no lo hago asi, solo se guardan en el reporte, las cuales igual se pueden descargar
//   //pero si quiero tenerlas en la carpeta evidencia, debo hacerlo de esta forma
//   await login.expectLocator('.title', testInfo)
  

//   const itemContainer = await page.locator('#inventory_container .inventory_item').all()



//   // Utilizar la función randomIndex de la clase LoginPage para obtener un índice aleatorio
//   const randomIndice =  login.randomIndex(itemContainer)

//   const randomItem = itemContainer[randomIndice]
 
//   const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
//   const expectedName = await randomItem.locator('.inventory_item_name').innerText()
//   const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()


//   // Utilizar la funcion propiedades de la clase LoginPage para imprimir las propiedades del artículo  
//   await login.propiedades(expectedName, expectedDescription, expectedPrice)


//   await randomItem.getByRole('button',{name:"Add to cart"}).click()


//   await login.clickLocator('a.shopping_cart_link');

//   await login.expectRol('button', 'Checkout', testInfo)

//   console.log(`Articulo Dentro Del Carrito:\n`)

//   const actualName = await page.locator('.inventory_item_name').innerText()
//   const actualDescription = await page.locator('.inventory_item_desc').innerText()
//   const actualPrice = await page.locator('.inventory_item_price').innerText()

//   expect(actualName).toBe(expectedName)
//   expect(actualDescription).toBe(expectedDescription)
//   expect(actualPrice).toBe(expectedPrice)


//   await login.propiedades(actualName, actualDescription, actualPrice)


//   await login.clickButton('checkout');

  

//  //funcion de relleno automatico

//  await login.expectRol('textbox', 'First Name', testInfo)
//   await login.rellenarPorRol('textbox', 'First Name', 'lautaro')
//   await login.rellenarPorRol('textbox', 'Last Name', 'martinez')
//   await login.rellenarPorRol('textbox', 'Postal Code', 'bbb1621')



//    await login.clickButton('continue');

//   //verificar que estamos en la pagina de checkout overview
//     await login.expectLocator('.title', testInfo)
//     await login.expectLocator('.summary_total_label', testInfo)

//     await login.clickButton('finish');


//   //verificar que estamos en la pagina de checkout complete
//     await login.expectRol('heading', 'Thank you for your order!', testInfo)
//   console.log(`Compra Realizada Con Exito\n`)
//   console.log(`---------------------------------\n`)
//   console.log(`Volviendo Al Inicio\n`) 

//     await login.clickButton('Back Home');

//   //verificar que estamos en la pagina de inicio
//   await login.expectLocator('.title', testInfo)
//   console.log(`Estamos En La Pagina De Inicio\n`)
//   console.log(`---------------------------------\n`)

//   await page.pause()


// });
