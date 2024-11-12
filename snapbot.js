const puppeteer = require("puppeteer-extra");
const Stealth = require("puppeteer-extra-plugin-stealth");
puppeteer.use(Stealth());

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
} 

class SnapBot {
  constructor() {
    this.page = null;
    this.browser = null;
  }
  async lauchSnapchat(obj) {
    try {
      this.browser = await puppeteer.launch(obj);
      const context = await this.browser.createBrowserContext();
      await context.overridePermissions("https://web.snapchat.com", [
        "camera",
        "microphone",
      ]);
      this.page = await context.newPage();

      await this.page.setViewport({ width: 1920, height: 1080 });
      await this.page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
      );

      await this.page.goto("https://www.snapchat.com/?original_referrer=none");
      await this.page.waitForNetworkIdle(); // Ensure the page is loaded before proceeding
    } catch (error) {
      console.error(`Error while Starting Snapchat : ${error}`);
    }
  }

  async login(credentials) {
    const { username, password } = credentials;
    if (username == "" || password == "") {
      throw new Error("Credentials cant be empty");
    }
    try {
      // Enter username
      const defaultLoginBtn = await this.page.$("#ai_input");
      const loginBtn = await this.page.$('input[name="accountIdentifier"]');

      if (loginBtn) {
        this.page.waitForNetworkIdle();
        console.log("Entering username...");
        await this.page.type('input[name="accountIdentifier"]', username, {
          delay: 100,
        });
      }
      if (defaultLoginBtn) {
        console.log("Entering username...");
        await this.page.type("#ai_input", username, { delay: 100 });
      }

      await this.page.click("button[type='submit']");
    } catch (e) {
      console.log("Username field error:", e);
    }
    try {
      //Enter Password
      console.log("Waiting for password field...");
      await this.page.waitForSelector("#password", {
        visible: true,
        timeout: 15000,
      });
      await this.page.type("#password", password, { delay: 100 });
      console.log("Password field filled.");
    } catch (e) {
      console.log("Password field loading error:", e);
    }

    await this.page.click("button[type='submit']");
    await delay(5000);
    //click not now
    try {
      const notNowBtn = ".NRgbw.eKaL7.Bnaur";
      console.log("Checking for 'Not now' button...");
      await this.page.waitForSelector(notNowBtn, {
        visible: true,
        timeout: 5000,
      });
      await this.page.click(notNowBtn);
      console.log("Clicked 'Not now' button.");
    } catch (e) {
      console.log("Popup handling error or popup not found:", e);
    }
    await delay(1000);
  }

  async captureSnap(obj) {
    const svgButton = await this.page.$("button.qJKfS");
    if (svgButton) {
      await this.page.click("button.qJKfS"); // Click the button
    }

    //capture button
    await this.page.waitForSelector("button.FBYjn.gK0xL.A7Cr_.m3ODJ");
    await this.page.click("button.FBYjn.gK0xL.A7Cr_.m3ODJ");

    console.log("click");

    await delay(1000);

    if (obj.caption !== "") {
      await delay(2000);
      await this.page.waitForSelector('button.eUb32[title="Add a caption"]');
      await this.page.click('button.eUb32[title="Add a caption"]');
      await delay(1000);
      await this.page.waitForSelector(
        'textarea.B9QiX[aria-label="Caption Input"]'
      );
      await this.page.type(
        'textarea.B9QiX[aria-label="Caption Input"]',
        obj.caption,
        { delay: 100 }
      );
      await delay(1000);
    }
  }

  async send(person) {
    const button = await this.page.$("button.YatIx.fGS78.eKaL7.Bnaur");
    if (button) {
      console.log("Button found!");
      await button.click();
    } else {
      console.log("Button not found.");
    }
    await delay(1000);
    let selected = "";
    if (person == "Bestfriend") {
      selected = "ul.UxcmY li  div.Ewflr.cDeBk.A8BRr ";
    } else if (person == "Groups") {
      selected = "li div.RbA83";
    } else if (person == "friends") {
      selected = "li div.Ewflr";
    } else if (person == "all") {
      console.log("not implemented yet");
    }
    console.log(selected);
    const accounts = await this.page.$$(selected);
    for (const account of accounts) {
      const isFriendVisible = await account.evaluate(
        (el) => el.offsetWidth > 0 && el.offsetHeight > 0
      ); // Check if the div is visible
      if (isFriendVisible) {
        // console.log("Div found!");
        await account.click(); // Click on the div element
      } else {
        console.log("account not found.");
      }
    }
    const sendButton = await this.page.$("button.TYX6O.eKaL7.Bnaur");
    await sendButton.click();
    delay(5000);
  }

  async closeBrowser(){
    await delay(5000);
    await this.browser.close();
    console.log("Snapchat closed");
  }

  async screenshot(obj) {
    await this.page.screenshot(obj);
  }

  async logout() {
    await this.page.waitForSelector("#downshift-1-toggle-button");
    await this.page.click("#downshift-1-toggle-button");
    await this.page.click("#downshift-1-item-9");
    console.log("Logged Out");
    await delay(12000);
  }

  async wait(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }
}

module.exports = SnapBot;
