// @ts-check
import { test, expect } from '@playwright/test';
import { constants } from 'buffer';
 import { LoginPage } from './pageobjects/loginpages';



//CLASE 3 - 4 
test('simulacion de carrito de compras pag saudemo', async ({ page }) => {

  // simulacion de carrito de compras pag saudemo con CodeGen de Playwright

   await page.goto('https://saucedemo.com')
   await page.getByRole('textbox',{name:"Username"}).fill('standard_user')
   await page.getByRole('textbox',{name:"Password"}).fill('secret_sauce')
   await page.getByRole('button',{name:"Login"}).click()
   const itemContainer = await page.locator('#inventory_container .inventory_item').all()
 
   // Selecciona un elemento aleatorio del contenedor de artículos
   // Puedes usar este elemento para realizar acciones adicionales, como agregar al carrito o verificar detalles
   const randomIndex = Math.floor(Math.random() * itemContainer.length);
 
   // Asegúrate de que el índice aleatorio esté dentro del rango del contenedor
   //sino se lanzará un error 'indice aleatorio fuera de rango'
   if (randomIndex <=0 || randomIndex >= itemContainer.length) {
     console.log('Índice aleatorio fuera de rango');
   }
   console.log(`---------------------------------\n`)
   console.log(`Articulo Agregado Al Carrito:\n`)
   // Obtén el elemento aleatorio
   // recordar que una vez creada la const randomItem se debera usar 
   // este elemento para realizar acciones adicionales, como agregar al carrito o verificar detalles
   const randomItem = itemContainer[randomIndex]
 
   // almacenar el nombre, descripción y precio del artículo seleccionado
   // Esto es útil para verificar que los datos se hayan obtenido correctamente
   const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
   const expectedName = await randomItem.locator('.inventory_item_name').innerText()
   const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()
 
 
   // Imprime el nombre, descripción y precio del artículo seleccionado por partes
   // Esto es útil para verificar que los datos se hayan obtenido correctamente
     console.log(`Nombre del artículo: ${expectedName}\n`)
     console.log(`Descripción del artículo: ${expectedDescription}\n`)
     console.log(`Precio del artículo: ${expectedPrice}\n`)
     console.log(`---------------------------------\n`)
 
   
   // Imprime el nombre, descripción y precio del artículo seleccionado en una sola línea
   // Esto es útil para verificar que los datos se hayan obtenido correctamente
     /*console.log(`Nombre del artículo: ${expectedName} Descripción del artículo: ${expectedDescription} Precio del artículo: ${expectedPrice}`);*/
 
   // Agrega el artículo al carrito, 
   await randomItem.getByRole('button',{name:"Add to cart"}).click()
   await page.locator('a.shopping_cart_link').click()
 
   expect(page.getByRole('button', {name:'Checkout'})).toBeVisible()
   
 
 
   console.log(`Articulo Dentro Del Carrito:\n`)
 
   const actualName = await page.locator('.inventory_item_name').innerText()
   const actualDescription = await page.locator('.inventory_item_desc').innerText()
   const actualPrice = await page.locator('.inventory_item_price').innerText()
 
   expect(actualName).toBe(expectedName)
   expect(actualDescription).toBe(expectedDescription)
   expect(actualPrice).toBe(expectedPrice)
 
   console.log(`Nombre del artículo: ${actualName}\n`)
   console.log(`Descripción del artículo: ${actualDescription             }\n`)
   console.log(`Precio del artículo: ${actualPrice}\n`)
   console.log(`---------------------------------\n`)
 
 
 
 
   await page.getByRole('button',{name:'checkout'}).click()
 
   await page.getByRole('textbox',{name:"First Name"}).fill('lautaro')
 
   await page.getByRole('textbox',{name:"Last Name"}).fill('martinez')
 
   await page.getByRole('textbox',{name:"Postal Code"}).fill('bbb1621')
   await page.getByRole('button',{name:"continue"}).click()
 
   //verificar que estamos en la pagina de checkout overview
   expect(await page.locator('.title')).toBeVisible()
   expect(await page.locator('.summary_total_label')).toBeVisible()
 
   await page.getByRole('button',{name:"finish"}).click()
 
   //verificar que estamos en la pagina de checkout complete
   expect(page.getByRole('heading', {name:'Thank you for your order!'})).toBeVisible()
   
   console.log(`Compra Realizada Con Exito\n`)
   console.log(`---------------------------------\n`)
 
   console.log(`Volviendo Al Inicio\n`) 
   await page.getByRole('button',{name:"Back Home"}).click()
   //verificar que estamos en la pagina de inicio
   expect(page.locator('.title')).toBeVisible()
 
 /* autoamtización de la compra con CodeGen de Playwright
   await page.locator('[data-test="checkout"]').click();
   await page.locator('[data-test="firstName"]').click();
   await page.locator('[data-test="firstName"]').fill('lautaro');
   await page.locator('[data-test="lastName"]').click();
   await page.locator('[data-test="lastName"]').fill('martinez');
   await page.locator('[data-test="postalCode"]').click();
   await page.locator('[data-test="postalCode"]').fill('bbb1621');
   await page.locator('[data-test="continue"]').click();
   await page.locator('[data-test="finish"]').click();
   await page.locator('[data-test="back-to-products"]').click();
 */
 
 
   await page.pause()
 
 
   //al crear un archivo de prueba recordar agregar al final del nombre el sufijo .spec.ts o .spec.js
   //para que Playwright lo reconozca como un archivo de prueba y lo ejecute correctamente
   //tambien se puede agregar el sufijo .test.ts o .test.js, pero es recomendable usar .spec para pruebas de especificaciones
   //y .test para pruebas unitarias o de integración
   
   //en esta clase aprendimos a como agregar un item aleatorio a un carrito de compras
   //y como obtener el nombre, descripción y precio del artículo seleccionado
   //también aprendimos a como imprimir estos datos en la consola
   //verificando que los datos se hayan obtenido correctamente
   //hacer simulaciones de compras en la pagina de saucedemo

 });  
 