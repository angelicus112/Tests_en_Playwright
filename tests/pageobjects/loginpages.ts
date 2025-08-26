

// tests/pageobjects/loginpages.ts
// Esta clase representa la página de inicio de sesión y encapsula las interacciones con los elementos
// de la página, como los campos de nombre de usuario y contraseña, y el botón de inicio de sesión.
// Al utilizar esta clase, se mejora la reutilización del código y se siguen buenas prácticas de
// programación, como la separación de preocupaciones y la encapsulación de la lógica de la página.
// Esto facilita el mantenimiento y la legibilidad del código de prueba, permitiendo que los cambios
// en la estructura de la página se reflejen en un solo lugar, en lugar de tener que actualizar múltiples 
// pruebas individuales.

import { expect, Locator, Page, TestInfo  } from "@playwright/test";
import { exit } from "process";




export class LoginPage {





    
   // Definición de selectores para los elementos de la página de inicio de sesión
    // Estos selectores se utilizan para interactuar con los elementos de la página
    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly loginButton: Locator;
    private readonly page: Page;

    // Constructor que recibe una instancia de Page y asigna los selectores a las propiedades
    // Esto permite que los selectores se utilicen en los métodos de la clase
    constructor(page: Page) {
        this.usernameTextbox = page.getByRole('textbox', { name: "Username" });
        this.passwordTextbox = page.getByRole('textbox', { name: "Password" });
        this.loginButton = page.getByRole('button', { name: "Login" });
        this.page = page; 
    }

    // Métodos para interactuar con los elementos de la página
    // Estos métodos encapsulan la lógica de interacción con los elementos, mejorando la reutilización
    // del código y la legibilidad de las pruebas.
    // de formo unificada, facilitando el mantenimiento y la comprensión del código de prueba.
    // Cada método realiza una acción específica, como llenar el campo de nombre de usuario,
    // llenar el campo de contraseña o hacer clic en el botón de inicio de sesión.
    // Esto permite que las pruebas se centren en la lógica de prueba en lugar de los
    // detalles de implementación de la página.


    //estos tres metodos capsulan la logica de forma individual
    //logrando asi la reutilización del código para las pruebas 
    //de inicio de sesión
    async fillUsername(Username:string) {
        // Método para llenar el campo de nombre de usuario
        await this.usernameTextbox.fill(Username);
    }
    async fillPassword(Password:string) {
        // Método para llenar el campo de contraseña
        await this.passwordTextbox.fill(Password);
    }
    async clickLoginButton() {
        // Método para hacer clic en el botón de inicio de sesión
        await this.loginButton.click();
    }




    //mientras que este metotdo encapsula la logica de inicio de sesión
    //de forma unificada, facilitando el mantenimiento y la comprensión del código de prueba.
    //utilizando en una misma función los tres metodos anteriores
    async loginWithCredentials(Username: string, Password: string,  testInfo: TestInfo) {
 
        await this.fillUsername(Username);
        await this.fillPassword(Password);
        await this.clickLoginButton();
        await this.page.screenshot({path:'evidencia/login.png',fullPage:true})
          // screenshot y attach al reporte
            const screenshot = await this.page.screenshot({ fullPage: true });
            await testInfo.attach('login', {
                body: screenshot,
                contentType: 'image/png',
    });
    

    }

    //los metodos para obtener numeros aleatorios no necesitan ser async
    // ya que no realizan operaciones asincrónicas, como llamadas a la red o esperas.
        // Este método genera un índice aleatorio basado en la longitud del array proporcionado
        // y se utiliza para seleccionar un elemento aleatorio de un array.
        // Esto es útil para pruebas que requieren seleccionar elementos aleatorios de una lista.
        // El método devuelve un número entero que representa el índice aleatorio.
    randomIndex(variable: any[]): number {
        const indice = Math.floor(Math.random() * variable.length);

        if (indice < 0 || indice >= variable.length) {
            console.log('Índice aleatorio fuera de rango');
        exit(1); // Termina el proceso si el elemento no es visible   

        }

        console.log(`---------------------------------\n`);
        console.log(`Artículo Agregado Al Carrito:\n`);
        console.log(`Índice aleatorio generado: ${indice}\n`);

        return indice;
    }

    // Este método imprime las propiedades del artículo seleccionado en la consola
    // Esto es útil para depuración y para verificar que el artículo seleccionado es el esperado.
    async propiedades(Nombre: string, Descripción: string, Precio: string) {
        console.log(`Nombre del artículo: ${Nombre}\n`);
        console.log(`Descripción del artículo: ${Descripción}\n`);
        console.log(`Precio del artículo: ${Precio}\n`);
        console.log(`---------------------------------\n`);     
        }

    //metodo para hacer clic en cualquier botón cuyo nombre coincida con buttonName
    async clickButton(buttonName: string) {
        // Hace clic en cualquier botón cuyo nombre coincida con buttonName
        await this.page.getByRole('button', { name: buttonName }).click();
    }

    //metodo para hacer clic en cualquier elemento cuyo selector coincida con locator
    async clickLocator(locator) {
        await this.page.locator(locator).click();
    }

    // Este método rellana  cualquier elemento cuyo rol y nombre coincidan
    async rellenarPorRol(rol, name: string, value: string) {
        await this.page.getByRole(rol, { name }).fill(value);
    }

    // Este método rellena cualquier elemento cuyo selector coincida con locator
    async rellenarPorLocator(locator, value: string) {
        await this.page.locator(locator).fill(value);
    }

    //este metodo verifica que el elemento especificado por el locator sea visible
    async expectLocator(locator, testInfo: TestInfo) {
        // Verifica que el elemento especificado por el locator sea visible
        expect(await this.page.locator(locator)).toBeVisible();
        if (await this.page.locator(locator).isVisible()) {
            console.log(``);
            const screenshot = await this.page.screenshot({ fullPage: true });
            await testInfo.attach(`locator-${locator}`, {
            body: screenshot,
            contentType: 'image/png',
            });
        }else{
          console.log(`El elemento con rol ${locator} no es visible.`);
          console.log(`Asegúrate de que el elemento esté presente en la página antes de realizar la verificación.`);
          console.log('Asegúrate de que el selector sea correcto y que el elemento esté cargado en la página antes de verificar su visibilidad.');
          console.log(`---------------------------------\n`);
          exit(1); // Termina el proceso si el elemento no es visible   
        }
    }

    // Este método verifica que un elemento con un rol y nombre específicos sea visible
    async expectRol(rol,name: string,testInfo: TestInfo) {
        expect(await this.page.getByRole(rol, { name })).toBeVisible();
        if (await this.page.getByRole(rol, { name }).isVisible()) {
            console.log(``);     
            const screenshot = await this.page.screenshot({ fullPage: true });
            await testInfo.attach(`locator-${rol}${name}`, {
            body: screenshot,
            contentType: 'image/png',
            });
        }else{
            console.log(`El elemento con rol ${rol} y nombre ${name} no es visible.`);
            console.log(`Asegúrate de que el elemento esté presente en la página antes de realizar la verificación.`);
            console.log('Asegúrate de que el selector sea correcto y que el elemento esté cargado en la página antes de verificar su visibilidad.');
            console.log(`---------------------------------\n`);        
            exit(1); // Termina el proceso si el elemento no es visible   

        }
    }

}