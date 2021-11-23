/*
 ******************************************************************************
 * Cucumber/Gherkin
 * ============================================================================
 * 
 * NOTES:
 * - Arrow functions not supported by cucumber when accessing the 'world' class
 *   SEE: github.com/cucumber/cucumber-js/blob/main/docs/support_files/world.md
 * 
 ******************************************************************************
*/

const {After, Before, Given, Then, When} = require('@cucumber/cucumber');
const assert = require('assert');
const path = require('path');
const timeout = 20000;
const webdriver = require('selenium-webdriver');

Before({timeout}, async function() {
    this.browserBuild();
});

After({timeout}, async function() {
    await this.browserExit();
});

Given('the {word} page', {timeout}, async function(page) {
    const pages = {
        'home': 'https://play.pokemonshowdown.com',
        'space': 'https://myspace.com',
    }

    assert((pages[page] != null), 'Page not supported!');
    await this.browserNavigate(pages[page]);
    if (page=="home"){
    await this.headless.wait(webdriver.until.elementLocated(webdriver.By.id("qc-cmp2-ui")), timeout, 2000)
}});
When('the ladder button is clicked', async function () {
    const playButton = await this.headless.findElement(webdriver.By.className("button mainmenu3"))
    await playButton.click()
    assert(await this.headless)
})
When('the i accept privacy', async function () {
    //const button = await  this.headless.findElement(webdriver.By.id("qc-cmp2-ui"));
    const button = await  this.headless.findElement(webdriver.By.className("css-1wrbm"));
    //const button = await  this.headless.findElement(webdriver.By.css(".css-1wrbm"));
    //console.log(button)
    await button.click();
})
Then('the privacy notice hides', async function () {
    try {
        await this.headless.findElement(webdriver.By.id("qc-cmp2-ui"))
        assert(false)
    }
    catch (ex)
    {
        assert(true)
    }

    //assert(popup.getCssValue("display")=="none")
})
Then('the url should be the ladder link', async function (){
    assert(await this.headless.getCurrentUrl()=="https://play.pokemonshowdown.com/ladder")
    await this.browserExit();
})
When('the forum button is clicked', async function () {
    const forum = await this.headless.findElement(webdriver.By.linkText("Forum"))
    await forum.click()
})
Then('there should be a forum tab', {timeout},async function () {
    console.log("log  " +(await this.headless.getAllWindowHandles()))
    const windows = await this.headless.getAllWindowHandles()
    await this.headless.switchTo().window(windows[1])
    //* How to get title of not current tab?
    assert(await this.headless.getTitle(windows[1])=="Smogon Forums")
    await this.browserExit();
})

When('i accept cookies', async function (){
    const boxes = await this.headless.findElement(webdriver.By.xpath("/html/body/div[8]/div/p[3]/label/span"));
    const boxes1 = await this.headless.findElement(webdriver.By.xpath("/html/body/div[8]/div/p[4]/label/span"));
    const acceptButton = await this.headless.findElement(webdriver.By.css('#confirm'))
    console.log("boxes list is " + await boxes1)
    console.log(await boxes1.length)
    await boxes.click();
    await boxes1.click();
    await acceptButton.click();
})

When('i click the change name button', async function () {
    //console.log(await this.headless.findElement(webdriver.By.name("login")))
    await this.browserExit();
})

Then ('the cookie popup should hide', async function ()
{
    const tos = webdriver.By.id("termsOfService")//.getCssValue("display");
    console.log(" logs here " +  await tos)
    let tosDisplay = await this.headless.findElement(tos).getCssValue("display")
    assert(await tosDisplay=="none")
})

Then ('spaceholder', async function ()
{

})

// When ('the {word} button is pressed', async function (id) {
//     const signUpButton = await webdriver.By.css("#"+id);
//     const variable = await this.headless.findElement(signUpButton);
//     console.log(37,await variable)

// })
// // Then ('web address should be {address}', async function (address) {
// //     console.log(await this.headless.getCurrentUrl())
// //     assert(await this.headless.getCurrentUrl()==address)

// // })
// // When('the {string} location is searched for', async function(location) {
//     //     this.text = location;

// //     const searchInput = await this.getElement('ls-c-search__input-label');
// //     const searchSubmit = await this.getElementByCss('[type="submit"].ls-c-search__submit');

// //     await searchInput.sendKeys(location);
// //     await searchSubmit.click();
// //     await this.waitForElementByCss('.wr-c-observations__heading', timeout);
// // });

// // Then('the {string} element should be {word}', async function(name, state) {
// //     const ids = {
// //         'location heading': 'wr-location-name-id',
// //         'search input': 'ls-c-search__input-label',
// //         'search submit': '[type="submit"].ls-c-search__submit'
// //     };

// //     const selectors = {
// //         'location heading': 'getElement',
// //         'search input': 'getElement',
// //         'search submit': 'getElementByCss'
// //     };

// //     const tags = {
// //         'location heading': 'h1',
// //         'search input': 'input',
// //         'search submit': 'input'
// //     };

// //     const id = ids[name];
// //     const selector = selectors[name];
// //     const tag = tags[name];

// //     assert((id != null), 'Element not supported!');
// //     assert((selector != null), 'Selector not supported!');
// //     assert((tag != null), 'Tag not supported!');

// //     switch(state) {
// //         case 'matching':
// //         case 'there': {
// //             const element = await this[selector](id);
// //             const actualTag = await element.getTagName();
// //             assert((actualTag == tag), 'Element is not of the correct type!');

// //             if (state == 'matching') {
// //                 const actualText = await element.getText();
// //                 console.log('ACTUAL TEXT: '+actualText+'!');
// //                 assert((actualText == this.text), 'Element text does not match!');
// //             }
            
// //             break;
// //         }

// //         case 'missing': {
// //             assert.rejects(async () => await this[selector](id), 'Element exists when it should not!');
// //             break;
// //         }
        
// //         default: {
// //             assert.fail('State not supported!');
// //             break;
// //         }
// //     }


