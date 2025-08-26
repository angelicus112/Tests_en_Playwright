// @ts-check
import { test, expect } from '@playwright/test';
import { constants } from 'buffer';
 import { LoginPage } from './pageobjects/loginpages';


// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });


// //CLASE 1
// test('web scraping con playwright', async ({ page }) => {
//   //web scraping con playwright

//   // #1 : confirmar el sitio web al que quiero acceder 
//   await page.goto('https://www.mercadolibre.com.ar/');
//   // #2 : buscar el elemento de la barra de busqueda con el locator y .fill() ingresar el texto a buscar
//   await page.locator('input[id=\'cb1-edit\']').fill('Iphone');
//   // #3 : hacer click en el boton de buscar
//   await page.keyboard.press('Enter');
//   // #4 : esperar que se cargue el contenedor de resultados
//   await expect(page.locator('//ol[contains(@class,\'ui-search-layout \') ]')).toBeVisible();

//   // #5 : obtener los titulos de los resultados guardandolos en un array/variable "titles"
//   const titles = await page.locator('//ol[contains(@class, \'ui-search-layout\') ]//li//h3').allInnerTexts();

//   // #6 : imprimir el total de resultados
//   console.log('EL TOTAL DE RESULTADOS SON:', titles.length);

//   // #7 : recorrer el array de titulos e imprimirlos iterando con un for
//   for(let title of titles) {
//     console.log('EL TITULO ES:', title);
//   } 

//   // #8 : pausar la ejecucion para ver los resultados
//   await page.pause();
// });



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
 

  /*CLASE 5
  En esta clase se implementa la clase LoginPage para mejorar la reutilización del código y la legibilidad de las pruebas
  Se encapsula la lógica de inicio de sesión en un solo lugar, facilitando el mantenimiento
  y la comprensión del código de prueba.*/
  // clase 6 import { LoginPage } from './pageobjects/loginpages';
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
  


//clase 6 utilidad y funcion de variables de entorno

// test('TEST BASE', async ({ page }) => {

//   await page.goto(process.env.URL) // salta error por predeterminado, pero funciona correctamente al ejecutar el test


//     await page.pause()

//     //creamos una variable de tipó env, la cual nos permite acceder a las variables de entorno
//     //en este caso la variable URL que se encuentra en el archivo .env
//     //para setear la variable de entorno debemos en la terminal ejecutar el comando
//     //set NODE_ENV="direcion donde tengas el archivo .env"
//     //esto nos permite acceder a las variables de entorno en nuestro código de prueba
//     //esto es útil para evitar hardcodear valores en el código de prueba y poder reutilizar el código
//     //en este caso la variable URL que se encuentra en el archivo .env

// });

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



