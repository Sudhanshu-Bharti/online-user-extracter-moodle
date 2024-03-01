const puppeteer = require('puppeteer');
require('dotenv').config()

async function BrowserRun() {
    const browser = await puppeteer.launch({headless: true});

    const page = await browser.newPage()

    await page.goto('https://betamoodle.iiitvadodara.ac.in/login/index.php')

    await page.setViewport({ width: 1920, height: 1080 });

    const LoginID = await page.waitForSelector('div > .form-control');
    await LoginID.type(process.env.STUDENT_ID)
    const Password = await page.waitForSelector('div > .form-control[type="password"]')
    await Password.type(process.env.STUDENT_PASSWORD)
    // await page.keyboard.press('Enter')

    //    try {
    //     await page.click("button[type=submit]")
    //    } catch (error) {
    //     console.log(error.message);
    //    }
        
    try {
        await page.click('#loginbtn')
        await page.waitForNavigation({ waitUntil: 'networkidle0' , timeout: 10000 });
    
    } catch (error) {
        console.log(error.message);
    }
    
    const users = await page.$$eval('.listentry .user a', elements => elements.map(element => element.textContent));
    console.log(users);
    await page.screenshot({ path: 'moodle.png' , fullPage: true})
    
     browser.close()

}





try {
    BrowserRun()
} catch (error) {
    console.log(error);
}