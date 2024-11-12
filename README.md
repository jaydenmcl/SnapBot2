# SnapBot
SnapBot is a simple automation tool for interacting with Snapchat using Puppeteer. This bot logs into a Snapchat account, captures a snap with a caption, takes a screenshot, and sends the snap to specified contacts. It also includes a logout feature for switching accounts without closing the browser. 

## Installation
1. Clone the repository:
 ```bash
 git clone https://github.com/Emmanuel-Rods/SnapBot
 ```
2. Navigate to the project folder:
```bash
cd SnapBot
```
3. Install the necessary dependencies:
```bash
npm install
```
4. Copy the `.env.example` file to create a `.env` file:
```bash
cp .env.example .env
```
5. Open the `.env` file and add your Snapchat credentials:
```bash 
USER_NAME=<Your Snapchat Username>
USER_PASSWORD=<Your Snapchat Password>
```
## Usage

To run the bot, use the following command:
```bash
npm run bot
```
This command will start SnapBot, logging into Snapchat, capturing a snap, and sending it to your specified contacts.

## Methods

The following methods are available in `SnapBot`:

-   `launchSnapchat({ headless })`: Opens Snapchat in a browser, set to visible with `{ headless: false }`.
-   `login(credentials)`: Logs into Snapchat using the provided credentials.
-   `captureSnap({ caption })`: Takes a snap and applies a caption.
-   `screenshot({ path })`: Saves a screenshot of the current screen state.
-   `send(recipients)`: Sends the snap to the specified recipients:
    -   `"BestFriends"` for best friends,
    -   `"friends"` for all active friends and best friends,
    -   `"groups"` for group chats.
-   `wait(milliseconds)`: Pauses the script for a specified duration.
-   `logout()`: Logs out of the current Snapchat account, allowing you to log in with another account without closing the browser.
-   `closeBrowser()`: Closes the browser session.
