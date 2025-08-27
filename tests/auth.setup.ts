import { test as setup, expect } from '@playwright/test';
 import { LoginPage } from './pageobjects/loginpages';
import path from 'path';
 
 const authfile = "playwright/.auth/user.json";


  
  setup("authenticate", async ({page}, testInfo) =>{

// Importar la clase LoginPage

const login = new LoginPage(page)
  
    await page.goto('https://saucedemo.com')

    await login.loginWithCredentials('standard_user', 'secret_sauce', testInfo);
 
    await login.expectLocator('.title', testInfo)

    await page.context().storageState({path: authfile})


}

) 