import SnapBot from "./snapbot.js";
import dotenv from "dotenv";
dotenv.config();

const bot = new SnapBot();

let credentials = {
  username: process.env.USER_NAME,
  password: process.env.USER_PASSWORD,
};

async function sendSnap() {
  await bot.launchSnapchat({
    headless: false, // makes the browser visible
    args: [
      "--start-maximized",
      "--force-device-scale-factor=1",
      "--allow-file-access-from-files",
      "--use-fake-ui-for-media-stream", // Bypass permission prompt
      "--enable-media-stream",
    ],
    // userDataDir:
    //   "C:\\Users\\your_name\\AppData\\Local\\Google\\Chrome\\User Data\\Default",
  });

  const isLogged = await bot.isLogged();

  if (!isLogged) {
    await bot.login(credentials);
  } else {
    console.log("Bot is already Logged in");
  }

  await bot.handlePopup();
  await bot.captureSnap({ caption: "Hello world" });
  await bot.screenshot({ path: "screenshot.png" });
  await bot.send("BestFriends");  // or bot.useShortcut([)
  await bot.wait(2000);
  await bot.closeBrowser();
}

sendSnap();
