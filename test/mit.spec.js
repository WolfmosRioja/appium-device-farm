let fs = require('fs-extra')
let os = require('os')
let path = require('path')
let { remote } = require('webdriverio')
let Mitmproxy = require('mitmproxy').default

let proxy, driver
let interceptedMessages = []

// this function will get called every time the proxy intercepts a request
let requestHandler = (message) => {
  let req = message.request
  console.log('************************************')
  console.log('mitmproxy intercepted a request')
  console.log(req.method)
  console.log(req.rawUrl)
  console.log(message.requestBody.toString())
  console.log('************************************')
  interceptedMessages.push(message)
}

describe('Mit', () => {
  before(async function()  {
    this.timeout(500000);
    // start mitmproxy
    proxy = await Mitmproxy.Create(requestHandler, [], true, true)
    console.log('________');
    driver = await remote({
      hostname: 'localhost',
      port: 4723,
      path: '/wd/hub',
      capabilities: {
        "appium:platformName": 'Android',
        "appium:automationName": 'UiAutomator2',
        "appium:appWaitPackage": "org.wordpress.android",
        "appium:appWaitActivity": "org.wordpress.android.ui.accounts.SignInActivity",
        "appium:app": '/Users/saikrishna/Downloads/git/PageObjectPatternAppium/build/wordpress.apk', //'https://github.com/cloudgrey-io/the-app/releases/download/v1.9.0/TheApp-v1.9.0.apk',
      },
      logLevel: 'silent'
    })
  })
  
  it('getting the event for a day, via request to history.muffinlabs.com', async() => {
    console.log('Inside test')
    // let pickerDemo = await driver.$('~Picker Demo')
    // await pickerDemo.click()
    // let button = await driver.$('~learnMore')
    // await button.click()
    // // wait for alert
    // let alertIsPresent = async () => {
    //   try { return await driver.getAlertText(); } catch { return false; }
    // }
    // await driver.waitUntil(alertIsPresent, 4000)
    // await driver.dismissAlert()
  
  })
  
  after(async () => {
    console.log('shutting down');
    console.log(interceptedMessages)
    await proxy.shutdown()
    await driver.deleteSession()
  })
})

