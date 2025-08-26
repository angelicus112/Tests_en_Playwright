// @ts-check
import { test, expect } from '@playwright/test';
import { constants } from 'buffer';
 import { LoginPage } from './pageobjects/loginpages';




  /*CLASE 5
  En esta clase se implementa la clase LoginPage para mejorar la reutilización del código y la legibilidad de las pruebas
  Se encapsula la lógica de inicio de sesión en un solo lugar, facilitando el mantenimiento
  y la comprensión del código de prueba.*/

  test('integracion de funciones para simplificar', async ({ page }) => {

    await page.goto('https://saucedemo.com')

    /* remplazamos el código de la clase 4 por la clase LoginPage
    await page.getByRole('textbox',{name:"Username"}).fill('standard_user')
    await page.getByRole('textbox',{name:"Password"}).fill('secret_sauce')
    await page.getByRole('button',{name:"Login"}).click()*/

    // Importar la clase LoginPage
    const login = new LoginPage(page)

    // Utilizar el método loginWithCredentials para iniciar sesión
    // Esto mejora la reutilización del código y la legibilidad de las pruebas
    // Reemplazamos el código de la clase 4 por la clase LoginPage
    await login.loginWithCredentials('standard_user', 'secret_sauce',test.info())


    const itemContainer = await page.locator('#inventory_container .inventory_item').all()

  //creacion de un indice aleatorio para seleccionar un articulo al azar
  //de forma simple, escribiendo el codigo directamente en el test
  /* const randomIndex = Math.floor(Math.random() * itemContainer.length);

   if (randomIndex <=0 || randomIndex >= itemContainer.length) {
      console.log('Índice aleatorio fuera de rango');
    }
    console.log(`---------------------------------\n`)
    console.log(`Articulo Agregado Al Carrito:\n`)
    const randomItem = itemContainer[randomIndex]*/

    // Utilizar la función randomIndex de la clase LoginPage para obtener un índice aleatorio
    const randomIndice =  login.randomIndex(itemContainer)

    const randomItem = itemContainer[randomIndice]
  
    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText()
    const expectedName = await randomItem.locator('.inventory_item_name').innerText()
    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText()

  /* propiedades del articulo escritas directamente en el test
      console.log(`Nombre del artículo: ${expectedName}\n`)
      console.log(`Descripción del artículo: ${expectedDescription}\n`)
      console.log(`Precio del artículo: ${expectedPrice}\n`)
      console.log(`---------------------------------\n`)*/


    // Utilizar la funcion propiedades de la clase LoginPage para imprimir las propiedades del artículo  
    await login.propiedades(expectedName, expectedDescription, expectedPrice)


    await randomItem.getByRole('button',{name:"Add to cart"}).click()


    /*await page.locator('a.shopping_cart_link').click()*/
    await login.clickLocator('a.shopping_cart_link');

    /*expect(page.getByRole('button', {name:'Checkout'})).toBeVisible()*/
    await login.expectRol('button', 'Checkout',test.info())

    console.log(`Articulo Dentro Del Carrito:\n`)

    const actualName = await page.locator('.inventory_item_name').innerText()
    const actualDescription = await page.locator('.inventory_item_desc').innerText()
    const actualPrice = await page.locator('.inventory_item_price').innerText()

    expect(actualName).toBe(expectedName)
    expect(actualDescription).toBe(expectedDescription)
    expect(actualPrice).toBe(expectedPrice)


    await login.propiedades(actualName, actualDescription, actualPrice)


    /*await page.getByRole('button',{name:'checkout'}).click()*/
    await login.clickButton('checkout');

    

    /*await page.getByRole('textbox',{name:"First Name"}).fill('lautaro')
      await page.getByRole('textbox',{name:"Last Name"}).fill('martinez')
      await page.getByRole('textbox',{name:"Postal Code"}).fill('bbb1621')*/

    //funcion de relleno automatico

    await login.rellenarPorRol('textbox', 'First Name', 'lautaro')
    await login.rellenarPorRol('textbox', 'Last Name', 'martinez')
    await login.rellenarPorRol('textbox', 'Postal Code', 'bbb1621')




    /*await page.getByRole('button',{name:"continue"}).click()*/
     await login.clickButton('continue');

    //verificar que estamos en la pagina de checkout overview
    /*expect(await page.locator('.title')).toBeVisible()*/
      await login.expectLocator('.title',test.info())
    /*expect(await page.locator('.summary_total_label')).toBeVisible()*/
      await login.expectLocator('.summary_total_label',test.info())

    /*await page.getByRole('button',{name:"finish"}).click()*/
      await login.clickButton('finish');


    //verificar que estamos en la pagina de checkout complete
    /*expect(page.getByRole('heading', {name:'Thank you for your order!'})).toBeVisible()*/
      await login.expectRol('heading', 'Thank you for your order!',test.info())
    console.log(`Compra Realizada Con Exito\n`)
    console.log(`---------------------------------\n`)
    console.log(`Volviendo Al Inicio\n`) 

    /*await page.getByRole('button',{name:"Back Home"}).click()*/
      await login.clickButton('Back Home');

    //verificar que estamos en la pagina de inicio
    /*expect(page.locator('.title')).toBeVisible()*/
    await login.expectLocator('.title',test.info())
    console.log(`Estamos En La Pagina De Inicio\n`)
    console.log(`---------------------------------\n`)

    await page.pause()


  });
