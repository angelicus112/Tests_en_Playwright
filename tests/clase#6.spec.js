// @ts-check
import { test, expect } from '@playwright/test';
import { constants } from 'buffer';
 import { LoginPage } from './pageobjects/loginpages';




//clase 6 utilidad y funcion de variables de entorno

test('TEST BASE', async ({ page }) => {

  // @ts-ignore
  await page.goto(process.env.URL) // salta error por predeterminado, pero funciona correctamente al ejecutar el test


    await page.pause()

    //creamos una variable de tipó env, la cual nos permite acceder a las variables de entorno
    //en este caso la variable URL que se encuentra en el archivo .env
    //para setear la variable de entorno debemos en la terminal ejecutar el comando
    //set NODE_ENV="direcion donde tengas el archivo .env"
    //esto nos permite acceder a las variables de entorno en nuestro código de prueba
    //esto es útil para evitar hardcodear valores en el código de prueba y poder reutilizar el código
    //en este caso la variable URL que se encuentra en el archivo .env

});
